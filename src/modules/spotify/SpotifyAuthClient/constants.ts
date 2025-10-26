export const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com";
export const SPOTIFY_AUTH_URL = `${SPOTIFY_AUTH_BASE_URL}/authorize`;
export const SPOTIFY_AUTH_TOKEN_URL = "/api/token";
export const SPOTIFY_REDIRECT_URI =
  "https://myapp.local:3000/routes/auth/callback";

export const SPOTIFY_TOKEN_TYPE = "Bearer";

export const SPOTIFY_GRANT_TYPES = {
  authCode: "authorization_code",
  refreshToken: "refresh_token",
};
