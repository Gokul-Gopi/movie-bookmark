import Head from "next/head";
import Header from "@/components/pages/home/Header";
import MoviesGrid from "@/components/pages/home/MoviesGrid";
import Pagination from "@/components/Pagination";
import { Button } from "@mantine/core";
import Link from "next/link";

const movies = [];

const Page = () => {
  return (
    <>
      <Head>
        <title>My Movies</title>
      </Head>

      {movies.length ? (
        <>
          <Header />
          <MoviesGrid data={[]} />
          <Pagination value={2} total={5} />
        </>
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center">
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
    </>
  );
};

export default Page;
