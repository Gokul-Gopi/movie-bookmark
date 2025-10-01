import type { NextApiResponse } from "next";
import { getErrorMessage, validateBody } from "@/utils/helpers";
import { addMovieSchema, editMovieSchema } from "@/utils/validationSchema";
import formidable from "formidable";
import fs from "fs/promises";
import supabase from "@/utils/supabase";
import { prisma } from "@/utils/prisma";
import authRoute, { AuthenticatedRequest } from "@/utils/authRoute";

export const config = {
  api: { bodyParser: false }, // formidable will handle multipart form
};

const handleAddMovie = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
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
    console.log({ error });
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

const handleEditMovie = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  try {
    const movieId = req.query.id as string;
    if (!movieId) throw new Error("Please provide the movie id");

    const form = formidable();
    const [fields, files] = await form.parse(req);

    const body = {
      title: fields?.title?.[0],
      description: fields?.description?.[0],
      publishedOn: fields?.publishedOn?.[0],
      poster: fields?.poster?.[0],
    };

    validateBody(editMovieSchema, body);

    const updatedPostedFile = files?.poster?.[0];
    let updatedPosterUrl: string | null = null;

    if (updatedPostedFile) {
      const fileBuffer = await fs.readFile(updatedPostedFile?.filepath);
      const fileExt =
        updatedPostedFile.originalFilename?.split(".").pop() ?? "jpg";
      const filePath = `posters/${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("posters")
        .upload(filePath, fileBuffer, {
          contentType: updatedPostedFile.mimetype ?? "image/jpeg",
          upsert: true,
        });

      if (error) {
        console.log({ error });
        throw new Error(
          "Unable to upload file at the moment. Please try again later"
        );
      }

      const { data } = supabase.storage.from("posters").getPublicUrl(filePath);
      updatedPosterUrl = data.publicUrl;
    }

    const movie = await prisma.movie.update({
      where: {
        id: +movieId,
      },
      data: { ...body, poster: updatedPosterUrl ?? body.poster },
    });

    return res
      .status(201)
      .json({ data: movie, message: "Movie updated successfully" });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

const handleGetAllMovies = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  const userId = req.user.id;

  try {
    const movies = await prisma.movie.findMany({
      where: {
        userId,
      },
    });
    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

const handleDeleteMovie = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ message: "Please provide movie id" });

  try {
    await prisma.movie.delete({
      where: {
        id: +id,
      },
    });
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

const addMovie = (req: AuthenticatedRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return handleGetAllMovies(req, res);
    case "POST":
      return handleAddMovie(req, res);
    case "PUT":
      return handleEditMovie(req, res);
    case "DELETE":
      return handleDeleteMovie(req, res);

    default:
      return res.status(405).end(`Method Not Allowed`);
  }
};

export default authRoute(addMovie);
