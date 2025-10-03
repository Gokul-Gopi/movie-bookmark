import MovieCard from "@/components/MovieCard";

interface IMoviesGrid {
  data: IMovie[];
}

const MoviesGrid = ({ data }: IMoviesGrid) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {data.map((movie) => (
        <MovieCard key={movie?.id} {...movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
