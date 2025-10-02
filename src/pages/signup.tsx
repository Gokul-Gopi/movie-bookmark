import PasswordInput from "@/components/form/ControlledPasswordInput";
import TextInput from "@/components/form/ControlledTextInput";
import { signupSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const Page = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = form.handleSubmit((data) => console.log(data));

  return (
    <div>
      <h1 className="font-semibold text-6xl mb-10 text-center">Sign up</h1>

      <FormProvider {...form}>
        <div className="flex flex-col gap-6 w-[18.75rem]">
          <TextInput name="email" placeholder="Email" />
          <PasswordInput name="password" placeholder="Password" />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm password"
          />

          <Button
            onClick={onSubmit}
            classNames={{ label: "text-base" }}
            type="submit"
            h={54}
          >
            Login
          </Button>

          <Link
            href="/signin"
            className="text-center hover:text-primary hover:underline underline-offset-2"
          >
            I already have an account
          </Link>
        </div>
      </FormProvider>
    </div>
  );
};

export default Page;
