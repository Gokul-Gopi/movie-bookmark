import { cn } from "@/utils/webHelpers";
import {
  YearPickerInput as MantineYearPickerInput,
  YearPickerInputProps as MantineYearPickerInputProps,
} from "@mantine/dates";
import type { DatesRangeValue, YearPickerInputFactory } from "@mantine/dates";
import type { StylesRecord } from "@mantine/core";

interface YearPickerInputProps
  extends Omit<MantineYearPickerInputProps, "onChange"> {
  onChange: (value: string | DatesRangeValue<string> | string[] | null) => void;
  name: string;
}

const YearPickerInput = ({ ...props }: YearPickerInputProps) => {
  const classes = props.classNames as StylesRecord<
    YearPickerInputFactory["stylesNames"],
    string
  >;

  return (
    <MantineYearPickerInput
      valueFormat="YYYY"
      popoverProps={{ classNames: { dropdown: "bg-input text-white" } }}
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

export default YearPickerInput;
