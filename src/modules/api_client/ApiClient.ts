/**
 * API Client
 * Reusable HTTP client based on fetch API
 * Supports GET and POST requests with query params, headers, and URL handling
 */

import { GET, JsonMimeType, POST } from "./constants";
import type {
  ApiClientConfig,
  ApiClientInterface,
  ApiClientQueryParams,
  ApiClientRequestConfig,
  ApiClientResponse,
  ApiError,
} from "./types";

export class ApiClient implements ApiClientInterface {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl || "";
    this.defaultHeaders = config.defaultHeaders || {};
  }

  private async request<T>(
    config: ApiClientRequestConfig,
  ): Promise<ApiClientResponse<T>> {
    const { url: path, queryParams, method, body } = config;

    const url = this.constructUrl({
      baseUrl: this.baseUrl,
      url: path,
      queryParams,
    });
    const headers = this.createRequestHeaders(config);
    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (method === POST && body !== undefined) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, fetchOptions);
      const data = await this.parseResponse<T>(response);

      return {
        data,
        status: response.status,
        headers: response.headers,
        ok: response.ok,
      };
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  private constructUrl(params: {
    baseUrl: string;
    url: string;
    queryParams?: ApiClientQueryParams;
  }): string {
    const { baseUrl, url: path, queryParams } = params;
    let url = new URL(path, baseUrl).toString();

    if (queryParams && Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(queryParams)) {
        if (value === undefined) continue;

        if (Array.isArray(value)) {
          for (const item of value) {
            searchParams.append(key, String(item));
          }
        } else {
          searchParams.append(key, String(value));
        }
      }

      const queryString = searchParams.toString();
      if (queryString) {
        url += url.includes("?") ? `&${queryString}` : `?${queryString}`;
      }
    }

    return url;
  }

  private createRequestHeaders(config: ApiClientRequestConfig): Headers {
    const { headers: customHeaders, method, body, contentType } = config;
    const headers = new Headers();

    Object.entries({
      ...this.defaultHeaders,
      ...(customHeaders || {}),
    }).forEach(([key, value]) => {
      headers.set(key, value);
    });

    if (method === POST && body !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", contentType || JsonMimeType);
    }

    return headers;
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    try {
      return await response.json();
    } catch (error) {
      throw this.createApiError(
        error instanceof Error
          ? new Error(`Failed to parse JSON response: ${error.message}`)
          : new Error("Failed to parse JSON response"),
      );
    }
  }

  private createApiError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        originalError: error,
      };
    }

    return {
      message: "An unknown error occurred",
      originalError: error as Error,
    };
  }

  async get<T>(
    config: Omit<ApiClientRequestConfig, "method" | "body" | "contentType">,
  ): Promise<ApiClientResponse<T>> {
    return this.request<T>({
      ...config,
      method: GET,
    });
  }

  async post<T = unknown>(
    config: Omit<ApiClientRequestConfig, "method">,
  ): Promise<ApiClientResponse<T>> {
    return this.request<T>({
      ...config,
      method: POST,
    });
  }
}
