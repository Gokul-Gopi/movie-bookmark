import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  return error?.message ?? "Something went wrong, Please try again later";
};

export const validateBody = <T extends z.ZodObject>(
  schema: T,
  body: z.infer<T>
) => {
  schema.parse(body);
  return body;
};
