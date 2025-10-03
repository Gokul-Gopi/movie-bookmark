import AddEditMovieForm from "@/components/pages/add-movie/AddEditMovieForm";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Add movie</title>
      </Head>

      <div className="max-w-[100rem] w-full mb-auto mx-8 px-6">
        <h2 className="text-5xl text-left w-full font-semibold my-28">
          Create a new movie
        </h2>

        <AddEditMovieForm />
      </div>
    </>
  );
};

export default Page;
