import React, { useState } from 'react';
import { Plus, User, DollarSign, ShoppingBag, Clock, Edit, Trash2 } from 'lucide-react';
import { useStaff } from '../../contexts/StaffContext';

const CashierManagement: React.FC = () => {
  const { cashiers, addCashier, updateCashierStatus } = useStaff();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCashier, setNewCashier] = useState({
    name: '',
    email: '',
    phone: '',
    shift: 'morning' as const,
    isActive: true,
    startTime: '',
    endTime: ''
  });

  const handleAddCashier = () => {
    if (newCashier.name && newCashier.email && newCashier.phone) {
      addCashier(newCashier);
      setNewCashier({
        name: '',
        email: '',
        phone: '',
        shift: 'morning',
        isActive: true,
        startTime: '',
        endTime: ''
      });
      setShowAddForm(false);
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'afternoon':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'evening':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'night':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cashier Management
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Cashier</span>
        </button>
      </div>

      {/* Add Cashier Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Cashier
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newCashier.name}
              onChange={(e) => setNewCashier({ ...newCashier, name: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newCashier.email}
              onChange={(e) => setNewCashier({ ...newCashier, email: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newCashier.phone}
              onChange={(e) => setNewCashier({ ...newCashier, phone: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <select
              value={newCashier.shift}
              onChange={(e) => setNewCashier({ ...newCashier, shift: e.target.value as any })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
            <input
              type="time"
              placeholder="Start Time"
              value={newCashier.startTime}
              onChange={(e) => setNewCashier({ ...newCashier, startTime: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="time"
              placeholder="End Time"
              value={newCashier.endTime}
              onChange={(e) => setNewCashier({ ...newCashier, endTime: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddCashier}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Add Cashier
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

      {/* Cashiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cashiers.map((cashier) => (
          <div key={cashier.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-yellow-600" />
              </div>
              <button
                onClick={() => updateCashierStatus(cashier.id, !cashier.isActive)}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cashier.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}
              >
                {cashier.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {cashier.name}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <p>{cashier.email}</p>
              <p>{cashier.phone}</p>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{cashier.startTime} - {cashier.endTime}</span>
              </div>
            </div>

            <div className={`px-2 py-1 rounded-full text-xs font-medium text-center mb-4 ${getShiftColor(cashier.shift)}`}>
              {cashier.shift.charAt(0).toUpperCase() + cashier.shift.slice(1)} Shift
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Sales</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${cashier.totalSales.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Orders</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {cashier.ordersProcessed}
                </span>
              </div>
            </div>

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

export default CashierManagement;