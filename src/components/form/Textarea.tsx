import { cn } from "@/utils/webHelpers";
import {
  Textarea as MantineTextarea,
  TextareaProps as MantineTextareaProps,
} from "@mantine/core";
import type { StylesRecord, TextareaFactory } from "@mantine/core";

interface TextareaProps extends MantineTextareaProps {
  name: string;
}

const Textarea = ({ ...props }: TextareaProps) => {
  const classes = props.classNames as StylesRecord<
    TextareaFactory["stylesNames"],
    string
  >;

  return (
    <MantineTextarea
      {...props}
      classNames={{
        ...classes,
        input: cn(
          "rounded-[0.625rem] bg-input border-none text-white placeholder:text-white px-5",
          classes?.input
        ),
      }}
    />
  );
};

export default Textarea;
