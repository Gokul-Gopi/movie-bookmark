import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { baseSerializeOptions } from "@/utils/helpers";

const logout = (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", [
    serialize(ACCESS_TOKEN, "", { ...baseSerializeOptions, maxAge: 0 }),
    serialize(REFRESH_TOKEN, "", { ...baseSerializeOptions, maxAge: 0 }),
  ]);

  return res.status(200).json({ message: "Logged out" });
};

export default logout;
