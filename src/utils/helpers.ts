import formidable from "formidable";
import { z } from "zod";
import fs from "fs/promises";
import supabase from "./supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import type { SerializeOptions } from "cookie";
import { ACCESS_TOKEN_EXPIRY } from "./constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  return error?.message ?? "Something went wrong, Please try again later";
};

export const validateBody = <T extends z.ZodTypeAny>(
  schema: T,
  body: unknown
): z.infer<T> => {
  return schema.parse(body);
};

export const uploadImage = async (file: formidable.File) => {
  if (!file) return null;

  const fileBuffer = await fs.readFile(file?.filepath);
  const fileExt = file.originalFilename?.split(".").pop() ?? "jpg";
  const filePath = `posters/${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("posters")
    .upload(filePath, fileBuffer, {
      contentType: file.mimetype ?? "image/jpeg",
      upsert: true,
    });

  if (error) {
    throw new Error(
      "Unable to upload file at the moment. Please try again later"
    );
  }

  const { data } = supabase.storage.from("posters").getPublicUrl(filePath);
  return data.publicUrl;
};

export const hashPassword = (pwd: string) => bcrypt.hash(pwd, 10);

export const verifyPassword = (pwd: string, hash: string) =>
  bcrypt.compare(pwd, hash);

export const signToken = (
  sub: number | string,
  expiresIn: number = ACCESS_TOKEN_EXPIRY
) =>
  jwt.sign({ sub }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn,
  });

const base: SerializeOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export const serializeCookie = (
  name: string,
  token: string,
  maxAge: number = ACCESS_TOKEN_EXPIRY
) => serialize(name, token, { ...base, maxAge });
