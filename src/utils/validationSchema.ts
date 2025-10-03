import formidable from "formidable";
import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      }),
    confirmPassword: z.string("Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z.email("Email is required"),
  password: z.string("Password is required"),
  rememberMe: z.boolean(),
});

export const addMovieSchema = z.object({
  title: z.string("Title is required").min(1).max(120),
  publishedOn: z.string("Published year is required").max(800),
  description: z.string().optional(),
  poster: z.custom<formidable.File>(),
});

export const editMovieSchema = z.object({
  title: z.string("Title is required").min(1).max(120).optional(),
  publishedOn: z.string("Published year is required").max(800).optional(),
  description: z.string().optional(),
  poster: z.custom<formidable.File | string>().optional(),
});
