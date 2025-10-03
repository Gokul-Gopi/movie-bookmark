import PasswordInput from "@/components/form/ControlledPasswordInput";
import TextInput from "@/components/form/ControlledTextInput";
import { signinSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = form.handleSubmit((_data) => {
    router.push("/");
  });

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div>
        <h1 className="font-semibold text-6xl mb-10 text-center">Sign in</h1>

        <FormProvider {...form}>
          <div className="flex flex-col gap-6 min-w-[18.75rem]">
            <TextInput name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />

            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value}
                  onChange={onChange}
                  label="Remember me"
                  classNames={{
                    root: "mx-auto",
                    input: "bg-input border-none",
                  }}
                />
              )}
            />

            <Button
              onClick={onSubmit}
              classNames={{ label: "text-base" }}
              h={54}
            >
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
        </FormProvider>
      </div>
    </>
  );
};

export default Page;
