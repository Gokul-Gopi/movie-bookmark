import { cn } from "@/utils/webHelpers";
import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps as MantinePasswordInputProps,
} from "@mantine/core";
import type { StylesRecord, PasswordInputFactory } from "@mantine/core";

interface PasswordInputProps extends MantinePasswordInputProps {
  name: string;
}

const PasswordInput = ({ ...props }: PasswordInputProps) => {
  const classes = props.classNames as StylesRecord<
    PasswordInputFactory["stylesNames"],
    string
  >;

  return (
    <MantinePasswordInput
      {...props}
      classNames={{
        ...classes,
        input: cn(
          "rounded-[0.625rem] bg-input border-none text-white h-[2.813rem]",
          classes?.input
        ),
        innerInput: cn(
          "pl-5 placeholder:text-white h-[2.813rem]",
          classes?.innerInput
        ),
        section: cn("pr-5", classes?.section),
      }}
    />
  );
};

export default PasswordInput;
