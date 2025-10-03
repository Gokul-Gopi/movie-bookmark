import { Button, Modal } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useRouter } from "next/router";
import { useDeleteMovie } from "@/api/queries/movie.queries";
import MovieCardMenu from "./MovieCardMenu";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

interface IMovieCard {
  id: string;
  title: string;
  description?: string;
  publishedOn: string;
  poster: string;
}

const MovieCard = ({
  id,
  title,
  poster,
  description,
  publishedOn,
}: IMovieCard) => {
  const router = useRouter();
  const deleteMovie = useDeleteMovie();
  const queryClient = useQueryClient();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [descModalOpen, setDescModalOpen] = useState(false);

  const onDelete = () => {
    deleteMovie.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        notifications.show({
          message: "Movie deleted successfully!",
          color: "green",
        });
        setDeleteModalOpen(false);
      },
    });
  };

  return (
    <div className="md:px-2 md:pt-2 md:pb-4 bg-card rounded-xl group">
      <div className="relative aspect-[266/400]">
        <Image
          src={poster}
          alt=""
          fill={true}
          className="rounded-xl object-cover"
        />

        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

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

        <MovieCardMenu
          onEdit={() => {
            router.push({
              pathname: "/edit-movie",
              query: {
                id,
              },
            });
          }}
          onDelete={() => setDeleteModalOpen(true)}
        />
      </div>

      <div className="flex flex-col text-white pb-4 md:pb-0 px-4 md:px-2">
        <span className="my-6 md:my-4 font-medium text-xl truncate">
          {title}
        </span>

        <span>{publishedOn}</span>
      </div>

      <ConfirmationModal
        title="Are you sure you want to delete this movie?"
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={onDelete}
        loading={deleteMovie.isPending}
        closeOnClickOutside={!deleteMovie.isPending}
        withCloseButton={!deleteMovie.isPaused}
      />

      <Modal
        classNames={{
          header: "bg-black",
          content: "bg-black p-4 border border-white",
          title:
            "text-primary underline underline-offset-4 font-semibold text-lg mb-2",
          close: "text-slate-400 hover:bg-transparent",
        }}
        size={600}
        title={title}
        centered
        opacity={0.85}
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
