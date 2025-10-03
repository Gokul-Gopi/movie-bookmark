import { useMutation } from "@tanstack/react-query";
import { api } from "../axios";
import { z } from "zod";
import { signinSchema, signupSchema } from "@/utils/validationSchema";
import { RequestError } from "@/types/response";
import { alertError } from "@/utils/webHelpers";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof signupSchema>) => {
      const res = await api.post("/auth/signup", payload);
      return res;
    },
    onError: (error: RequestError) => alertError(error),
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof signinSchema>) => {
      const res = await api.post("/auth/signin", payload);
      return res;
    },
    onError: (error: RequestError) => alertError(error),
  });
};
