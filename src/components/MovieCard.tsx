import { ActionIcon, Button, Menu, Modal } from "@mantine/core";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface IMovieCard {
  title: string;
  description?: string;
  publishedOn: string;
  poster: string;
}

const MovieCard = ({ title, poster, description, publishedOn }: IMovieCard) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [descModalOpen, setDescModalOpen] = useState(false);

  return (
    <div className="px-2 pt-2 pb-4 bg-card rounded-xl group max-w-[17.625rem]">
      <div className="relative min-h-[25rem]">
        <Image src={poster} alt="" fill={true} className="rounded-xl" />

        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 via-transparent to-black/50" />

        <div className="opacity-0 group-hover:opacity-100 gap-2 absolute bottom-0 right-0 left-0 p-4 text-sm transition-opacity duration-500">
          <Button
            onClick={() => setDescModalOpen(true)}
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
              onClick={() => setDeleteModalOpen(true)}
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

      <ConfirmationModal
        title="Are you sure you want to delete this movie?"
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => setDeleteModalOpen(false)}
      />

      <Modal
        classNames={{
          header: "bg-black",
          content: "bg-black p-4",
          title:
            "text-primary underline underline-offset-4 font-semibold text-lg mb-2",
          close: "text-slate-400 hover:bg-transparent",
        }}
        size={600}
        title={title}
        centered
        opacity={0.95}
        opened={descModalOpen}
        onClose={() => setDescModalOpen(false)}
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
      >
        {description ? (
          <p>{description}</p>
        ) : (
          <p className="text-slate-400 text-center">No info added..</p>
        )}
      </Modal>
    </div>
  );
};

export default MovieCard;
