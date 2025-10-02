import { ActionIcon, Button, Menu } from "@mantine/core";
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
    <div className="px-2 pt-2 pb-4 bg-card rounded-xl group max-w-[17.625rem]">
      <div className="relative min-h-[25rem]">
        <Image src={poster} alt="" fill={true} className="rounded-xl" />

        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="opacity-0 group-hover:opacity-100 gap-2 absolute bottom-0 right-0 left-0 p-4 text-sm transition-opacity duration-500">
          <Button
            className="w-full text-sm"
            color="white"
            size="compact-md"
            variant="outline"
          >
            More Info
          </Button>
        </div>

        <Menu
          classNames={{ dropdown: "bg-background" }}
          position="bottom-end"
          shadow="md"
          width={150}
        >
          <Menu.Target>
            <ActionIcon
              className="opacity-0 group-hover:opacity-100 absolute top-2 right-1 transition-opacity duration-500"
              color="white"
              variant="transparent"
            >
              <Icon icon="tabler:dots-vertical" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              color="primary"
              leftSection={<Icon icon="material-symbols:edit-outline" />}
            >
              Edit
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<Icon icon="material-symbols:delete-outline" />}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <div className="flex flex-col text-white px-2">
        <span className="my-4 font-medium text-xl truncate">{title}</span>

        <span>{publishedOn}</span>
      </div>
    </div>
  );
};

export default MovieCard;
