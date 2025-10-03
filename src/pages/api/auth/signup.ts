import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { signupSchema } from "@/utils/validationSchema";
import {
  getErrorMessage,
  hashPassword,
  serializeCookie,
  signToken,
  validateBody,
} from "@/utils/helpers";
import { ACCESS_TOKEN } from "@/utils/constants";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") throw new Error("Method not allowed");

    const { email, password } = validateBody(signupSchema, req.body);

    if (await prisma.user.findUnique({ where: { email } }))
      throw new Error("User already exists");

    const user = await prisma.user.create({
      data: { email, passowrd: await hashPassword(password) },
    });

    const token = signToken(user.id);

    res.setHeader("Set-Cookie", serializeCookie(ACCESS_TOKEN, token));

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export default signup;
