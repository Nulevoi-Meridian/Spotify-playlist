// /**
//  * Token Manager
//  * Manages Spotify OAuth tokens (access, refresh, expiration)
//  *
//  */

import type { CookieOptions, CookieReturnType } from "@/types/types";
import {
  getCookie,
  hasCookie,
  setCookie,
} from "../cookie_storage/cookieStorage";
import { TOKEN_EXPIRATION_SAFETY_WINDOW_MS } from "./constants";
import type { TokenManagerInterface, TokenManagerParams } from "./types";

const createTokenManager = (
  params: TokenManagerParams
): TokenManagerInterface => {
  const { setCookie, getCookie, hasCookie } = params;

  const isTokenExpired = async (
    name: CookieOptions["name"]
  ): Promise<boolean> => {
    const token = await getToken(name);
    if (!token) return true;

    return Date.now() >= +token.value - TOKEN_EXPIRATION_SAFETY_WINDOW_MS;
  };

  const setToken = (options: CookieOptions): void => {
    setCookie(options);
  };

  const getToken = (
    name: CookieOptions["name"]
  ): Promise<CookieReturnType | null> => getCookie(name);

  const hasToken = (name: CookieOptions["name"]): Promise<boolean> =>
    hasCookie(name);

  const isValidToken = async (
    name: CookieOptions["name"]
  ): Promise<boolean> => {
    const isToken = await hasToken(name);
    const isExpired = await isTokenExpired(name);

    return isToken && !isExpired;
  };

  return {
    setToken,
    getToken,
    hasToken,
    isValidToken,
  };
};

export const tokenManager = createTokenManager({
  setCookie,
  getCookie,
  hasCookie,
});
