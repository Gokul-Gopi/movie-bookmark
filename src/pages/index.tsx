import Head from "next/head";
import Header from "@/components/pages/home/Header";
import MoviesGrid from "@/components/pages/home/MoviesGrid";
import Pagination from "@/components/Pagination";
import { Loader } from "@mantine/core";
import { useMovies } from "@/api/queries/movie.queries";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NoMoviesView from "@/components/pages/home/NoMoviesView";

const Page = () => {
  const router = useRouter();
  const page = +(router.query?.page ?? "1");
  const limit = +(router.query?.limit ?? "8");

  const { data, isPending } = useMovies(page, limit);

  useEffect(() => {
    if (router.isReady && !router.query?.page) {
      router.replace({ query: { page, limit } }, undefined, {
        shallow: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query?.page]);

  return (
    <>
      <Head>
        <title>My Movies</title>
      </Head>

      {isPending ? (
        <Loader />
      ) : data?.data?.length ? (
        <div className="flex flex-col items-center max-w-[90rem] w-full px-4">
          <Header />
          <MoviesGrid data={data?.data ?? []} />
          <Pagination
            value={page}
            total={data?.pagination?.totalPages ?? 1}
            onChange={(page) =>
              router.replace({ query: { page, limit } }, undefined, {
                shallow: true,
              })
            }
          />
        </div>
      ) : (
        <NoMoviesView />
      )}
    </>
  );
};

export default Page;
