import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { Users, FileText, Eye, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number;
  color: string;
}

interface DashboardStatsProps {
  totalNews: number;
  siteVisits: number;
  totalAds: number;
  totalUsers: number;
}

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStatsProps | null>(null);

  const fetchDashboardStats = async () => {
    const res = await axios.get("http://localhost:5000/api/statistics/total");
    if (res.status === 200) {
      setDashboardStats(res.data);
    } else {
      console.error("Failed to fetch dashboard stats");
    }
  };
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Dummy data for dashboard metrics
  // const dashboardStats = {
  //   totalNews: 20,
  //   totalSiteViews: 89432,
  //   totalAds: 156,
  //   totalUsers: 1
  // };

  // Dummy user data (if user from store doesn't have all fields)
  const defaultUser = {
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    userName: user?.userName || "johndoe",
    email: user?.email || "john.doe@admin.com",
    role: user?.role || "Super Admin",
  };

  const StatCard = ({ icon: Icon, title, value, color }: StatCardProps) => (
    <div
      className="bg-background/65 rounded-lg shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          {value && (
            <p className="text-3xl font-bold mt-1">{value.toLocaleString()}</p>
          )}
        </div>
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: color + "20" }}
        >
          <Icon size={24} style={{ color: color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-background/60 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={defaultUser.avatar}
              alt="Admin Avatar"
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold ">
                Welcome back, {defaultUser.firstName} {defaultUser.lastName}
              </h1>
              <div className="mt-2 space-y-1">
                <p className="text-gray-600">
                  <span className="font-medium">Username:</span> @
                  {defaultUser.userName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {defaultUser.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Role:</span>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {defaultUser.role}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats && (
              <>
                <StatCard
                  icon={FileText}
                  title="Total News Articles"
                  value={dashboardStats?.totalNews}
                  color="#3B82F6"
                />
                <StatCard
                  icon={Eye}
                  title="Total Site Views"
                  value={dashboardStats?.siteVisits}
                  color="#10B981"
                />
                <StatCard
                  icon={Monitor}
                  title="Total Advertisements"
                  value={dashboardStats.totalAds}
                  color="#F59E0B"
                />
                <StatCard
                  icon={Users}
                  title="Total Users"
                  value={dashboardStats?.totalUsers}
                  color="#8B5CF6"
                />
              </>
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent News */}
          <div className="bg-background/65 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              Recent News Articles
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Breaking: New Technology Announcement",
                  time: "2 hours ago",
                  status: "Published",
                },
                {
                  title: "Sports Update: Championship Finals",
                  time: "4 hours ago",
                  status: "Draft",
                },
                {
                  title: "Weather Alert: Storm Warning",
                  time: "6 hours ago",
                  status: "Published",
                },
                {
                  title: "Business News: Market Analysis",
                  time: "8 hours ago",
                  status: "Review",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium ">{article.title}</p>  
                    <p className="text-sm text-gray-500">{article.time}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : article.status === "Draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-background/65 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              System Status
            </h3>
            <div className="space-y-4">
              {[
                { service: "Website", status: "Online", uptime: "99.9%" },
                { service: "Database", status: "Online", uptime: "99.8%" },
                { service: "CDN", status: "Online", uptime: "100%" },
                { service: "API Server", status: "Online", uptime: "99.7%" },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">
                      {service.service}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      {service.status}
                    </p>
                    <p className="text-xs text-gray-500">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
