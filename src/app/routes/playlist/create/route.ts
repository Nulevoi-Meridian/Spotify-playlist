import { type NextRequest, NextResponse } from "next/server";
import { ApiClient } from "@/modules/api_client/ApiClient";
import { COOKIE_NAMES } from "@/modules/cookie_storage/constants";
import { SPOTIFY_API_BASE_URL } from "@/modules/spotify/SpotifyApiClient/constants";
import SpotifyApiClient from "@/modules/spotify/SpotifyApiClient/SpotifyApiClient";

export async function GET(request: NextRequest) {
  const token =
    request.cookies.get(COOKIE_NAMES.SPOTIFY_ACCESS_TOKEN)?.value ?? "";
  const spotifyApiClient = new SpotifyApiClient(
    new ApiClient({
      baseUrl: SPOTIFY_API_BASE_URL,
    })
  );

  const { id } = await spotifyApiClient.getUserProfile(token);
  const data = await spotifyApiClient.createPlaylist(id, token, {
    name: "My New Playlist",
    description: "Created via Spotify API",
    public: false,
  });

  return NextResponse.json({ data });
}
