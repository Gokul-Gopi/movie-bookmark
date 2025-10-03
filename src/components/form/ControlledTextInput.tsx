import { cn } from "@/utils/webHelpers";
import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import type { StylesRecord, TextInputFactory } from "@mantine/core";
import { useController } from "react-hook-form";

interface TextInputProps extends MantineTextInputProps {
  name: string;
}

const ControlledTextInput = ({ name, ...props }: TextInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const classes = props.classNames as StylesRecord<
    TextInputFactory["stylesNames"],
    string
  >;

  return (
    <MantineTextInput
      {...props}
      {...field}
      error={error?.message}
      classNames={{
        ...classes,
        input: cn(
          "rounded-[0.625rem] bg-input border-none text-white placeholder:text-white px-5 h-[2.813rem]",
          classes?.input
        ),
        error: cn("pl-1 text-sm", classes?.error),
      }}
    />
  );
};

export default ControlledTextInput;
