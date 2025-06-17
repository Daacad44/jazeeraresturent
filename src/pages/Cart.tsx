import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart, CreditCard, Smartphone, ArrowLeft, MapPin, User, Phone, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAnalytics } from '../contexts/AnalyticsContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, getTaxAmount, getCartTotalWithTax, checkout } = useCart();
  const { getCustomerByEmail } = useAnalytics();
  const navigate = useNavigate();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'dine-in'>('delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    
    // Check if customer is returning when email is entered
    if (name === 'email' && value.includes('@')) {
      const existingCustomer = getCustomerByEmail(value);
      if (existingCustomer && existingCustomer.visitCount > 1) {
        setShowWelcomeMessage(true);
        setTimeout(() => setShowWelcomeMessage(false), 5000);
      }
    }
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all customer information');
      return;
    }
    
    if (orderType === 'delivery' && !customerInfo.address) {
      alert('Please provide delivery address');
      return;
    }
    
    setIsCheckingOut(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newOrderId = await checkout({
        ...customerInfo,
        orderType
      });
      
      setOrderId(newOrderId);
      setOrderPlaced(true);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Order ID: <span className="font-semibold">{orderId}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Thank you for your order. We'll {orderType === 'delivery' ? 'deliver it to you' : 'have it ready for pickup'} soon.
            </p>
            <div className="space-y-4">
              <Link
                to="/orders"
                className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold transition-colors duration-200"
              >
                Track Your Order
              </Link>
              <Link
                to="/menu"
                className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                Order More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-8" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200"
            >
              <span>Browse Menu</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for Returning Customers */}
        {showWelcomeMessage && (
          <div className="mb-6 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-300 text-center font-semibold">
              🎉 Welcome back! Thank you for being a valued customer. We're delighted to serve you again!
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/menu"
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Cart
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center space-x-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description}
                  </p>
                  <p className="text-yellow-600 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-full bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200 ml-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Order Summary
              </h2>
              
              {/* Order Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Order Type
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <input
                      type="radio"
                      value="delivery"
                      checked={orderType === 'delivery'}
                      onChange={(e) => setOrderType(e.target.value as 'delivery')}
                      className="text-yellow-500 focus:ring-yellow-500"
                    />
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <input
                      type="radio"
                      value="dine-in"
                      checked={orderType === 'dine-in'}
                      onChange={(e) => setOrderType(e.target.value as 'dine-in')}
                      className="text-yellow-500 focus:ring-yellow-500"
                    />
                    <User className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900 dark:text-white">Dine In</span>
                  </label>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  {orderType === 'delivery' && (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="address"
                        placeholder="Delivery Address"
                        value={customerInfo.address}
                        onChange={handleCustomerInfoChange}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-vertical"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax (5%)</span>
                  <span>${getTaxAmount().toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${getCartTotalWithTax().toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <input
                      type="radio"
                      value="visa"
                      checked={paymentMethod === 'visa'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-yellow-500 focus:ring-yellow-500"
                    />
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">Visa Card</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <input
                      type="radio"
                      value="mastercard"
                      checked={paymentMethod === 'mastercard'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-yellow-500 focus:ring-yellow-500"
                    />
                    <CreditCard className="w-5 h-5 text-red-600" />
                    <span className="text-gray-900 dark:text-white">Mastercard</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <input
                      type="radio"
                      value="mobile"
                      checked={paymentMethod === 'mobile'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-yellow-500 focus:ring-yellow-500"
                    />
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900 dark:text-white">Mobile Money</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || !paymentMethod}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order</span>
                    <span>${getCartTotalWithTax().toFixed(2)}</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                By placing your order, you agree to our terms and conditions. 
                All orders include a 5% tax as required by local regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;