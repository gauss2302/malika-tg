"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={clsx("w-6 h-6", isActive ? "text-blue-600" : "text-gray-400")}
    fill={isActive ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const HeartIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={clsx("w-6 h-6", isActive ? "text-blue-600" : "text-gray-400")}
    fill={isActive ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const SearchIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={clsx("w-6 h-6", isActive ? "text-blue-600" : "text-gray-400")}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const UserIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={clsx("w-6 h-6", isActive ? "text-blue-600" : "text-gray-400")}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export const BottomNavigation = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon isActive={pathname === "/"} />,
    },
    {
      label: "Favourite",
      href: "/favourite",
      icon: <HeartIcon isActive={pathname === "/favourite"} />,
    },
    {
      label: "Explore",
      href: "/explore",
      icon: <SearchIcon isActive={pathname === "/explore"} />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <UserIcon isActive={pathname === "/profile"} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {item.icon}
              <span
                className={clsx(
                  "text-xs font-medium truncate",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
