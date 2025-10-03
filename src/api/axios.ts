import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// api.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/signin";
//       }
//     }

//     // toast.error(error.response?.data?.message ?? 'Unexpected error');

//     return Promise.reject(error);
//   }
// );

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
