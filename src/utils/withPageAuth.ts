import type { GetServerSidePropsContext } from "next";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { parse } from "cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

interface User {
  id: string;
  email?: string | null;
}
export interface AuthProps {
  user: User;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withPageAuth<P extends Record<string, any> = object>(
  inner?: (ctx: GetServerSidePropsContext, user: User) => Promise<{ props: P }>
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx;
    const cookies = parse(req.headers.cookie ?? "");

    const redirect = () => ({
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    });

    const access = cookies[ACCESS_TOKEN];
    if (access) {
      try {
        const { sub } = jwt.verify(access, process.env.JWT_SECRET_KEY!) as {
          sub: string;
        };

        const user = { id: sub };
        if (inner) {
          const { props } = await inner(ctx, user);

          return { props: { ...props, user } };
        }

        return { props: { user } };
      } catch (err) {
        if (!(err instanceof TokenExpiredError)) {
          res.setHeader("Set-Cookie", [
            `${ACCESS_TOKEN}=; Path=/; Max-Age=0`,
            `${REFRESH_TOKEN}=; Path=/; Max-Age=0`,
          ]);
          return redirect();
        }
      }
    }

    const refresh = cookies[REFRESH_TOKEN];
    if (refresh) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        {
          method: "POST",
          headers: { cookie: req.headers.cookie ?? "" },
        }
      );

      if (response.ok) {
        return { props: {} };
      }
    }

    return redirect();
  };
}
