import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { signinSchema } from "@/utils/validationSchema";
import supabase from "@/utils/supabase";
import { getErrorMessage, validateBody } from "@/utils/helpers";

const sigin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") throw new Error("Method not allowed");

    const { email, password } = validateBody(signinSchema, req.body);

    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const token = data.session?.access_token;

    if (!token)
      throw new Error("Authentication failed. No session token returned.");

    const cookie = serialize("sb:token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export default sigin;
