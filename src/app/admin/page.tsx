"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
// import IndiaMap from '@/components/admin/IndiaMap';
import {
  ShoppingCart,
  Flag,
  Users,
  IndianRupee,
  TrendingUp,
  Megaphone,
  Package,
  Ticket,
  Video,
  Map
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';

interface DashboardData {
  totalOrders: number;
  totalRevenue: number;
  recentRevenue: number;
  revenueGrowth: number;
  activeBanners: number;
  totalUsers: number;
  recentUsers: number;
  orderStatusCounts: Record<string, number>;
  activeAnnouncements: number;
  activeProducts: number;
  activeCoupons: number;
  activeFeatureVideos: number;
  stateWiseData: Array<{
    name: string;
    value: number;
    orders: number;
    revenue: number;
    customers: number;
  }>;
  dailyVisits: Array<{
    date: string;
    visits: number;
  }>;
  dailyRevenue: Array<{
    date: string;
    revenue: number;
  }>;
  userGrowth: Array<{
    date: string;
    users: number;
  }>;
  topProducts: Array<{
    name: string;
    orderCount: number;
    paymentStatus: 'pending' | 'completed' | 'failed';
  }>;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch dashboard data');
        }

        setDashboardData(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <AdminLayout title='Admin Page'>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title='Admin Page'>
        <div className="p-4 text-red-500 bg-red-100 rounded-lg">
          Error: {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title='Admin Page'>
      <div className="p-4 sm:p-6 lg:p-8 pt-0 max-w-[2000px] mx-auto">
        <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-6 sm:mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <h2 className="text-3xl text-gray-800 font-bold">{dashboardData?.totalOrders || 0}</h2>
              </div>
              <ShoppingCart className="text-blue-500 h-8 w-8" />
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <h2 className="text-3xl text-gray-800 font-bold">
                  ₹{(dashboardData?.totalRevenue || 0).toLocaleString('en-IN')}
                </h2>
              </div>
              <IndianRupee className="text-green-500 h-8 w-8" />
            </div>
          </div>

          {/* Active Banners */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Banners</p>
                <h2 className="text-3xl text-gray-800 font-bold">{dashboardData?.activeBanners || 0}</h2>
              </div>
              <Flag className="text-purple-500 h-8 w-8" />
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <h2 className="text-3xl text-gray-800 font-bold">{dashboardData?.totalUsers || 0}</h2>
              </div>
              <Users className="text-orange-500 h-8 w-8" />
            </div>
          </div>

          {/* Active Announcements */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Announcements</p>
                <h2 className="text-3xl text-gray-800 font-bold">{dashboardData?.activeAnnouncements || 0}</h2>
              </div>
              <Megaphone className="text-pink-500 h-8 w-8" />
            </div>
          </div>

          {/* Active Products */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Products</p>
                <h2 className="text-3xl text-gray-800 font-bold">{dashboardData?.activeProducts || 0}</h2>
              </div>
              <Package className="text-indigo-500 h-8 w-8" />
            </div>
          </div>

          {/* Active Coupons */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Coupons</p>
                <h2 className="text-3xl text-gray-800 font-bold">{dashboardData?.activeCoupons || 0}</h2>
              </div>
              <Ticket className="text-yellow-500 h-8 w-8" />
            </div>
          </div>

          {/* Feature Videos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Feature Videos</p>
                <h2 className="text-3xl text-gray-800 font-bold">{dashboardData?.activeFeatureVideos || 0}</h2>
              </div>
              <Video className="text-cyan-500 h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Revenue Growth Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg text-gray-600 font-semibold mb-4">Revenue Growth</h3>
            <div className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="text-gray-700">
                <AreaChart
                  data={dashboardData?.dailyRevenue || []}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    stroke="#666"
                  />
                  <YAxis
                    stroke="#666"
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}K`}
                    label={{
                      value: 'Revenue (₹)',
                      angle: -90,
                      position: 'insideLeft',
                      offset: -12,
                      style: { textAnchor: 'middle', fill: '#666', fontStyle: 'italic' }
                    }}
                  />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                    contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ stroke: '#4F46E5', strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    animationDuration={1500}
                    // dot={{ r: 4, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex text-gray-800 items-center space-x-4 mt-4">
              <TrendingUp className={`h-8 w-8 ${(dashboardData?.revenueGrowth ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <div>
                <p className="text-2xl font-bold">
                  {dashboardData?.revenueGrowth.toFixed(1)}%
                </p>
                <p className="text-gray-600 text-sm">vs last 30 days</p>
              </div>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg text-gray-600 font-semibold mb-4">User Growth</h3>
            <div className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="text-gray-700">
                <LineChart
                  data={dashboardData?.userGrowth || []}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    stroke="#666"
                  />
                  <YAxis
                    stroke="#666"
                    label={{
                      value: 'Number of Users',
                      angle: -90,
                      position: 'insideLeft',
                      offset: -5,
                      style: { textAnchor: 'middle', fill: '#666', fontStyle: 'italic' }
                    }}
                  />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    formatter={(value) => [`${value} users`, 'Total Users']}
                    contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ stroke: '#8B5CF6', strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#8B5CF6" }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl text-gray-800 font-bold">{dashboardData?.totalUsers || 0}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">New Users</p>
                <p className="text-2xl text-gray-800 font-bold">{dashboardData?.recentUsers || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg text-gray-600 font-semibold mb-4">Order Status Distribution</h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" className="text-gray-700">
              <BarChart
                data={Object.entries(dashboardData?.orderStatusCounts || {}).map(([status, count]) => ({
                  status,
                  count
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#6D28D9" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" opacity={0.5} />
                <XAxis dataKey="status" stroke="#666" tickLine={false} />
                <YAxis stroke="#666" tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ fill: 'rgba(109, 40, 217, 0.1)' }}
                />
                <Bar
                  dataKey="count"
                  fill="#4F46E5"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 text-gray-800 md:grid-cols-3 gap-4 mt-4">
            {Object.entries(dashboardData?.orderStatusCounts || {}).map(([status, count]) => (
              <div key={status} className={`bg-gray-50 p-4 rounded-lg ${status === 'confirmed' ? 'text-indigo-800 bg-indigo-50' : status === 'Pending' ? 'bg-yellow-50 text-yellow-800' : status === 'Delivered' ? 'bg-green-50 text-green-800' : status === 'Shipping' ? 'bg-purple-50 text-purple-800' : 'bg-red-50 text-red-800'}`}>
                <p className="text-sm capitalize">{status}</p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Daily Website Visits Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg text-gray-600 font-semibold mb-4">Daily Website Visits</h3>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-4">
            {/* Area Chart */}
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="text-gray-700">
                <ComposedChart
                  data={dashboardData?.dailyVisits.map(visit => {
                    const visits = dashboardData?.dailyVisits.map(v => v.visits) || [];
                    const peakVisits = Math.max(...visits);
                    const avgVisits = visits.reduce((a, b) => a + b, 0) / visits.length;
                    return {
                      ...visit,
                      peakVisits,
                      avgVisits
                    };
                  }) || []}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    stroke="#666"
                  />
                  <YAxis
                    stroke="#666"
                    label={{
                      value: 'Number of Visits',
                      angle: -90,
                      position: 'insideLeft',
                      offset: -5,
                      style: {
                        textAnchor: 'middle',
                        fill: '#666',
                        fontSize: 14,
                        fontStyle:'italic'
                      }
                    }}
                  />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    formatter={(value, name) => [
                      `${name === 'avgVisits' ? Math.round(Number(value)) : value} visits`,
                      name === 'visits' ? 'Daily Visits' : name === 'peakVisits' ? 'Peak Visits' : 'Average Visits'
                    ]}
                    contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ stroke: '#6D28D9', strokeWidth: 1 }}
                  />
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#6D28D9" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#6D28D9"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                    animationDuration={1500}
                    dot={{ r: 4, fill: "#6D28D9", strokeWidth: 2, stroke: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="peakVisits"
                    stroke="#EF4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="peakVisits"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgVisits"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="avgVisits"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            {/* <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="text-gray-700">
                <BarChart
                  data={dashboardData?.dailyVisits || []}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    stroke="#666"
                  />
                  <YAxis
                    stroke="#666"
                  />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    formatter={(value) => [`${value} visits`, 'Daily Visits']}
                    contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar
                    dataKey="visits"
                    fill="#4F46E5"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1500}
                  >
                    {(dashboardData?.dailyVisits || []).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.visits > (dashboardData?.dailyVisits || []).reduce((acc, curr) => acc + curr.visits, 0) / (dashboardData?.dailyVisits || []).length
                          ? '#6366F1'
                          : '#A5B4FC'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div> */}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 font-semibold">Today's Visits</p>
              <p className="text-2xl font-bold text-green-900">
                {(dashboardData?.dailyVisits || []).find(visit => 
                  new Date(visit.date).toDateString() === new Date().toDateString()
                )?.visits || 0}
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-indigo-600 font-semibold">Average Daily Visits</p>
              <p className="text-2xl font-bold text-indigo-900">
                {Math.round((dashboardData?.dailyVisits || []).reduce((acc, curr) => acc + curr.visits, 0) / (dashboardData?.dailyVisits || []).length)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-600 font-semibold">Peak Visits</p>
              <p className="text-2xl font-bold text-blue-900">
                {Math.max(...(dashboardData?.dailyVisits || []).map(visit => visit.visits))}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-600 font-semibold">Total Visits</p>
              <p className="text-2xl font-bold text-purple-900">
                {(dashboardData?.dailyVisits || []).reduce((acc, curr) => acc + curr.visits, 0)}
              </p>
            </div>
           
          </div>
        </div>

        {/* Most Ordered Products Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 mt-8">
          <h3 className="text-lg text-gray-600 font-semibold mb-4">Most Ordered Products</h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" className="text-gray-700">
              <PieChart>
                <Pie
                  data={(dashboardData?.topProducts || []).filter(product => product.paymentStatus === 'completed').map(product => ({
                    name: product.name,
                    value: product.orderCount
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {(dashboardData?.topProducts || []).map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={[
                        '#4F46E5',
                        '#22C55E',
                        '#F59E0B',
                        '#EC4899',
                        '#06B6D4'
                      ][index % 5]}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-lg font-semibold text-gray-700"
                >
                  {"Products"}
                </text>
                {/* <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm text-gray-500"
                  >
                    {dashboardData?.topProducts?.[0]?.orderCount || 0} orders
                  </text> */}
                <Tooltip
                  formatter={(value, name) => [`${value} orders`, name]}
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                  />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap4 mt-4">
            {dashboardData?.topProducts.filter(product => product.paymentStatus === 'completed').map((product, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${[
                  'bg-indigo-600',
                  'bg-green-500',
                  'bg-amber-500',
                  'bg-pink-500',
                  'bg-cyan-500'
                ][index % 5]}`}></div>
                <p className="text-sm text-gray-600 truncate">{product.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* State-wise Metrics Map */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-gray-600 font-semibold">State-wise Distribution</h3>
            <div className="flex items-center space-x-2">
              <Map className="text-indigo-500 h-6 w-6" />
            </div>
          </div>
          <div className="h-[500px] w-full">
            {dashboardData?.stateWiseData && (
              <IndiaMap
                stateData={dashboardData.stateWiseData}
                metric="orders"
              />
            )}
          </div>
        </div> */}
      </div>
    </AdminLayout>
  );
}
