import React, { useState } from 'react';
import { Clock, CheckCircle, Truck, MapPin, Phone, Star, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { getCustomerOrders } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Get orders for the current customer
  const customerOrders = user ? getCustomerOrders(user.email) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'preparing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'ready':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'on-the-way':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Received';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup/Delivery';
      case 'on-the-way':
        return 'On the way';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ready':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'on-the-way':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Please Login
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You need to login to view your orders.
          </p>
          <a
            href="/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
          >
            Login Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome {user.name}! Track your current and past orders
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {customerOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order {order.id}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Placed on {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {order.orderType === 'delivery' ? '🚚 Delivery' : '🍽️ Dine In'}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </p>
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                    >
                      {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {selectedOrder === order.id && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Items */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Quantity: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery/Order Info */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {order.orderType === 'delivery' ? 'Delivery Information' : 'Order Information'}
                      </h4>
                      <div className="space-y-4">
                        {order.orderType === 'delivery' && order.address && (
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Delivery Address
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {order.address}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {order.status === 'delivered' ? 'Delivered' : 'Estimated Time'}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {order.status === 'delivered' 
                                ? `Delivered on ${order.createdAt.toLocaleDateString()}`
                                : order.estimatedTime || '30-45 minutes'
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Phone className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Contact Number
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {order.customerPhone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 space-y-3">
                        {order.status !== 'delivered' && (
                          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                            <Phone className="w-5 h-5" />
                            <span>Call Restaurant</span>
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                            <Star className="w-5 h-5" />
                            <span>Rate Order</span>
                          </button>
                        )}
                        <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors duration-200">
                          Reorder Items
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {customerOrders.length === 0 && (
          <div className="text-center py-16">
            <Clock className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-8" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              When you place your first order, it will appear here.
            </p>
            <a
              href="/menu"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Browse Menu
            </a>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help with Your Order?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our customer support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Support: +252611777223</span>
            </button>
            <a
              href="/contact"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Send Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;