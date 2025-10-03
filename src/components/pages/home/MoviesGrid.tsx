import MovieCard from "@/components/pages/home/MovieCard";
import { IMovie } from "@/types/response";

interface IMoviesGrid {
  data: IMovie[];
}

const MoviesGrid = ({ data }: IMoviesGrid) => {
  return (
    <div className="grid grid-cols-4 gap-8 w-full">
      {data.map((movie) => (
        <MovieCard key={movie?.id} {...movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
