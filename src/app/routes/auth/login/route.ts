import { redirect } from "next/navigation";
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_REDIRECT_URI,
} from "@/modules/spotify/SpotifyAuthClient/constants";
import { generateId } from "@/utils";

export async function GET() {
  const scope =
    "user-read-email playlist-modify-private playlist-modify-public";

  const params = new URLSearchParams({
    //TODO: move client_id to env variable on hosting
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: generateId(),
    scope,
    //TODO: set to false in production
    show_dialog: "true",
  });

  redirect(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
}
