import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serializeCookie, signToken } from "@/utils/helpers";
import { ACCESS_TOKEN } from "@/utils/constants";

const refresh = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const refreshRaw = req.cookies["refresh-token"];
    if (!refreshRaw) throw new Error("no refresh cookie");

    const payload = jwt.verify(refreshRaw, process.env.JWT_SECRET_KEY!) as {
      sub: string;
    };

    const userId = payload.sub;

    const accessToken = signToken(userId);

    return res.setHeader(
      "Set-Cookie",
      serializeCookie(ACCESS_TOKEN, accessToken)
    );
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

export default refresh;
