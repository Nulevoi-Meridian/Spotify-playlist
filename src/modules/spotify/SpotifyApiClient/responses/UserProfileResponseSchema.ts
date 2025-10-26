import { z } from "zod";

export const UserProfileResponseSchema = z.object({
  display_name: z.string().nullable(),
  email: z.string(),
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string().nullable(),
    total: z.number().int(),
  }),
  href: z.string(),
  id: z.string(),
  images: z.array(
    z.object({
      url: z.string(),
      height: z.number().int().nullable(),
      width: z.number().int().nullable(),
    })
  ),
  type: z.literal("user"),
  uri: z.string(),
});

export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
