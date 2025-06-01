import { z } from "zod";

export const TelegramUserSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  photo_url: z.string().optional(),
  language_code: z.string().optional(),
  is_premium: z.boolean().optional(),
  allows_write_to_pm: z.boolean().optional(),
});

export const TelegramAuthDataSchema = z.object({
  user: TelegramUserSchema,
  chat_instance: z.string().optional(),
  chat_type: z.string().optional(),
  query_id: z.string().optional(),
  auth_date: z.number(),
  hash: z.string(),
});

export type TelegramUser = z.infer<typeof TelegramUserSchema>;
export type TelegramAuthData = z.infer<typeof TelegramAuthDataSchema>;

export interface AuthenticatedUser {
  id: number;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  languageCode?: string;
  isPremium: boolean;
  allowsWriteToPm: boolean;
  authDate: Date;
}
