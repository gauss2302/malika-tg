import {
  pgTable,
  text,
  timestamp,
  bigint,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  telegramId: bigint("telegram_id", { mode: "number" }).notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  username: text("username"),
  photoUrl: text("photo_url"),
  languageCode: text("language_code"),
  isPremium: boolean("is_premium").default(false),
  allowsWriteToPm: boolean("allows_write_to_pm").default(false),
  authDate: timestamp("auth_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
