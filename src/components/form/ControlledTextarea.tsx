import { cn } from "@/utils/webHelpers";
import {
  Textarea as MantineTextarea,
  TextareaProps as MantineTextareaProps,
} from "@mantine/core";
import type { StylesRecord, TextareaFactory } from "@mantine/core";
import { useController } from "react-hook-form";

interface TextareaProps extends MantineTextareaProps {
  name: string;
}

const ControlledTextarea = ({ name, ...props }: TextareaProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const classes = props.classNames as StylesRecord<
    TextareaFactory["stylesNames"],
    string
  >;

  return (
    <MantineTextarea
      {...props}
      {...field}
      error={error?.message}
      classNames={{
        ...classes,
        input: cn(
          "rounded-[0.625rem] bg-input border-none text-white placeholder:text-white px-5 py-3",
          classes?.input
        ),
        error: cn("pl-1 text-sm", classes?.error),
      }}
    />
  );
};

export default ControlledTextarea;
