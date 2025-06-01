"use client";

import { BottomNavigation } from "./BottomNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="container mx-auto px-4 py-6 max-w-sm">{children}</main>
      <BottomNavigation />
    </div>
  );
};
