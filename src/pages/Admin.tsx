import React, { useState } from 'react';
import { BarChart3, Users, ShoppingBag, DollarSign, Clock, CheckCircle, AlertCircle, TrendingUp, UserCheck, Truck, ChefHat, Plus, Edit, Trash2, Search, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useStaff } from '../contexts/StaffContext';
import RevenueChart from '../components/Charts/RevenueChart';
import MenuManagement from '../components/MenuManagement/MenuManagement';
import CustomerManagement from '../components/CustomerManagement/CustomerManagement';

const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const { dailyStats, getTodayStats, getRevenueData } = useAnalytics();
  const { cashiers, waiters, drivers, addCashier, addWaiter, addDriver, updateCashierStatus, updateWaiterStatus, updateDriverStatus } = useStaff();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form states for adding new staff
  const [newCashier, setNewCashier] = useState({
    name: '', email: '', phone: '', shift: 'morning' as const, isActive: true, startTime: '', endTime: '', password: ''
  });
  const [newWaiter, setNewWaiter] = useState({
    name: '', email: '', phone: '', section: '', isActive: true, shift: 'morning' as const, password: ''
  });
  const [newDriver, setNewDriver] = useState({
    name: '', email: '', phone: '', vehicleType: 'Motorcycle', licenseNumber: '', isActive: true, password: '', emergencyContact: '', address: ''
  });

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

  const handleAddCashier = () => {
    if (newCashier.name && newCashier.email && newCashier.phone && newCashier.password) {
      addCashier(newCashier);
      setNewCashier({ name: '', email: '', phone: '', shift: 'morning', isActive: true, startTime: '', endTime: '', password: '' });
      setShowAddForm(false);
    }
  };

  const handleAddWaiter = () => {
    if (newWaiter.name && newWaiter.email && newWaiter.phone && newWaiter.section && newWaiter.password) {
      addWaiter(newWaiter);
      setNewWaiter({ name: '', email: '', phone: '', section: '', isActive: true, shift: 'morning', password: '' });
      setShowAddForm(false);
    }
  };

  const handleAddDriver = () => {
    if (newDriver.name && newDriver.email && newDriver.phone && newDriver.licenseNumber && newDriver.password) {
      addDriver(newDriver);
      setNewDriver({ name: '', email: '', phone: '', vehicleType: 'Motorcycle', licenseNumber: '', isActive: true, password: '', emergencyContact: '', address: '' });
      setShowAddForm(false);
    }
  };

  const handleRemoveStaff = (type: string, id: string) => {
    if (confirm('Are you sure you want to remove this staff member? This action cannot be undone.')) {
      // In a real app, you would call a remove function here
      alert(`${type} removed successfully`);
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

  const renderStaffManagement = (type: 'cashiers' | 'waiters' | 'drivers') => {
    const staffData = type === 'cashiers' ? cashiers : type === 'waiters' ? waiters : drivers;
    const filteredStaff = staffData.filter(staff => 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {type.charAt(0).toUpperCase() + type.slice(1)} Management
          </h2>
          <button
            onClick={() => setShowAddForm(type)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add {type.slice(0, -1)}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => (
            <div key={staff.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingStaff(staff)}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveStaff(type.slice(0, -1), staff.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {staff.name}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <p>📧 {staff.email}</p>
                <p>📞 {staff.phone}</p>
                {type === 'cashiers' && (
                  <>
                    <p>⏰ {(staff as any).shift} shift</p>
                    <p>💰 ${(staff as any).totalSales?.toFixed(2) || '0.00'} sales</p>
                  </>
                )}
                {type === 'waiters' && (
                  <>
                    <p>🏢 {(staff as any).section}</p>
                    <p>💵 ${(staff as any).tips?.toFixed(2) || '0.00'} tips</p>
                  </>
                )}
                {type === 'drivers' && (
                  <>
                    <p>🚗 {(staff as any).vehicleType}</p>
                    <p>⭐ {(staff as any).rating?.toFixed(1) || '5.0'} rating</p>
                  </>
                )}
              </div>

              <button
                onClick={() => {
                  if (type === 'cashiers') updateCashierStatus(staff.id, !staff.isActive);
                  if (type === 'waiters') updateWaiterStatus(staff.id, !staff.isActive);
                  if (type === 'drivers') updateDriverStatus(staff.id, staff.isActive ? 'offline' : 'available');
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  staff.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30'
                }`}
              >
                {staff.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>
          ))}
        </div>

        {/* Add Staff Form Modal */}
        {showAddForm === type && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Add New {type.slice(0, -1)}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={type === 'cashiers' ? newCashier.name : type === 'waiters' ? newWaiter.name : newDriver.name}
                  onChange={(e) => {
                    if (type === 'cashiers') setNewCashier({...newCashier, name: e.target.value});
                    if (type === 'waiters') setNewWaiter({...newWaiter, name: e.target.value});
                    if (type === 'drivers') setNewDriver({...newDriver, name: e.target.value});
                  }}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={type === 'cashiers' ? newCashier.email : type === 'waiters' ? newWaiter.email : newDriver.email}
                  onChange={(e) => {
                    if (type === 'cashiers') setNewCashier({...newCashier, email: e.target.value});
                    if (type === 'waiters') setNewWaiter({...newWaiter, email: e.target.value});
                    if (type === 'drivers') setNewDriver({...newDriver, email: e.target.value});
                  }}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={type === 'cashiers' ? newCashier.phone : type === 'waiters' ? newWaiter.phone : newDriver.phone}
                  onChange={(e) => {
                    if (type === 'cashiers') setNewCashier({...newCashier, phone: e.target.value});
                    if (type === 'waiters') setNewWaiter({...newWaiter, phone: e.target.value});
                    if (type === 'drivers') setNewDriver({...newDriver, phone: e.target.value});
                  }}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password *"
                    value={type === 'cashiers' ? newCashier.password : type === 'waiters' ? newWaiter.password : newDriver.password}
                    onChange={(e) => {
                      if (type === 'cashiers') setNewCashier({...newCashier, password: e.target.value});
                      if (type === 'waiters') setNewWaiter({...newWaiter, password: e.target.value});
                      if (type === 'drivers') setNewDriver({...newDriver, password: e.target.value});
                    }}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Type-specific fields */}
                {type === 'cashiers' && (
                  <>
                    <select
                      value={newCashier.shift}
                      onChange={(e) => setNewCashier({...newCashier, shift: e.target.value as any})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="morning">Morning Shift</option>
                      <option value="afternoon">Afternoon Shift</option>
                      <option value="evening">Evening Shift</option>
                      <option value="night">Night Shift</option>
                    </select>
                    <input
                      type="time"
                      placeholder="Start Time"
                      value={newCashier.startTime}
                      onChange={(e) => setNewCashier({...newCashier, startTime: e.target.value})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                      type="time"
                      placeholder="End Time"
                      value={newCashier.endTime}
                      onChange={(e) => setNewCashier({...newCashier, endTime: e.target.value})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </>
                )}

                {type === 'waiters' && (
                  <>
                    <input
                      type="text"
                      placeholder="Section (e.g., Section A) *"
                      value={newWaiter.section}
                      onChange={(e) => setNewWaiter({...newWaiter, section: e.target.value})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <select
                      value={newWaiter.shift}
                      onChange={(e) => setNewWaiter({...newWaiter, shift: e.target.value as any})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="morning">Morning Shift</option>
                      <option value="afternoon">Afternoon Shift</option>
                      <option value="evening">Evening Shift</option>
                      <option value="night">Night Shift</option>
                    </select>
                  </>
                )}

                {type === 'drivers' && (
                  <>
                    <select
                      value={newDriver.vehicleType}
                      onChange={(e) => setNewDriver({...newDriver, vehicleType: e.target.value})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Car">Car</option>
                      <option value="Bicycle">Bicycle</option>
                      <option value="Van">Van</option>
                    </select>
                    <input
                      type="text"
                      placeholder="License Number *"
                      value={newDriver.licenseNumber}
                      onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                      type="text"
                      placeholder="Emergency Contact"
                      value={newDriver.emergencyContact}
                      onChange={(e) => setNewDriver({...newDriver, emergencyContact: e.target.value})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={newDriver.address}
                      onChange={(e) => setNewDriver({...newDriver, address: e.target.value})}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    if (type === 'cashiers') handleAddCashier();
                    if (type === 'waiters') handleAddWaiter();
                    if (type === 'drivers') handleAddDriver();
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Add {type.slice(0, -1)}
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔐 Main Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete control over restaurant operations, staff, and menu management
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

        {/* Staff Management Tabs */}
        {activeTab === 'cashiers' && renderStaffManagement('cashiers')}
        {activeTab === 'waiters' && renderStaffManagement('waiters')}
        {activeTab === 'drivers' && renderStaffManagement('drivers')}
      </div>
    </div>
  );
};

export default Admin;