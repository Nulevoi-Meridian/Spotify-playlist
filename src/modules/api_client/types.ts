/**
 * API Client Types
 * Core types for the reusable API service
 */

import type { GET, JsonMimeType, POST } from "./constants";

export type ApiClientBody = URLSearchParams | string;
export type ApiClientHttpMethod = typeof GET | typeof POST;
export type ApiClientResponseType = "json";
export type ApiClientQueryParams = Record<
  string,
  string | number | boolean | string[] | number[] | undefined
>;

export type ApiClientContentType = typeof JsonMimeType;

export interface ApiClientConfig {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
}

export interface ApiClientRequestConfig {
  method: ApiClientHttpMethod;
  url: string;
  body?: ApiClientBody;
  headers?: HeadersInit;
  responseType?: ApiClientResponseType;
  queryParams?: ApiClientQueryParams;
  contentType?: ApiClientContentType;
}

export interface ApiClientResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  originalError?: Error;
  responseBody?: unknown;
}

export interface ApiClientInterface {
  get<T = unknown>(
    config: Omit<ApiClientRequestConfig, "method" | "body" | "contentType">,
  ): Promise<ApiClientResponse<T>>;

  post<T = unknown>(
    config: Omit<ApiClientRequestConfig, "method">,
  ): Promise<ApiClientResponse<T>>;
}
