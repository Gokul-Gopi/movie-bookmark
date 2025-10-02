import PasswordInput from "@/components/form/PasswordInput";
import TextInput from "@/components/form/TextInput";
import { Button, Checkbox } from "@mantine/core";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1 className="font-semibold text-6xl mb-10 text-center">Sign in</h1>

      <div className="flex flex-col gap-6 min-w-[18.75rem]">
        <TextInput name="" placeholder="Email" />
        <PasswordInput name="" placeholder="Password" />

        <Checkbox
          label="Remember me"
          classNames={{ root: "mx-auto", input: "bg-input border-none" }}
        />

        <Button h={54} classNames={{ label: "text-base" }}>
          Login
        </Button>

        <div className="flex items-center gap-1 justify-center">
          <p>Don&apos;t have an account?</p>{" "}
          <Link
            href="/signup"
            className="font-bold text-primary hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
