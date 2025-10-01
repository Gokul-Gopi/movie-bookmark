import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  return error?.message ?? "Something went wrong, Please try again later";
};

export const validateBody = <T extends z.ZodTypeAny>(
  schema: T,
  body: unknown
): z.infer<T> => {
  return schema.parse(body);
};
