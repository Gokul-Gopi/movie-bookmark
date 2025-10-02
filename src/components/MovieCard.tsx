import { ActionIcon, Button } from "@mantine/core";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface IMovieCard {
  title: string;
  description?: string;
  publishedOn: string;
  poster: string;
}

const MovieCard = ({ title, poster, publishedOn }: IMovieCard) => {
  return (
    <div className="px-2 pt-2 pb-4 bg-card rounded-xl group">
      <div className="relative min-h-[31.5rem]">
        <Image src={poster} alt="" fill={true} className="rounded-xl" />

        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent" />

        <Button
          className="hidden group-hover:flex gap-2 absolute bottom-2 right-2 text-sm"
          size="compact-md"
          variant="outline"
        >
          More Info
        </Button>
      </div>

      <div className="flex flex-col text-white px-2">
        <div className="flex justify-between items-center">
          <span className="my-4 font-medium text-xl truncate">{title}</span>

          <div className="hidden group-hover:flex gap-2">
            <ActionIcon color="white" variant="outline">
              <Icon icon="material-symbols:edit-outline" />
            </ActionIcon>
            <ActionIcon color="red" variant="outline">
              <Icon icon="material-symbols:delete-outline" />
            </ActionIcon>
          </div>
        </div>
        <span>{publishedOn}</span>
      </div>
    </div>
  );
};

export default MovieCard;
