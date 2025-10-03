import { ActionIcon, Button, Pagination } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

const movies = [
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    publishedOn: "1994",
    poster:
      "https://images.unsplash.com/photo-1759401091238-ce8b8fe68cb1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Page = () => {
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const onLogout = () => {
    router.push("/signin");
  };

  return (
    <>
      <Head>
        <title>My Movies</title>
      </Head>

      <section className="flex justify-between w-full items-center max-w-[77rem] my-28">
        <div className="flex gap-3 items-center">
          <h2 className="text-5xl font-semibold">My movies</h2>
          <ActionIcon
            component={Link}
            href="/add-movie"
            variant="transparent"
            color="white"
            size="xl"
          >
            <Icon icon="tabler:circle-plus" className="text-[32px] mt-1.5" />
          </ActionIcon>
        </div>

        <Button
          onClick={() => setLogoutModalOpen(true)}
          classNames={{ label: "text-base", section: "text-[1.8rem] ml-3" }}
          rightSection={<Icon icon="tabler:logout" />}
          variant="transparent"
          color="white"
        >
          Logout
        </Button>
      </section>

      {movies.length ? (
        <div className="grid grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard {...movie} key={movie.title} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center h-screen">
          <h2 className="text-5xl font-semibold text-center">
            Your movie list is empty
          </h2>
          <Button
            component={Link}
            href="/add-movie"
            classNames={{ label: "text-base" }}
            h={56}
            px={28}
          >
            Add a new movie
          </Button>
        </div>
      )}

      <ConfirmationModal
        title="Are you sure you want to logout?"
        opened={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={onLogout}
      />

      <Pagination
        value={2}
        total={5}
        classNames={{
          root: "my-40",
          control:
            "w-auto text-white bg-card font-bold border-none first:bg-transparent last:bg-transparent active:bg-white data-[active=true]:bg-primary active:text-card",
        }}
        previousIcon={() => <span className="font-bold px-2">Prev</span>}
        nextIcon={() => <span className="font-bold px-2">Next</span>}
      />
    </>
  );
};

export default Page;
