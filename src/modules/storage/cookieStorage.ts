import type { CookieListItem } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
// import type { CookieOptions } from "./types";

/**
 * Sets a cookie with the specified key, value, and options.
 *
 * @param key - The cookie name
 * @param value - The cookie value
 * @param options - Optional cookie configuration (httpOnly, secure, sameSite, maxAge, etc.)
 */
export const setCookie = async (
  key: string,
  value: string,
  options?: CookieListItem,
): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, options);
};

/**
 * Gets a cookie value by key.
 *
 * @param key - The cookie name
 * @returns The cookie value or null if not found
 */
export const getCookie = async (key: string): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value ?? null;
};

// /**
//  * Removes a cookie by key.
//  *
//  * @param key - The cookie name
//  */
// export async function removeCookie(key: string): Promise<void> {
//   const cookieStore = await cookies();
//   cookieStore.delete(key);
// }

/**
 * Checks if a cookie exists.
 *
 * @param key - The cookie name
 * @returns True if the cookie exists, false otherwise
 */
export const hasCookie = async (key: string): Promise<boolean> => {
  const cookieStore = await cookies();
  return cookieStore.has(key);
};

// /**
//  * Gets all cookies as a Map.
//  *
//  * @returns Map of all cookies
//  */
// export async function getAllCookies(): Promise<Map<string, string>> {
//   const cookieStore = await cookies();
//   const allCookies = cookieStore.getAll();

//   const cookieMap = new Map<string, string>();
//   for (const cookie of allCookies) {
//     cookieMap.set(cookie.name, cookie.value);
//   }

//   return cookieMap;
// }

// /**
//  * Removes multiple cookies at once.
//  *
//  * @param keys - Array of cookie names to remove
//  */
// export async function removeMultipleCookies(keys: string[]): Promise<void> {
//   const cookieStore = await cookies();
//   for (const key of keys) {
//     cookieStore.delete(key);
//   }
// }
