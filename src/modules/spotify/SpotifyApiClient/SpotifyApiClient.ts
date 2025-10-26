import { JsonMimeType } from "@/modules/api_client/constants";
import type { ApiClientInterface } from "@/modules/api_client/types";
import { SPOTIFY_TOKEN_TYPE } from "../SpotifyAuthClient/constants";
import { SPOTIFY_API_BASE_URL, SPOTIFY_API_USER_URL } from "./constants";
import {
  type UserProfileResponse,
  UserProfileResponseSchema,
} from "./responses/UserProfileResponseSchema";

class SpotifyApiClient {
  constructor(private readonly apiClient: ApiClientInterface) {}

  public async getUserProfile(
    accessToken: string
  ): Promise<UserProfileResponse> {
    const { data } = await this.apiClient.get({
      url: SPOTIFY_API_USER_URL,
      headers: {
        Authorization: `${SPOTIFY_TOKEN_TYPE} ${accessToken}`,
      },
    });

    return UserProfileResponseSchema.parse(data);
  }

  public async createPlaylist(
    userId: string,
    accessToken: string,
    body: {
      name: string;
      description?: string;
      public?: boolean;
    }
  ) {
    const { data } = await this.apiClient.post({
      url: `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
      body: JSON.stringify(body),
      headers: {
        Authorization: `${SPOTIFY_TOKEN_TYPE} ${accessToken}`,
        "Content-Type": JsonMimeType,
      },
    });

    //TODO add schema validation
    return data;
  }
}

export default SpotifyApiClient;
