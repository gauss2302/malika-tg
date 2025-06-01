import { useEffect } from "react";
import { useRawInitData } from "@telegram-apps/sdk-react";
import { useUserStore } from "@/lib/stores/userStore";

export const useTelegramAuth = () => {
  const { setUser, setLoading, setError, isAuthenticated } = useUserStore();
  // const launchParams = useLaunchParams();
  const rawInitData = useRawInitData();

  useEffect(() => {
    const authenticateUser = async () => {
      if (isAuthenticated) return;

      try {
        setLoading(true);

        // Use rawInitData for authentication (this is the correct way in v3)
        if (!rawInitData) {
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
  }, [rawInitData, isAuthenticated, setUser, setLoading, setError]);

  return useUserStore();
};
