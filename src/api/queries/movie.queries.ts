import { useMutation, useQuery } from "@tanstack/react-query";
import { api, get } from "../axios";
import { IMovie, IPaginatedMovies, RequestError } from "@/types/response";
import { alertError } from "@/utils/webHelpers";

export const useMovies = (page: number, limit: number) =>
  useQuery<object, RequestError, IPaginatedMovies>({
    queryKey: ["movies", page, limit],
    queryFn: async () => {
      const res = await get(`/movie?page=${page}&limit=${limit}`);
      return res;
    },
  });

export const useAddMovie = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (payload: any) => {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("publishedOn", payload.publishedOn);
      formData.append("poster", payload.poster);

      const res = await api.post("/movie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    onError: (error: RequestError) => alertError(error),
  });
};

export const useEditMovie = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (payload: any) => {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("publishedOn", payload.publishedOn);
      formData.append("poster", payload.poster);

      const res = await api.put(`/movie?id=${payload.movieId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    onError: (error: RequestError) => alertError(error),
  });
};

export const useMovie = (id: string) =>
  useQuery<object, RequestError, IMovie>({
    queryKey: ["movie"],
    queryFn: async () => {
      const res = await get(`/movie?id=${id}`);
      return res;
    },
    enabled: !!id,
  });

export const useDeleteMovie = () => {
  return useMutation({
    mutationFn: async (movieId: string) => {
      const res = await api.delete(`/movie?id=${movieId}`);
      return res;
    },
    onError: (error: RequestError) => alertError(error),
  });
};
