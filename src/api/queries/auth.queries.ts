import { useMutation } from "@tanstack/react-query";
import { api } from "../axios";
import { z } from "zod";
import { signinSchema, signupSchema } from "@/utils/validationSchema";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof signupSchema>) => {
      const res = await api.post("/auth/signup", payload);
      return res;
    },
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof signinSchema>) => {
      const res = await api.post("/auth/signin", payload);
      return res;
    },
  });
};
