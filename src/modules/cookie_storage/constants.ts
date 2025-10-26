export const COOKIE_NAMES = {
  SPOTIFY_ACCESS_TOKEN: "spotify_access_token",
  SPOTIFY_REFRESH_TOKEN: "spotify_refresh_token",
  SPOTIFY_EXPIRATION_TIME: "spotify_expiration_time",
} as const;

// 1 year in seconds
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;
