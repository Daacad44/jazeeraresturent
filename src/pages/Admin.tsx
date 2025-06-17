import React, { useState } from 'react';
import { BarChart3, Users, ShoppingBag, DollarSign, Clock, CheckCircle, AlertCircle, TrendingUp, UserCheck, Truck, ChefHat } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useStaff } from '../contexts/StaffContext';
import RevenueChart from '../components/Charts/RevenueChart';
import MenuManagement from '../components/MenuManagement/MenuManagement';
import CustomerManagement from '../components/CustomerManagement/CustomerManagement';
import CashierManagement from '../components/StaffManagement/CashierManagement';
import WaiterManagement from '../components/StaffManagement/WaiterManagement';
import DriverManagement from '../components/StaffManagement/DriverManagement';

const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const { dailyStats, getTodayStats, getRevenueData } = useAnalytics();
  const { cashiers, waiters, drivers } = useStaff();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdmin()) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const todayStats = getTodayStats();
  const revenueData = getRevenueData(7);
  const totalRevenue = dailyStats.reduce((sum, day) => sum + day.totalRevenue, 0);
  const totalOrders = dailyStats.reduce((sum, day) => sum + day.totalOrders, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Mock data for recent orders
  const recentOrders = [
    { id: 'ORD-001', customer: 'Ahmed Hassan', items: 3, total: 45.67, status: 'preparing', time: '10 min ago' },
    { id: 'ORD-002', customer: 'Fatima Ali', items: 2, total: 32.14, status: 'ready', time: '15 min ago' },
    { id: 'ORD-003', customer: 'Omar Mohamed', items: 5, total: 78.90, status: 'delivered', time: '25 min ago' },
    { id: 'ORD-004', customer: 'Amina Said', items: 1, total: 18.99, status: 'preparing', time: '30 min ago' },
    { id: 'ORD-005', customer: 'Hassan Ali', items: 4, total: 56.78, status: 'ready', time: '35 min ago' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'ready':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'ready':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const stats = [
    { 
      title: 'Total Orders', 
      value: totalOrders.toString(), 
      change: todayStats ? `+${todayStats.totalOrders} today` : '+0 today', 
      icon: ShoppingBag, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Revenue', 
      value: `$${totalRevenue.toFixed(2)}`, 
      change: todayStats ? `+$${todayStats.totalRevenue.toFixed(2)} today` : '+$0 today', 
      icon: DollarSign, 
      color: 'text-green-600' 
    },
    { 
      title: 'Avg Order Value', 
      value: `$${averageOrderValue.toFixed(2)}`, 
      change: todayStats ? `$${todayStats.averageOrderValue.toFixed(2)} today` : '$0 today', 
      icon: TrendingUp, 
      color: 'text-yellow-600' 
    },
    { 
      title: 'Active Staff', 
      value: (cashiers.filter(c => c.isActive).length + waiters.filter(w => w.isActive).length + drivers.filter(d => d.isActive).length).toString(), 
      change: `${cashiers.length + waiters.length + drivers.length} total`, 
      icon: Users, 
      color: 'text-purple-600' 
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your restaurant operations and monitor performance
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'orders', name: 'Orders', icon: ShoppingBag },
              { id: 'menu', name: 'Menu Management', icon: ChefHat },
              { id: 'customers', name: 'Customers', icon: Users },
              { id: 'cashiers', name: 'Cashiers', icon: UserCheck },
              { id: 'waiters', name: 'Waiters', icon: Users },
              { id: 'drivers', name: 'Drivers', icon: Truck }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RevenueChart data={revenueData} />
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Staff Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Cashiers</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {cashiers.filter(c => c.isActive).length}/{cashiers.length}
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Active</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Waiters</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {waiters.filter(w => w.isActive).length}/{waiters.length}
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Active</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Drivers</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {drivers.filter(d => d.status === 'available').length}/{drivers.length}
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Orders
              </h2>
              <div className="flex space-x-4">
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>All Orders</option>
                  <option>Preparing</option>
                  <option>Ready</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {order.items} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {order.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Menu Management Tab */}
        {activeTab === 'menu' && <MenuManagement />}

        {/* Customers Tab */}
        {activeTab === 'customers' && <CustomerManagement />}

        {/* Cashiers Tab */}
        {activeTab === 'cashiers' && <CashierManagement />}

        {/* Waiters Tab */}
        {activeTab === 'waiters' && <WaiterManagement />}

        {/* Drivers Tab */}
        {activeTab === 'drivers' && <DriverManagement />}
      </div>
    </div>
  );
};

export default Admin;