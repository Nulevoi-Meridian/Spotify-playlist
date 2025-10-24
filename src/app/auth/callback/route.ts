import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";
import { MAIN_URL } from "@/constants";
import { ApiClient } from "@/modules/api_client/ApiClient";
import SpotifyApiClient from "@/modules/spotify_service/SpotifyApiClient";

export async function GET(request: NextRequest) {
  const requestParams = request.nextUrl.searchParams;

  if (requestParams.has("error")) redirect(MAIN_URL);

  if (requestParams.has("code")) {
    const spotifyApiClient = new SpotifyApiClient(new ApiClient({}));

    console.log("Requesting Spotify token...");
    const { data } = await spotifyApiClient.getSpotifyToken(
      requestParams.get("code") || ""
    );

    console.log(data, "spotify token data");

    // console.log(data, "spotify token data");
  }

  return NextResponse.json({ data: "ok" });
}
