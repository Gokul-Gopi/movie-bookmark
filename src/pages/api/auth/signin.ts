import type { NextApiRequest, NextApiResponse } from "next";
import { signinSchema } from "@/utils/validationSchema";
import {
  getErrorMessage,
  serializeCookie,
  signToken,
  validateBody,
  verifyPassword,
} from "@/utils/helpers";
import { prisma } from "@/utils/prisma";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
} from "@/utils/constants";

const sigin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") throw new Error("Method not allowed");

    const { email, password, rememberMe } = validateBody(
      signinSchema,
      req.body
    );

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await verifyPassword(password, user.passowrd);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const accessToken = signToken(user.id);

    if (!rememberMe) {
      res.setHeader("Set-Cookie", serializeCookie(ACCESS_TOKEN, accessToken));
    } else {
      const refreshToken = signToken(user.id, REFRESH_TOKEN_EXPIRY);

      res.setHeader("Set-Cookie", [
        serializeCookie(ACCESS_TOKEN, accessToken),
        serializeCookie(REFRESH_TOKEN, refreshToken, REFRESH_TOKEN_EXPIRY),
      ]);
    }

    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export default sigin;
