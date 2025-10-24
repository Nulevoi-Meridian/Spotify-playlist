import { redirect } from "next/navigation";
import { SPOTIFY_AUTH_URL, SPOTIFY_REDIRECT_URI } from "@/constants";
import { generateId } from "@/utils";

export async function GET() {
  const scope =
    "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public";

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: generateId(),
    scope: scope,
    show_dialog: "true",
  });

  redirect(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
}
