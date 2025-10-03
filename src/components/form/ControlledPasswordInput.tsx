import { cn } from "@/utils/webHelpers";
import { Icon } from "@iconify/react";
import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps as MantinePasswordInputProps,
} from "@mantine/core";
import type { StylesRecord, PasswordInputFactory } from "@mantine/core";
import { useController } from "react-hook-form";

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <Icon icon="tabler:eye" className="text-lg" />
  ) : (
    <Icon icon="tabler:eye-off" className="text-lg" />
  );

interface PasswordInputProps extends MantinePasswordInputProps {
  name: string;
}

const ControlledPasswordInput = ({ name, ...props }: PasswordInputProps) => {
  const classes = props.classNames as StylesRecord<
    PasswordInputFactory["stylesNames"],
    string
  >;

  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <MantinePasswordInput
      visibilityToggleIcon={VisibilityToggleIcon}
      {...props}
      {...field}
      error={error?.message}
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
        error: cn("pl-1 text-sm", classes?.error),
      }}
    />
  );
};

export default ControlledPasswordInput;
