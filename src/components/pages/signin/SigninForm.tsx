import PasswordInput from "@/components/form/ControlledPasswordInput";
import TextInput from "@/components/form/ControlledTextInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Checkbox } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { signinSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignin } from "@/api/queries/auth.queries";
import { notifications } from "@mantine/notifications";

const SigninForm = () => {
  const router = useRouter();
  const signin = useSignin();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signin.mutate(data, {
      onSuccess: () => {
        notifications.show({
          message: "Welcome back!",
          color: "green",
        });
        router.push("/");
      },
    });
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 max-w-[18.75rem] mx-auto"
      >
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
          classNames={{ label: "text-base" }}
          type="submit"
          h={54}
          loading={signin.isPending}
        >
          Login
        </Button>

        <div className="flex flex-col xs:flex-row items-center gap-1 justify-center">
          <p>Don&apos;t have an account?</p>{" "}
          <Link
            href="/signup"
            className="font-bold text-primary hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default SigninForm;
