import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  api.get<T>(url, config).then((res) => res.data);

export const post = <T = unknown, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
) => api.post<T>(url, body, config).then((res) => res.data);

export const put = <T = unknown, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
) => api.put<T>(url, body, config).then((res) => res.data);

export const del = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  api.delete<T>(url, config).then((res) => res.data);
