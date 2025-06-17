import React, { useState } from 'react';
import { Truck, Clock, CheckCircle, MapPin, Phone, User, Plus, Search } from 'lucide-react';
import { useDelivery } from '../contexts/DeliveryContext';
import { useAuth } from '../contexts/AuthContext';

const Delivery: React.FC = () => {
  const { orders, employees, updateOrderStatus, assignOrder, addEmployee, getActiveOrders } = useDelivery();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    phone: '',
    email: '',
    isActive: true
  });

  if (!isAdmin()) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access the delivery management system.
          </p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'assigned':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'picked-up':
        return <Truck className="w-4 h-4 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
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

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.phone && newEmployee.email) {
      addEmployee(newEmployee);
      setNewEmployee({ name: '', phone: '', email: '', isActive: true });
      setShowAddEmployee(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeOrders = getActiveOrders();

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Delivery Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage delivery orders and delivery staff
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeOrders.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Drivers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {employees.filter(e => e.isActive).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Delivered Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter(o => o.status === 'delivered' && 
                    o.deliveredAt && 
                    new Date(o.deliveredAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'orders', name: 'Delivery Orders' },
              { id: 'employees', name: 'Delivery Staff' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order {order.orderId}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{order.customerName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status.replace('-', ' ')}</span>
                      </span>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Delivery Address</p>
                        <p className="text-gray-600 dark:text-gray-300">{order.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Customer Phone</p>
                        <p className="text-gray-600 dark:text-gray-300">{order.customerPhone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">Order Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
                          {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      ))}
                    </div>
                  </div>

                  {order.status === 'pending' && (
                    <div className="flex space-x-3">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            assignOrder(order.id, e.target.value);
                          }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Assign to driver...</option>
                        {employees.filter(emp => emp.isActive).map(emp => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {order.assignedTo && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        Assigned to: {employees.find(emp => emp.id === order.assignedTo)?.name}
                      </p>
                      {order.status === 'assigned' && (
                        <div className="mt-2 space-x-2">
                          <button
                            onClick={() => updateOrderStatus(order.id, 'picked-up')}
                            className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                          >
                            Mark Picked Up
                          </button>
                        </div>
                      )}
                      {order.status === 'picked-up' && (
                        <div className="mt-2 space-x-2">
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                          >
                            Mark Delivered
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Truck className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  No delivery orders found
                </p>
              </div>
            )}
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Delivery Staff
              </h2>
              <button
                onClick={() => setShowAddEmployee(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Employee</span>
              </button>
            </div>

            {/* Add Employee Modal */}
            {showAddEmployee && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Add New Delivery Employee
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={handleAddEmployee}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
                    >
                      Add Employee
                    </button>
                    <button
                      onClick={() => setShowAddEmployee(false)}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Employees List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => (
                <div key={employee.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {employee.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      employee.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p><Phone className="w-4 h-4 inline mr-2" />{employee.phone}</p>
                    <p><User className="w-4 h-4 inline mr-2" />{employee.email}</p>
                    <p>Total Deliveries: {employee.totalDeliveries}</p>
                    <p>Rating: {employee.rating}/5.0</p>
                    <p>Current Orders: {employee.currentOrders.length}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delivery;