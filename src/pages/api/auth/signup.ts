import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/utils/prisma";
import { signupSchema } from "@/utils/validationSchema";
import { getErrorMessage, validateBody } from "@/utils/helpers";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") throw new Error("Method not allowed");

    const { email, password } = validateBody(signupSchema, req.body);

    const { data: authUser } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authUser?.user) {
      const user = await prisma.profile.create({
        data: {
          id: authUser.user.id,
        },
      });

      if (!user) {
        await supabase.auth.admin.deleteUser(authUser.user.id);
        throw new Error("Error creating user. Please try again later");
      }
    }

    const { data: sessionData } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const cookie = serialize("sb:token", sessionData.session!.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
}
