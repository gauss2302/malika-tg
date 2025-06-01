"use client";

import { useEffect } from "react";
import { init } from "@telegram-apps/sdk-react";
import { TelegramAuth } from "@/components/auth/TelegramAuth";
import { Layout } from "@/components/layout/Layout";
import { ProfileScreen } from "@/components/screens/ProfileScreen";

export default function ProfilePage() {
  useEffect(() => {
    // Initialize the SDK once when the app starts
    init();
  }, []);

  return (
    <TelegramAuth>
      <Layout>
        <ProfileScreen />
      </Layout>
    </TelegramAuth>
  );
}
