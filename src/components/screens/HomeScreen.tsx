"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useUserStore } from "@/lib/stores/userStore";

export const HomeScreen = () => {
  const { user } = useUserStore();

  const stats = [
    { label: "Points", value: "1,234", icon: "⭐" },
    { label: "Level", value: "5", icon: "🏆" },
    { label: "Streak", value: "7 days", icon: "🔥" },
  ];

  const activities = [
    {
      title: "Daily Check-in",
      description: "Earn 10 points",
      status: "available",
    },
    {
      title: "Share with Friends",
      description: "Earn 50 points",
      status: "completed",
    },
    {
      title: "Complete Profile",
      description: "Earn 25 points",
      status: "available",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar size="lg">
              {user?.photoUrl ? (
                <AvatarImage src={user.photoUrl} alt={user.firstName} />
              ) : (
                <AvatarFallback>
                  {user?.firstName.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600">
                {user?.isPremium && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                    ⭐ Premium
                  </span>
                )}
                Ready to earn some points?
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} variant="bordered">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-lg font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <Button
                size="sm"
                variant={
                  activity.status === "completed" ? "secondary" : "primary"
                }
                disabled={activity.status === "completed"}
              >
                {activity.status === "completed" ? "✓ Done" : "Start"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Featured Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-2">🎉 Special Offer</h2>
          <p className="text-blue-100 mb-4">
            Complete 3 tasks today and get a bonus 100 points!
          </p>
          <Button variant="secondary" size="sm">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
