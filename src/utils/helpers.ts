import formidable from "formidable";
import { z } from "zod";
import fs from "fs/promises";
import supabase from "./supabase";

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
