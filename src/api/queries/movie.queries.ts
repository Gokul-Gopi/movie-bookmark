import { useQuery } from "@tanstack/react-query";
import { get } from "../axios";
import { IMovie } from "@/types/response";

export const useMovies = (enabled = true) =>
  useQuery<object, Error, IMovie[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await get("/movie");
      return res;
    },
    enabled,
  });
