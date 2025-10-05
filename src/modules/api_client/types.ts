/**
 * API Client Types
 * Core types for the reusable API service
 */

/**
 * HTTP Methods supported by the API client
 */
export type HttpMethod = "GET" | "POST";

/**
 * Query parameters - can be a record of string/number/boolean values or arrays
 */
export type QueryParams = Record<
  string,
  string | number | boolean | string[] | number[] | undefined
>;

/**
 * HTTP Headers as key-value pairs
 */
export type HeadersRecord = Record<string, string>;

/**
 * Base request configuration
 */
export interface RequestConfig {
  /** Request headers */
  headers?: HeadersRecord;
  /** Query parameters to append to URL */
  queryParams?: QueryParams;
}

/**
 * Configuration for GET requests
 */
export interface GetRequestConfig extends RequestConfig {
  // GET-specific options can be added here
}

/**
 * Configuration for POST requests
 */
export interface PostRequestConfig extends RequestConfig {
  /** Content-Type header (defaults to 'application/json') */
  contentType?: string;
}

/**
 * Request body for POST requests
 * JSON object only - will be serialized with JSON.stringify
 */
export type RequestBody = Record<string, unknown>;

/**
 * Standardized API error
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** HTTP status code (if available) */
  statusCode?: number;
  /** Original error object */
  originalError?: Error;
  /** Response body (if available) */
  responseBody?: unknown;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  /** Response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** Response headers */
  headers: Headers;
  /** Success flag */
  ok: boolean;
}

/**
 * Complete API client configuration
 */
export interface ApiClientConfig {
  /** Base URL for all requests */
  baseUrl?: string;
  /** Default headers for all requests */
  defaultHeaders?: HeadersRecord;
}

/**
 * API Client Interface
 * Defines the public API for HTTP client implementations
 */
export interface ApiClientInterface {
  /**
   * Perform a GET request
   * @param url - Endpoint URL
   * @param config - Request configuration
   * @returns API response with typed data
   */
  get<T = unknown>(
    url: string,
    config?: GetRequestConfig,
  ): Promise<ApiResponse<T>>;

  /**
   * Perform a POST request
   * @param url - Endpoint URL
   * @param body - Request body (JSON object)
   * @param config - Request configuration
   * @returns API response with typed data
   */
  post<T = unknown>(
    url: string,
    body?: RequestBody,
    config?: PostRequestConfig,
  ): Promise<ApiResponse<T>>;
}
