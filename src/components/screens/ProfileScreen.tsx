"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useUserStore } from "@/lib/stores/userStore";

export const ProfileScreen = () => {
  const { user, clearUser } = useUserStore();

  const handleLogout = () => {
    clearUser();
    window.location.reload();
  };

  const profileItems = [
    {
      label: "User ID",
      value: user?.telegramId?.toString() || "N/A",
      icon: "🆔",
    },
    {
      label: "Username",
      value: user?.username ? `@${user.username}` : "Not set",
      icon: "👤",
    },
    {
      label: "Language",
      value: user?.languageCode?.toUpperCase() || "N/A",
      icon: "🌐",
    },
    {
      label: "Member Since",
      value: user?.authDate
        ? new Date(user.authDate).toLocaleDateString()
        : "N/A",
      icon: "📅",
    },
  ];

  const settings = [
    { label: "Notifications", icon: "🔔", hasToggle: true },
    { label: "Privacy Settings", icon: "🔒", hasToggle: false },
    { label: "Language", icon: "🌍", hasToggle: false },
    { label: "Help & Support", icon: "❓", hasToggle: false },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar size="xl" className="mb-4">
              {user?.photoUrl ? (
                <AvatarImage
                  src={user.photoUrl}
                  alt={`${user.firstName} ${user.lastName || ""}`}
                />
              ) : (
                <AvatarFallback className="text-xl">
                  {user?.firstName.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <h1 className="text-xl font-bold text-gray-900 mb-1">
              {user?.firstName} {user?.lastName}
            </h1>

            <div className="flex items-center space-x-2 mb-4">
              {user?.isPremium && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  ⭐ Premium User
                </span>
              )}
              {user?.allowsWriteToPm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  📩 DM Enabled
                </span>
              )}
            </div>

            <Button variant="secondary" size="sm" fullWidth>
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profileItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
              <span className="text-gray-900 font-medium">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-blue-700">Total Points</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-green-700">Tasks Completed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">7</div>
              <div className="text-sm text-purple-700">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-orange-700">Current Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {settings.map((setting) => (
            <div
              key={setting.label}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{setting.icon}</span>
                <span className="font-medium text-gray-700">
                  {setting.label}
                </span>
              </div>
              {setting.hasToggle ? (
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    defaultChecked
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Card>
        <CardContent className="p-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            🚪 Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
