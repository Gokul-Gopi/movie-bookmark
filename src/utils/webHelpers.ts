import { RequestError } from "@/types/response";
import { notifications } from "@mantine/notifications";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const alertError = (error: RequestError) => {
  notifications.show({
    title: "Error",
    message:
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong, Please try again later",
    color: "red",
  });
};
