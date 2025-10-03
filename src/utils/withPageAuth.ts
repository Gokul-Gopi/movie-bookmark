import { GetServerSidePropsContext } from "next";
import supabase from "./supabase";

export interface IAuthProps {
  user: { id: string };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withPageAuth<P extends Record<string, any> = object>(
  handler: (
    ctx: GetServerSidePropsContext,
    user: IAuthProps["user"]
  ) => Promise<{ props: P }>
) {
  return async (ctx: GetServerSidePropsContext) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("withAuthPage: ", { user });

    if (!user) {
      // return {
      //   redirect: {
      //     destination: `/signin`,
      //     permanent: false,
      //   },
      // };
      return {
        props: {},
      };
    }

    return await handler(ctx, {
      id: user.id,
    });
  };
}
