"use client";

import { useEffect } from "react";
import { init } from "@telegram-apps/sdk-react";
import { TelegramAuth } from "@/components/auth/TelegramAuth";

import { HomeScreen } from "@/components/screens/HomeScreen";

export default function HomePage() {
  useEffect(() => {
    // Initialize the SDK once when the app starts
    init();
  }, []);

  return (
    <TelegramAuth>
      <HomeScreen />
    </TelegramAuth>
  );
}
