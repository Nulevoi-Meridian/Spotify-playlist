import { SPOTIFY_REDIRECT_URI, SPOTIFY_TOKEN_URL } from "@/constants";
import { FormMimeType } from "../api_client/constants";
import type { ApiClientInterface } from "../api_client/types";

class SpotifyApiClient {
  constructor(private readonly apiClient: ApiClientInterface) {}

  public getSpotifyToken(code: string) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        "Missing Spotify client credentials: SPOTIFY_CLIENT_ID and/or SPOTIFY_CLIENT_SECRET are not set in environment variables."
      );
    }

    return this.apiClient.post({
      url: SPOTIFY_TOKEN_URL,
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }).toString(),
      headers: {
        "Content-Type": FormMimeType,
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
    });
  }
}

export default SpotifyApiClient;
