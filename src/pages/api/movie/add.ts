import type { NextApiResponse } from "next";
import { getErrorMessage, validateBody } from "@/utils/helpers";
import { addMovieSchema } from "@/utils/validationSchema";
import formidable from "formidable";
import fs from "fs/promises";
import supabase from "@/utils/supabase";
import { prisma } from "@/utils/prisma";
import authRoute, { AuthenticatedRequest } from "@/utils/authRoute";

export const config = {
  api: { bodyParser: false }, // formidable will handle multipart form
};

const addMovie = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);

    const body = {
      title: fields?.title?.[0],
      description: fields?.description?.[0],
      publishedOn: fields?.publishedOn?.[0],
      poster: files?.poster?.[0],
    };

    const { title, description, poster, publishedOn } = validateBody(
      addMovieSchema,
      body
    );

    if (poster) {
      const fileBuffer = await fs.readFile(poster?.filepath);
      const fileExt = poster.originalFilename?.split(".").pop() ?? "jpg";
      const filePath = `posters/${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("posters")
        .upload(filePath, fileBuffer, {
          contentType: poster.mimetype ?? "image/jpeg",
          upsert: true,
        });

      if (error) {
        console.log({ error });
        throw new Error(
          "Unable to upload file at the moment. Please try again later"
        );
      }

      const { data } = supabase.storage.from("posters").getPublicUrl(filePath);

      const movie = await prisma.movie.create({
        data: {
          title,
          description,
          publishedOn,
          poster: data.publicUrl,
          userId: req.user.id,
        },
      });

      return res.status(201).json(movie);
    }

    return res
      .status(400)
      .json({ message: "Something went wronog. Please try again later" });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export default authRoute(addMovie);
