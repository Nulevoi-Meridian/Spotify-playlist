import { cookies } from "next/headers";

import type { CookieOptions, CookieReturnType } from "@/types/types";

/**
 * Sets a cookie with the specified options.
 *
 * @param options - Cookie configuration object (name, value, httpOnly, secure, sameSite, maxAge, etc.)
 */
export const setCookie = async (options: CookieOptions): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(options);
};

/**
 * Gets a cookie value by name.
 *
 * @param name - The name of the cookie to retrieve
 * @returns The cookie value or null if not found
 */
export const getCookie = async (
  name: CookieOptions["name"]
): Promise<CookieReturnType | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(name) ?? null;
};

/**
 * Checks if a cookie exists by name.
 *
 * @param name - The name of the cookie to check
 * @returns True if the cookie exists, false otherwise
 */
export const hasCookie = async (
  name: CookieOptions["name"]
): Promise<boolean> => {
  const cookieStore = await cookies();
  return cookieStore.has(name);
};
