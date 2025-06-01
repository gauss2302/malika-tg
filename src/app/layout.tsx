import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TelegramAuth } from "@/components/auth/TelegramAuth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telegram Mini App",
  description: "A modern Telegram Mini App built with Next.js",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <TelegramAuth>
          <div className="min-h-screen bg-gray-50 pb-16">
            <main className="container mx-auto px-4 py-6 max-w-sm">
              {children}
            </main>
            <BottomNavigation />
          </div>
        </TelegramAuth>
      </body>
    </html>
  );
}
