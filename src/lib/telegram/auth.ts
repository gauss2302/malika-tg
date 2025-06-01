import crypto from "crypto";
import { TelegramAuthData, TelegramAuthDataSchema } from "./types";

export class TelegramAuthService {
  private readonly botToken: string;

  constructor(botToken: string) {
    this.botToken = botToken;
  }

  /**
   * Validates Telegram authentication data
   */
  public validateAuthData(initData: string): TelegramAuthData | null {
    try {
      const urlParams = new URLSearchParams(initData);
      const hash = urlParams.get("hash");

      if (!hash) {
        throw new Error("Hash parameter is missing");
      }

      urlParams.delete("hash");

      const dataChechArr: string[] = [];
      for (const [key, value] of urlParams.entries()) {
        dataChechArr.push(`${key}=${value}`);
      }

      const dataCheckString = dataChechArr.sort().join("\n");

      // Validate hash
      if (!this.validateHash(dataCheckString, hash)) {
        throw new Error("Invalid hash");
      }

      // Parse user data from the 'user' parameter
      const userParam = urlParams.get("user");
      const authDateParam = urlParams.get("auth_date");

      if (!userParam || !authDateParam) {
        throw new Error("Missing required parameters");
      }

      const userData = JSON.parse(userParam);
      const authDate = parseInt(authDateParam, 10);

      // Validate data structure using Zod
      const authData = TelegramAuthDataSchema.parse({
        user: userData,
        auth_date: authDate,
        hash,
        chat_instance: urlParams.get("chat_instance") || undefined,
        chat_type: urlParams.get("chat_type") || undefined,
      });

      // Check if auth data is not too old (1 hour)
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime - authData.auth_date > 3600) {
        throw new Error("Auth data is too old");
      }

      return authData;
    } catch (erorr) {
      console.error("Error validating Telegram auth data:", erorr);
      return null;
    }
  }

  private validateHash(dataCheckString: string, hash: string): boolean {
    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(this.botToken)
      .digest();

    const calculateHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");
    return calculateHash === hash;
  }
}

export const telegramAuth = new TelegramAuthService(
  process.env.TELEGRAM_BOT_TOKEN || ""
);
