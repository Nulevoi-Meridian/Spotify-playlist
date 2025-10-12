export interface CookieOptions {
  name: string;
  value: string;
  expires?: number | Date | undefined;
  maxAge?: number | undefined;
  domain?: string | undefined;
  path?: string | undefined;
  secure?: boolean | undefined;
  httpOnly?: boolean | undefined;
  sameSite?: true | false | "lax" | "strict" | "none" | undefined;
  priority?: "low" | "medium" | "high" | undefined;
  partitioned?: boolean | undefined;
}

export type CookieReturnType = {
  name: string;
  value: string;
};
