import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { REFRESH_TOKEN_ROUTE_URL } from "./constants";
import { COOKIE_NAMES } from "./modules/cookie_storage/constants";
import { tokenManager } from "./modules/token_manager/tokenManager";

export const config = {
  matcher: "/routes/auth/login",
};

export async function proxy(request: NextRequest) {
  if (!(await tokenManager.hasToken(COOKIE_NAMES.SPOTIFY_REFRESH_TOKEN))) {
    return NextResponse.next();
  }

  if (
    !(await tokenManager.isValidToken(COOKIE_NAMES.SPOTIFY_EXPIRATION_TIME))
  ) {
    return NextResponse.redirect(new URL(REFRESH_TOKEN_ROUTE_URL, request.url));
  }
}
