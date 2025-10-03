import MovieCard from "@/components/MovieCard";

interface IMoviesGrid {
  data: {
    title: string;
    publishedOn: string;
    description: string;
    poster: string;
  }[];
}

const MoviesGrid = ({ data }: IMoviesGrid) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {data.map((movie) => (
        <MovieCard {...movie} key={movie.title} />
      ))}
    </div>
  );
};

export default MoviesGrid;
