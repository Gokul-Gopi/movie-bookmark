import SignupForm from "@/components/pages/signup/SignupForm";
import { withPageAuth } from "@/utils/withPageAuth";
import Head from "next/head";

export const getServerSideProps = withPageAuth(async (_ctx, user) => {
  console.log({ user });
  return { props: {} };
});

const Page = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div>
        <h1 className="font-semibold text-6xl mb-10 text-center">Sign up</h1>

        <SignupForm />
      </div>
    </>
  );
};

export default Page;
