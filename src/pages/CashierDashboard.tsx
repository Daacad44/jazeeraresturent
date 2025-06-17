import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Clock, User, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart, MenuItem } from '../contexts/CartContext';
import { useStaff } from '../contexts/StaffContext';

const CashierDashboard: React.FC = () => {
  const { user, isCashier } = useAuth();
  const { addToCart, items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { cashiers } = useStaff();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });

  if (!isCashier()) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access the cashier dashboard.
          </p>
        </div>
      </div>
    );
  }

  const currentCashier = cashiers.find(c => c.id === user?.staffId);
  const categories = ['All', 'Main Course', 'Appetizers', 'Beverages', 'Desserts'];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Lamb Biryani',
      price: 18.99,
      description: 'Aromatic basmati rice with tender lamb',
      image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course'
    },
    {
      id: '2',
      name: 'Mixed Grill',
      price: 24.99,
      description: 'Assorted grilled meats',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course'
    },
    {
      id: '3',
      name: 'Samosas',
      price: 8.99,
      description: 'Crispy pastries with spiced filling',
      image: 'https://images.pexels.com/photos/5410022/pexels-photo-5410022.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },
    {
      id: '4',
      name: 'Traditional Tea',
      price: 3.99,
      description: 'Authentic spiced tea blend',
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: '5',
      name: 'Baklava',
      price: 6.99,
      description: 'Sweet honey pastry',
      image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    }
  ];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    if (!customerInfo.name) {
      alert('Please enter customer name');
      return;
    }
    
    alert(`Order processed successfully!\nTotal: $${getCartTotal().toFixed(2)}\nPayment: ${paymentMethod}`);
    clearCart();
    setCustomerInfo({ name: '', phone: '' });
    setPaymentMethod('');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cashier Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {user?.name} - {currentCashier?.shift} shift
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Today's Sales</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${currentCashier?.totalSales.toFixed(2) || '0.00'}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Orders Processed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentCashier?.ordersProcessed || 0}
                </p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Order</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${getCartTotal().toFixed(2)}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Shift</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                  {currentCashier?.shift || 'N/A'}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Menu Items</h2>
              
              {/* Categories */}
              <div className="flex space-x-2 mb-6 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {item.name}
                    </h3>
                    <p className="text-yellow-600 font-bold">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Current Order</h2>
              
              {/* Customer Info */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3"
                />
                <input
                  type="tel"
                  placeholder="Phone (Optional)"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No items in order
                  </p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.name}
                        </h4>
                        <p className="text-yellow-600 font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-gray-900 dark:text-white font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Method</h3>
                <div className="space-y-2">
                  {['Cash', 'Card', 'Mobile Money'].map((method) => (
                    <label key={method} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-yellow-500"
                      />
                      <span className="text-gray-900 dark:text-white">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || !paymentMethod || !customerInfo.name}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold"
                >
                  Process Payment
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold"
                >
                  Clear Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;