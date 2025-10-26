import { z } from "zod";
import { SPOTIFY_TOKEN_TYPE } from "../constants";

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.literal(SPOTIFY_TOKEN_TYPE),
  scope: z.string(),
  expires_in: z.number().int(),
  refresh_token: z.string(),
});

export type TokenResponse = z.infer<typeof TokenResponseSchema>;
