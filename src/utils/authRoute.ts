import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

export interface AuthenticatedRequest extends NextApiRequest {
  user: { id: string; email?: string };
}

const authRoute = (
  handler: (
    req: AuthenticatedRequest,
    res: NextApiResponse
  ) => Promise<void> | NextApiResponse
) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    (req as AuthenticatedRequest).user = {
      id: user.id,
      email: user.email,
    };

    return handler(req, res);
  };
};

export default authRoute;
