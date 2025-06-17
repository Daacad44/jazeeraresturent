import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingBag, Calendar, Star, Award } from 'lucide-react';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useAuth } from '../contexts/AuthContext';

const Analytics: React.FC = () => {
  const { dailyStats, customerVisits, getTodayStats, getTopSellingItems, getRevenueData } = useAnalytics();
  const { isAdmin } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  if (!isAdmin()) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access analytics.
          </p>
        </div>
      </div>
    );
  }

  const todayStats = getTodayStats();
  const topSellingItems = getTopSellingItems(selectedPeriod);
  const revenueData = getRevenueData(selectedPeriod);
  const totalRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = dailyStats
    .filter(day => {
      const dayDate = new Date(day.date);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - selectedPeriod);
      return dayDate >= cutoff;
    })
    .reduce((sum, day) => sum + day.totalOrders, 0);

  const returningCustomers = customerVisits.filter(customer => customer.visitCount > 1);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your restaurant's performance and customer insights
          </p>
        </div>

        {/* Period Selection */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {[7, 14, 30].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedPeriod(days)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedPeriod === days
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700'
                }`}
              >
                Last {days} days
              </button>
            ))}
          </div>
        </div>

        {/* Today's Stats */}
        {todayStats && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Today's Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Orders Today</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayStats.totalOrders}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Revenue Today</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${todayStats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${todayStats.averageOrderValue.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Top Item</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{todayStats.topSellingItem}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{todayStats.topSellingQuantity} sold</p>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Period Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Last {selectedPeriod} Days Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${averageOrderValue.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Returning Customers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{returningCustomers.length}</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Selling Items */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Top Selling Items
            </h3>
            <div className="space-y-4">
              {topSellingItems.slice(0, 10).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-yellow-600">#{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">sold</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
              Revenue Trend
            </h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Revenue Chart</p>
                <div className="mt-4 space-y-2">
                  {revenueData.slice(-7).map((day, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        {new Date(day.date).toLocaleDateString()}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${day.revenue.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Customer Insights
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{customerVisits.length}</p>
                <p className="text-gray-600 dark:text-gray-300">Total Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{returningCustomers.length}</p>
                <p className="text-gray-600 dark:text-gray-300">Returning Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {customerVisits.length > 0 ? ((returningCustomers.length / customerVisits.length) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-gray-600 dark:text-gray-300">Return Rate</p>
              </div>
            </div>

            {/* Top Customers */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Customers by Spending
              </h4>
              <div className="space-y-3">
                {customerVisits
                  .sort((a, b) => b.totalSpent - a.totalSpent)
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div key={customer.customerId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{customer.customerName}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{customer.visitCount} visits</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">${customer.totalSpent.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Last visit: {new Date(customer.lastVisit).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;