import { useSignup } from "@/api/queries/auth.queries";
import PasswordInput from "@/components/form/ControlledPasswordInput";
import TextInput from "@/components/form/ControlledTextInput";
import { signupSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const SignupForm = () => {
  const router = useRouter();
  const signup = useSignup();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    signup.mutate(data, {
      onSuccess: () => {
        notifications.show({
          message: "Welcome aboard!",
          color: "green",
        });
        router.push("/");
      },
    });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 w-[18.75rem]">
        <TextInput name="email" placeholder="Email" />
        <PasswordInput name="password" placeholder="Password" />
        <PasswordInput name="confirmPassword" placeholder="Confirm password" />

        <Button
          classNames={{ label: "text-base" }}
          type="submit"
          h={54}
          loading={signup.isPending}
        >
          Login
        </Button>

        <Link
          href="/signin"
          className="text-center hover:text-primary hover:underline underline-offset-2"
        >
          I already have an account
        </Link>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
