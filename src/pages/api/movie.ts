import type { NextApiResponse } from "next";
import { getErrorMessage, uploadImage, validateBody } from "@/utils/helpers";
import { addMovieSchema, editMovieSchema } from "@/utils/validationSchema";
import formidable from "formidable";
import { prisma } from "@/utils/prisma";
import { AuthenticatedRequest, authRoute } from "@/utils/authRoute";

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
      const url = await uploadImage(poster);

      const movie = await prisma.movie.create({
        data: {
          title,
          description,
          publishedOn,
          poster: url as string,
          userId: +req.userId,
        },
      });

      return res.status(201).json(movie);
    }

    throw new Error("Something went wronog. Please try again later");
  } catch (error) {
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
      updatedPosterUrl = await uploadImage(updatedPostedFile);
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
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

const handleGetAllMovies = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  const userId = +req.userId;

  const page = +(req.query?.page || "1");
  const limit = +(req.query?.limit || "8");

  const skip = (page - 1) * limit;

  try {
    const [movies, totalItems] = await Promise.all([
      prisma.movie.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.movie.count({ where: { userId } }),
    ]);

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    return res.status(200).json({
      data: movies,
      pagination: {
        page,
        limit,
        totalPages,
        totalItems,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

const handleGetMovie = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  const movieId = req.query?.id;
  if (!movieId) throw new Error("Please provide the movie id");

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: +movieId,
      },
    });
    return res.status(200).json(movie);
  } catch (error) {
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
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

const movie = (req: AuthenticatedRequest, res: NextApiResponse) => {
  const method =
    req.method === "GET" ? (req.query?.id ? "GETBYID" : "GET") : req.method;

  switch (method) {
    case "GET":
      return handleGetAllMovies(req, res);
    case "GETBYID":
      return handleGetMovie(req, res);
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

export default authRoute(movie);
