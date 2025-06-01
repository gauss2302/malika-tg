"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/stores/userStore";

export const useTelegramAuth = () => {
  const { setUser, setLoading, setError, isAuthenticated } = useUserStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const authenticateUser = async () => {
      if (isAuthenticated || !isMounted) return;

      try {
        setLoading(true);

        // Get init data from Telegram Web App
        const rawInitData = window.Telegram?.WebApp?.initData;

        // Development mode: use mock data if no Telegram context
        if (!rawInitData) {
          if (process.env.NODE_ENV === "development") {
            console.warn("Development mode: Using mock user data");

            // Mock user data for development
            const mockUser = {
              id: 1,
              telegramId: 123456789,
              firstName: "Dev",
              lastName: "User",
              username: "devuser",
              photoUrl: undefined,
              languageCode: "en",
              isPremium: false,
              allowsWriteToPm: true,
              authDate: new Date(),
            };

            setUser(mockUser);
            setLoading(false);
            return;
          }
          throw new Error("No init data available");
        }

        const response = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            initData: rawInitData,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Authentication failed");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Authentication failed";
        setError(errorMessage);
        console.error("Telegram authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, [isAuthenticated, isMounted, setUser, setLoading, setError]);

  return useUserStore();
};
