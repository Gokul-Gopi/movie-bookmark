import Image from "next/image";

interface IMovieCard {
  title: string;
  description?: string;
  publishedOn: string;
  poster: string;
}

const MovieCard = ({ title, poster, publishedOn }: IMovieCard) => {
  return (
    <div className="px-2 pt-2 pb-4 bg-card rounded-xl">
      <div className="relative min-h-[31.5rem]">
        <Image src={poster} alt="" fill={true} className="rounded-xl" />
      </div>

      <div className="flex flex-col text-white px-2">
        <span className="my-4 font-medium text-xl">{title}</span>
        <span>{publishedOn}</span>
      </div>
    </div>
  );
};

export default MovieCard;
