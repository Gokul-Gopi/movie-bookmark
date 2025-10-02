import { cn } from "@/utils/webHelpers";
import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import type { StylesRecord, TextInputFactory } from "@mantine/core";

interface TextInputProps extends MantineTextInputProps {
  name: string;
}

const TextInput = ({ ...props }: TextInputProps) => {
  const classes = props.classNames as StylesRecord<
    TextInputFactory["stylesNames"],
    string
  >;

  return (
    <MantineTextInput
      {...props}
      classNames={{
        ...classes,
        input: cn(
          "rounded-[0.625rem] bg-input border-none text-white placeholder:text-white px-5 h-[2.813rem]",
          classes?.input
        ),
      }}
    />
  );
};

export default TextInput;
