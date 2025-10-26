import type { CookieOptions, CookieReturnType } from "@/types/types";
import type {
  getCookie,
  hasCookie,
  setCookie,
} from "../cookie_storage/cookieStorage";

export interface TokenManagerInterface {
  setToken: (options: CookieOptions) => Promise<void>;
  getToken: (name: CookieOptions["name"]) => Promise<CookieReturnType | null>;
  hasToken: (name: CookieOptions["name"]) => Promise<boolean>;
  isValidToken: (name: CookieOptions["name"]) => Promise<boolean>;
}

export interface TokenManagerParams {
  setCookie: typeof setCookie;
  getCookie: typeof getCookie;
  hasCookie: typeof hasCookie;
}
