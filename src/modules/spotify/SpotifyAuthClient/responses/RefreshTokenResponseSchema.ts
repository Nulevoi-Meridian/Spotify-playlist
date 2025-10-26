import { z } from "zod";
import { TokenResponseSchema } from "./TokenResponseSchema";

export const RefreshTokenResponseSchema = TokenResponseSchema.omit({
  refresh_token: true,
}).extend({
  refresh_token: z.string().optional(),
});

export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
