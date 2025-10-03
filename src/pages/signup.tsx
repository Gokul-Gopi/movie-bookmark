import SignupForm from "@/components/pages/signup/SignupForm";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="w-full px-6">
        <h1 className="font-semibold text-5xl md:text-6xl mb-10 text-center">
          Sign up
        </h1>

        <SignupForm />
      </div>
    </>
  );
};

export default Page;
