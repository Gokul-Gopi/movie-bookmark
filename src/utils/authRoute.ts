import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "./constants";

export interface AuthenticatedRequest extends NextApiRequest {
  userId: string;
}

export const authRoute =
  (
    handler: (
      req: AuthenticatedRequest,
      res: NextApiResponse
    ) => NextApiResponse<unknown> | Promise<void>
  ) =>
  async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies[ACCESS_TOKEN];
      if (!token) throw new Error("Missing access-token");

      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
        sub: string;
      };

      (req as AuthenticatedRequest).userId = payload.sub;

      return handler(req, res);
    } catch {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
