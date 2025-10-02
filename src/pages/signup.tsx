import PasswordInput from "@/components/form/PasswordInput";
import TextInput from "@/components/form/TextInput";
import { Button, Checkbox } from "@mantine/core";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1 className="font-semibold text-6xl mb-10 text-center">Sign up</h1>

      <div className="flex flex-col gap-6 min-w-[18.75rem]">
        <TextInput name="" placeholder="Email" />
        <PasswordInput name="" placeholder="Password" />
        <PasswordInput name="" placeholder="Confirm password" />

        <Button h={54} classNames={{ label: "text-base" }}>
          Login
        </Button>

        <Link
          href="/signin"
          className="text-center hover:text-primary hover:underline underline-offset-2"
        >
          I already have an account
        </Link>
      </div>
    </div>
  );
};

export default Page;
