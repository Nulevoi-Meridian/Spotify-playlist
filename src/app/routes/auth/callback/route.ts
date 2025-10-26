import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { CREATE_PLAYLIST_ROUTE_URL, MAIN_URL } from "@/constants";
import { ApiClient } from "@/modules/api_client/ApiClient";
import {
  COOKIE_NAMES,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
} from "@/modules/cookie_storage/constants";
import { SPOTIFY_AUTH_BASE_URL } from "@/modules/spotify/SpotifyAuthClient/constants";
import SpotifyAuthClient from "@/modules/spotify/SpotifyAuthClient/SpotifyAuthClient";
import { tokenManager } from "@/modules/token_manager/tokenManager";

export async function GET(request: NextRequest) {
  const requestParams = request.nextUrl.searchParams;

  if (requestParams.has("error")) redirect(MAIN_URL);

  if (requestParams.has("code")) {
    const spotifyApiClient = new SpotifyAuthClient(
      new ApiClient({
        baseUrl: SPOTIFY_AUTH_BASE_URL,
      })
    );

    const { access_token, refresh_token, expires_in } =
      await spotifyApiClient.getAccessToken(requestParams.get("code") || "");

    await tokenManager.setToken({
      name: COOKIE_NAMES.SPOTIFY_ACCESS_TOKEN,
      value: access_token,
      httpOnly: true,
      secure: true,
      maxAge: expires_in,
    });

    await tokenManager.setToken({
      name: COOKIE_NAMES.SPOTIFY_REFRESH_TOKEN,
      value: refresh_token,
      httpOnly: true,
      secure: true,
      maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
    });

    await tokenManager.setToken({
      name: COOKIE_NAMES.SPOTIFY_EXPIRATION_TIME,
      value: String(Date.now() + expires_in * 1000),
      httpOnly: true,
      secure: true,
      maxAge: expires_in,
    });
  }

  return redirect(CREATE_PLAYLIST_ROUTE_URL);
}
