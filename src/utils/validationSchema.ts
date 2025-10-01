import { z } from "zod";

export const signupSchema = z.object({
  email: z.string("Email is required"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password can’t be longer than 64 characters"),
});
