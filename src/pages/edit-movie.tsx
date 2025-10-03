import { useMovie } from "@/api/queries/movie.queries";
import AddEditMovieForm from "@/components/pages/add-movie/AddEditMovieForm";
import Head from "next/head";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const movie = useMovie(router.query?.id as string);

  return (
    <>
      <Head>
        <title>Edit movie</title>
      </Head>

      <div className="max-w-[100rem] w-full mb-auto mx-8 px-6">
        <h2 className="text-5xl text-left w-full font-semibold my-28">
          Edit movie
        </h2>

        <AddEditMovieForm formData={movie.data} />
      </div>
    </>
  );
};

export default Page;
