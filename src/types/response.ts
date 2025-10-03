import { AxiosError, AxiosResponse } from "axios";

export interface IMovie {
  id: string;
  title: string;
  description: string;
  publishedOn: string;
  poster: string;
}

interface AxiosErrorResponse extends AxiosResponse {
  data: {
    message: string;
  };
}

export interface RequestError extends AxiosError {
  response: AxiosErrorResponse;
}

export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface IPaginatedMovies {
  data: IMovie[];
  pagination: IPagination;
}
