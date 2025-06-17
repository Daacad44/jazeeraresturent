import React, { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle, Phone, Navigation } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStaff } from '../contexts/StaffContext';
import { useDelivery } from '../contexts/DeliveryContext';

const DriverDashboard: React.FC = () => {
  const { user, isDriver } = useAuth();
  const { drivers, updateDriverStatus } = useStaff();
  const { orders, updateOrderStatus } = useDelivery();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!isDriver()) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access the driver dashboard.
          </p>
        </div>
      </div>
    );
  }

  const currentDriver = drivers.find(d => d.id === user?.staffId);
  const myOrders = orders.filter(order => order.assignedTo === user?.staffId);
  const availableOrders = orders.filter(order => order.status === 'pending');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'assigned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'picked-up':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleStatusChange = (status: 'available' | 'busy' | 'offline') => {
    if (currentDriver) {
      updateDriverStatus(currentDriver.id, status);
    }
  };

  const handlePickup = (orderId: string) => {
    updateOrderStatus(orderId, 'picked-up');
  };

  const handleDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'delivered');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Driver Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {user?.name} - {currentDriver?.vehicleType} Driver
          </p>
        </div>

        {/* Status Control */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Driver Status</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(currentDriver?.status || 'offline')}`}>
                {currentDriver?.status?.charAt(0).toUpperCase() + currentDriver?.status?.slice(1) || 'Offline'}
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                Vehicle: {currentDriver?.vehicleType} | License: {currentDriver?.licenseNumber}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange('available')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentDriver?.status === 'available' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => handleStatusChange('busy')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentDriver?.status === 'busy' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                Busy
              </button>
              <button
                onClick={() => handleStatusChange('offline')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentDriver?.status === 'offline' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                Offline
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Deliveries</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentDriver?.totalDeliveries || 0}
                </p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentDriver?.currentDeliveries.length || 0}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentDriver?.rating.toFixed(1) || '5.0'}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Today's Deliveries</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter(o => 
                    o.assignedTo === user?.staffId && 
                    o.status === 'delivered' && 
                    o.deliveredAt && 
                    new Date(o.deliveredAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Deliveries */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">My Deliveries</h2>
            
            <div className="space-y-4">
              {myOrders.filter(order => order.status !== 'delivered').map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Order {order.orderId}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {order.customerName}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                      {order.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {order.address}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {order.customerPhone}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </span>
                    <div className="space-x-2">
                      {order.status === 'assigned' && (
                        <button
                          onClick={() => handlePickup(order.id)}
                          className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                        >
                          Mark Picked Up
                        </button>
                      )}
                      {order.status === 'picked-up' && (
                        <button
                          onClick={() => handleDelivered(order.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                          Mark Delivered
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center space-x-1">
                        <Navigation className="w-3 h-3" />
                        <span>Navigate</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {myOrders.filter(order => order.status !== 'delivered').length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No active deliveries
                </p>
              )}
            </div>
          </div>

          {/* Available Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Available Orders</h2>
            
            <div className="space-y-4">
              {availableOrders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Order {order.orderId}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {order.customerName}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.floor((Date.now() - order.createdAt.getTime()) / 60000)}m ago
                    </span>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {order.address}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </span>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'assigned', user?.staffId)}
                      disabled={currentDriver?.status !== 'available'}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded text-sm font-medium"
                    >
                      Accept Order
                    </button>
                  </div>
                </div>
              ))}
              
              {availableOrders.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No available orders
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Deliveries</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Delivered At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {myOrders
                  .filter(order => order.status === 'delivered')
                  .slice(0, 5)
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;