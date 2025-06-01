import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { telegramAuth } from "@/lib/telegram/auth";
import { eq } from "drizzle-orm";

const AuthRequestSchema = z.object({
  initData: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData } = AuthRequestSchema.parse(body);

    // Validate Telegram auth data
    const authData = telegramAuth.validateAuthData(initData);

    if (!authData) {
      return NextResponse.json(
        { error: "Invalid authentication data" },
        { status: 401 }
      );
    }

    const { user: telegramUser, auth_date } = authData;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.telegramId, telegramUser.id))
      .limit(1);

    let user;

    if (existingUser.length > 0) {
      // Update existing user
      [user] = await db
        .update(users)
        .set({
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          username: telegramUser.username,
          photoUrl: telegramUser.photo_url,
          languageCode: telegramUser.language_code,
          isPremium: telegramUser.is_premium || false,
          allowsWriteToPm: telegramUser.allows_write_to_pm || false,
          authDate: new Date(auth_date * 1000),
          updatedAt: new Date(),
        })
        .where(eq(users.telegramId, telegramUser.id))
        .returning();
    } else {
      // Create new user
      [user] = await db
        .insert(users)
        .values({
          telegramId: telegramUser.id,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          username: telegramUser.username,
          photoUrl: telegramUser.photo_url,
          languageCode: telegramUser.language_code,
          isPremium: telegramUser.is_premium || false,
          allowsWriteToPm: telegramUser.allows_write_to_pm || false,
          authDate: new Date(auth_date * 1000),
        })
        .returning();
    }

    // Return user data
    return NextResponse.json({
      id: user.id,
      telegramId: user.telegramId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      photoUrl: user.photoUrl,
      languageCode: user.languageCode,
      isPremium: user.isPremium,
      allowsWriteToPm: user.allowsWriteToPm,
      authDate: user.authDate,
    });
  } catch (error) {
    console.error("Telegram auth API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
