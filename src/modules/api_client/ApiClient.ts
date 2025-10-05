/**
 * API Client
 * Reusable HTTP client based on fetch API
 * Supports GET and POST requests with query params, headers, and URL handling
 */

import type {
  ApiClientConfig,
  ApiClientInterface,
  ApiError,
  ApiResponse,
  GetRequestConfig,
  HeadersRecord,
  HttpMethod,
  PostRequestConfig,
  QueryParams,
  RequestBody,
} from "./types";

/**
 * ApiClient - A reusable, type-safe HTTP client
 */
export class ApiClient implements ApiClientInterface {
  private baseUrl: string;
  private defaultHeaders: HeadersRecord;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || "";
    this.defaultHeaders = config.defaultHeaders || {};
  }

  private async request<T>(
    method: HttpMethod,
    url: string,
    body?: RequestBody,
    config: GetRequestConfig | PostRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url, config.queryParams);
    const headers = this.buildHeaders(method, body, config);

    try {
      // Prepare fetch options
      const fetchOptions: RequestInit = {
        method,
        headers,
      };

      // Add body for POST requests
      if (method === "POST" && body !== undefined) {
        fetchOptions.body = JSON.stringify(body);
      }

      // Perform the fetch request
      const response = await fetch(fullUrl, fetchOptions);

      // Parse response to JSON
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

  private buildUrl(url: string, queryParams?: QueryParams): string {
    // Combine base URL with provided URL
    let fullUrl = url.startsWith("http") ? url : `${this.baseUrl}${url}`;

    // Add query parameters if provided
    if (queryParams && Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(queryParams)) {
        if (value === undefined) continue;

        if (Array.isArray(value)) {
          // Handle array values
          for (const item of value) {
            searchParams.append(key, String(item));
          }
        } else {
          searchParams.append(key, String(value));
        }
      }

      const queryString = searchParams.toString();
      if (queryString) {
        fullUrl += fullUrl.includes("?")
          ? `&${queryString}`
          : `?${queryString}`;
      }
    }

    return fullUrl;
  }

  /**
   * Build request headers
   * @param method - HTTP method
   * @param body - Request body
   * @param config - Request configuration
   * @returns Headers object
   */
  private buildHeaders(
    method: HttpMethod,
    body?: RequestBody,
    config: GetRequestConfig | PostRequestConfig = {},
  ): Headers {
    const headers = new Headers();

    // Merge default headers with request-specific headers
    Object.entries({
      ...this.defaultHeaders,
      ...config.headers,
    }).forEach(([key, value]) => {
      headers.set(key, value);
    });

    // Set Content-Type for POST requests if not already set
    if (
      method === "POST" &&
      body !== undefined &&
      !headers.has("Content-Type")
    ) {
      const contentType =
        "contentType" in config && config.contentType
          ? config.contentType
          : "application/json";

      headers.set("Content-Type", contentType);
    }

    return headers;
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    // Handle empty responses (204 No Content, DELETE operations, etc.)
    if (response.status === 204) return {} as T;

    // Parse JSON response
    return response.json();
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

  async get<T = unknown>(
    url: string,
    config: GetRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, config);
  }

  async post<T = unknown>(
    url: string,
    body?: RequestBody,
    config: PostRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, body, config);
  }
}
