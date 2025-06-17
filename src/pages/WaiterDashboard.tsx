import React, { useState } from 'react';
import { Users, Clock, DollarSign, CheckCircle, Plus, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStaff } from '../contexts/StaffContext';

interface Table {
  id: string;
  number: number;
  seats: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  customers?: number;
  orderTotal?: number;
  timeSeated?: Date;
}

interface Order {
  id: string;
  tableNumber: number;
  items: Array<{ name: string; quantity: number; price: number; notes?: string }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timeOrdered: Date;
}

const WaiterDashboard: React.FC = () => {
  const { user, isWaiter } = useAuth();
  const { waiters } = useStaff();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!isWaiter()) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access the waiter dashboard.
          </p>
        </div>
      </div>
    );
  }

  const currentWaiter = waiters.find(w => w.id === user?.staffId);

  // Mock data for tables in waiter's section
  const [tables, setTables] = useState<Table[]>([
    { id: '1', number: 1, seats: 4, status: 'occupied', customers: 3, orderTotal: 45.67, timeSeated: new Date(Date.now() - 30 * 60000) },
    { id: '2', number: 2, seats: 2, status: 'available', customers: 0 },
    { id: '3', number: 3, seats: 6, status: 'reserved', customers: 0 },
    { id: '4', number: 4, seats: 4, status: 'occupied', customers: 4, orderTotal: 78.90, timeSeated: new Date(Date.now() - 45 * 60000) },
    { id: '5', number: 5, seats: 2, status: 'cleaning', customers: 0 },
    { id: '6', number: 6, seats: 8, status: 'available', customers: 0 }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      tableNumber: 1,
      items: [
        { name: 'Lamb Biryani', quantity: 2, price: 18.99 },
        { name: 'Traditional Tea', quantity: 3, price: 3.99 }
      ],
      total: 49.95,
      status: 'preparing',
      timeOrdered: new Date(Date.now() - 20 * 60000)
    },
    {
      id: 'ORD-002',
      tableNumber: 4,
      items: [
        { name: 'Mixed Grill', quantity: 1, price: 24.99 },
        { name: 'Fresh Juice', quantity: 2, price: 4.99 }
      ],
      total: 34.97,
      status: 'ready',
      timeOrdered: new Date(Date.now() - 35 * 60000)
    }
  ]);

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'occupied':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'reserved':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'cleaning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'served':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const updateTableStatus = (tableId: string, status: Table['status'], customers?: number) => {
    setTables(prev => prev.map(table => 
      table.id === tableId 
        ? { 
            ...table, 
            status, 
            customers: customers || 0,
            timeSeated: status === 'occupied' ? new Date() : undefined,
            orderTotal: status === 'available' ? undefined : table.orderTotal
          }
        : table
    ));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Waiter Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {user?.name} - {currentWaiter?.section} ({currentWaiter?.shift} shift)
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tables Served</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentWaiter?.tablesServed || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tips Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${currentWaiter?.tips.toFixed(2) || '0.00'}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Tables</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tables.filter(t => t.status === 'occupied').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table Layout */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {currentWaiter?.section} - Table Layout
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedTable === table.id 
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {table.number}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {table.seats} seats
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTableStatusColor(table.status)}`}>
                        {table.status}
                      </span>
                      {table.status === 'occupied' && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                          <p>{table.customers} customers</p>
                          {table.orderTotal && <p>${table.orderTotal.toFixed(2)}</p>}
                          {table.timeSeated && (
                            <p>{Math.floor((Date.now() - table.timeSeated.getTime()) / 60000)}m ago</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Actions */}
              {selectedTable && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Table {tables.find(t => t.id === selectedTable)?.number} Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => updateTableStatus(selectedTable, 'occupied', 2)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                    >
                      Seat Customers
                    </button>
                    <button
                      onClick={() => setShowOrderForm(true)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                    >
                      Take Order
                    </button>
                    <button
                      onClick={() => updateTableStatus(selectedTable, 'cleaning')}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
                    >
                      Needs Cleaning
                    </button>
                    <button
                      onClick={() => updateTableStatus(selectedTable, 'available')}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                    >
                      Clear Table
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Orders Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Active Orders</h2>
              
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Table {order.tableNumber}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {Math.floor((Date.now() - order.timeOrdered.getTime()) / 60000)}m ago
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </span>
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'served')}
                          className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                        >
                          Mark Served
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {orders.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No active orders
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterDashboard;