import { cookies } from "next/headers";

import type { CookieOptions } from "@/types/types";

/**
 * Sets a cookie with the specified key, value, and options.
 *
 * @param name - The cookie name
 * @param value - The cookie value
 * @param options - Optional cookie configuration (httpOnly, secure, sameSite, maxAge, etc.)
 */
export const setCookie = async (options: CookieOptions): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(options);
};

/**
 * Gets a cookie value by name.
 *
 * @param name - The cookie name
 * @returns The cookie value or null if not found
 */
export const getCookie = async (
  name: CookieOptions["name"]
): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? null;
};

/**
 * Checks if a cookie exists.
 *
 * @param name - The cookie name
 * @returns True if the cookie exists, false otherwise
 */
export const hasCookie = async (
  name: CookieOptions["name"]
): Promise<boolean> => {
  const cookieStore = await cookies();
  return cookieStore.has(name);
};
