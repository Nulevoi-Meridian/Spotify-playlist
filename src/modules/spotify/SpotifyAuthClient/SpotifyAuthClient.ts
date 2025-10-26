import { FormMimeType } from "@/modules/api_client/constants";
import type { ApiClientInterface } from "../../api_client/types";
import {
  SPOTIFY_AUTH_TOKEN_URL,
  SPOTIFY_GRANT_TYPES,
  SPOTIFY_REDIRECT_URI,
} from "./constants";
import {
  type RefreshTokenResponse,
  RefreshTokenResponseSchema,
} from "./responses/RefreshTokenResponseSchema";
import {
  type TokenResponse,
  TokenResponseSchema,
} from "./responses/TokenResponseSchema";

class SpotifyAuthClient {
  constructor(private readonly apiClient: ApiClientInterface) {}

  public async getAccessToken(code: string): Promise<TokenResponse> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        "Missing Spotify client credentials: SPOTIFY_CLIENT_ID and/or SPOTIFY_CLIENT_SECRET are not set in environment variables."
      );
    }

    const { data } = await this.apiClient.post({
      url: SPOTIFY_AUTH_TOKEN_URL,
      body: new URLSearchParams({
        grant_type: SPOTIFY_GRANT_TYPES.authCode,
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }).toString(),
      headers: {
        "Content-Type": FormMimeType,
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
    });

    return TokenResponseSchema.parse(data);
  }

  public async getRefreshToken(
    refreshToken: string
  ): Promise<RefreshTokenResponse> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId) {
      throw new Error(
        "Missing Spotify client credentials: SPOTIFY_CLIENT_ID and/or SPOTIFY_CLIENT_SECRET are not set in environment variables."
      );
    }

    const { data } = await this.apiClient.post({
      url: SPOTIFY_AUTH_TOKEN_URL,
      body: new URLSearchParams({
        grant_type: SPOTIFY_GRANT_TYPES.refreshToken,
        refresh_token: refreshToken,
      }).toString(),
      headers: {
        "Content-Type": FormMimeType,
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
    });

    return RefreshTokenResponseSchema.parse(data);
  }
}

export default SpotifyAuthClient;
