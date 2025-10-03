import MovieCard from "@/components/pages/home/MovieCard";
import { IMovie } from "@/types/response";

interface IMoviesGrid {
  data: IMovie[];
}

const MoviesGrid = ({ data }: IMoviesGrid) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-8 w-full">
      {data.map((movie) => (
        <MovieCard key={movie?.id} {...movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
