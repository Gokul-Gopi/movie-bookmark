import { cn } from "@/utils/webHelpers";
import {
  YearPickerInput as MantineYearPickerInput,
  YearPickerInputProps as MantineYearPickerInputProps,
} from "@mantine/dates";
import type { YearPickerInputFactory } from "@mantine/dates";
import type { StylesRecord } from "@mantine/core";
import { useController } from "react-hook-form";

interface YearPickerInputProps extends MantineYearPickerInputProps {
  name: string;
}

const ControlledYearPickerInput = ({
  name,
  ...props
}: YearPickerInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const classes = props.classNames as StylesRecord<
    YearPickerInputFactory["stylesNames"],
    string
  >;

  return (
    <MantineYearPickerInput
      popoverProps={{ classNames: { dropdown: "bg-input text-white" } }}
      {...props}
      {...field}
      error={error?.message}
      classNames={{
        ...classes,
        input: cn(
          "rounded-[0.625rem] bg-input border-none text-white px-5 h-[2.813rem]",
          classes?.input
        ),
        placeholder: cn("text-white", classes?.placeholder),
        error: cn("pl-1 text-sm", classes?.error),
      }}
    />
  );
};

export default ControlledYearPickerInput;
