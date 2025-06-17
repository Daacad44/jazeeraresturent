import React, { useState } from 'react';
import { Plus, User, Truck, Star, Clock, Edit, Trash2, MapPin } from 'lucide-react';
import { useStaff } from '../../contexts/StaffContext';

const DriverManagement: React.FC = () => {
  const { drivers, addDriver, updateDriverStatus } = useStaff();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'Motorcycle',
    licenseNumber: '',
    isActive: true
  });

  const handleAddDriver = () => {
    if (newDriver.name && newDriver.email && newDriver.phone && newDriver.licenseNumber) {
      addDriver(newDriver);
      setNewDriver({
        name: '',
        email: '',
        phone: '',
        vehicleType: 'Motorcycle',
        licenseNumber: '',
        isActive: true
      });
      setShowAddForm(false);
    }
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <User className="w-4 h-4" />;
      case 'busy':
        return <Truck className="w-4 h-4" />;
      case 'offline':
        return <Clock className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Driver Management
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Driver</span>
        </button>
      </div>

      {/* Add Driver Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Driver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newDriver.name}
              onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newDriver.email}
              onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newDriver.phone}
              onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <select
              value={newDriver.vehicleType}
              onChange={(e) => setNewDriver({ ...newDriver, vehicleType: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="Motorcycle">Motorcycle</option>
              <option value="Car">Car</option>
              <option value="Bicycle">Bicycle</option>
            </select>
            <input
              type="text"
              placeholder="License Number"
              value={newDriver.licenseNumber}
              onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddDriver}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Add Driver
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateDriverStatus(driver.id, 'available')}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    driver.status === 'available' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => updateDriverStatus(driver.id, 'offline')}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    driver.status === 'offline' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  Offline
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {driver.name}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <p>{driver.email}</p>
              <p>{driver.phone}</p>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>{driver.vehicleType}</span>
              </div>
              <p>License: {driver.licenseNumber}</p>
            </div>

            <div className={`px-2 py-1 rounded-full text-xs font-medium text-center mb-4 flex items-center justify-center space-x-1 ${getStatusColor(driver.status)}`}>
              {getStatusIcon(driver.status)}
              <span>{driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Deliveries</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {driver.totalDeliveries}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Rating</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {driver.rating.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Current</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {driver.currentDeliveries.length}
                </span>
              </div>
            </div>

            {driver.currentDeliveries.length > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-2">
                  Current Deliveries:
                </p>
                {driver.currentDeliveries.map((deliveryId, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-yellow-700 dark:text-yellow-300">{deliveryId}</span>
                    <div className="space-x-1">
                      <button className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
                        Picked Up
                      </button>
                      <button className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                        Delivered
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
                <Edit className="w-4 h-4 mx-auto" />
              </button>
              <button className="flex-1 text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm">
                <Trash2 className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverManagement;