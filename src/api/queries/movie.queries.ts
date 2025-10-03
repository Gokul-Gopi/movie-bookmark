import { useQuery } from "@tanstack/react-query";
import { get } from "../axios";

export const useMovies = (enabled = true) =>
  useQuery<object, Error, IMovie[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await get("/movie");
      return res;
    },
    enabled,
  });
