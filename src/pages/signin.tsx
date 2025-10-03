import Head from "next/head";
import SigninForm from "@/components/pages/signin/SigninForm";

const Page = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="w-full px-6">
        <h1 className="font-semibold text-5xl md:text-6xl mb-10 text-center">
          Sign in
        </h1>

        <SigninForm />
      </div>
    </>
  );
};

export default Page;
