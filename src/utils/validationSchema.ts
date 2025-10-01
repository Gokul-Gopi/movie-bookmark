import formidable from "formidable";
import { z } from "zod";

export const signupSchema = z.object({
  email: z.email("Email is required"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password can’t be longer than 64 characters"),
});

export const signinSchema = z.object({
  email: z.email("Email is required"),
  password: z.string("Password is required"),
});

export const addMovieSchema = z.object({
  title: z.string("Title is required").min(1).max(120),
  publishedOn: z.string("Published year is required").max(800),
  description: z.string().optional(),
  poster: z.custom<formidable.File>(),
});
