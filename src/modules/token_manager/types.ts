import type { CookieOptions } from "@/types/types";
import type {
  getCookie,
  hasCookie,
  setCookie,
} from "../cookie_storage/cookieStorage";

export interface TokenManagerInterface {
  setToken: (options: CookieOptions) => void;
  getToken: (name: CookieOptions["name"]) => Promise<string | null>;
  hasToken: (name: CookieOptions["name"]) => Promise<boolean>;
  isValidToken: (name: CookieOptions["name"]) => Promise<boolean>;
}

export interface TokenManagerParams {
  setCookie: typeof setCookie;
  getCookie: typeof getCookie;
  hasCookie: typeof hasCookie;
}
