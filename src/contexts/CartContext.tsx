import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAnalytics } from './AnalyticsContext';
import { useDelivery } from './DeliveryContext';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  orderType: 'delivery' | 'dine-in';
  address?: string;
  status: 'pending' | 'preparing' | 'ready' | 'on-the-way' | 'delivered';
  createdAt: Date;
  estimatedTime?: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartTotalWithTax: () => number;
  getTaxAmount: () => number;
  getItemCount: () => number;
  checkout: (customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    orderType: 'delivery' | 'dine-in';
  }) => Promise<string>;
  getCustomerOrders: (customerEmail: string) => Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { recordOrder } = useAnalytics();
  const { addDeliveryOrder } = useDelivery();

  useEffect(() => {
    const savedCart = localStorage.getItem('jazeera-cart');
    const savedOrders = localStorage.getItem('jazeera-orders');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt)
      }));
      setOrders(parsedOrders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jazeera-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('jazeera-orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: MenuItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTaxAmount = () => {
    return getCartTotal() * 0.05; // 5% tax
  };

  const getCartTotalWithTax = () => {
    return getCartTotal() + getTaxAmount();
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const checkout = async (customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    orderType: 'delivery' | 'dine-in';
  }): Promise<string> => {
    const orderId = `ORD-${Date.now()}`;
    const orderItems = items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    // Create order object
    const newOrder: Order = {
      id: orderId,
      customerId: `CUST-${customerInfo.email}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      items: orderItems,
      total: getCartTotalWithTax(),
      orderType: customerInfo.orderType,
      address: customerInfo.address,
      status: 'pending',
      createdAt: new Date(),
      estimatedTime: customerInfo.orderType === 'delivery' ? '30-45 minutes' : '15-20 minutes'
    };

    // Add to orders list
    setOrders(prev => [...prev, newOrder]);

    // Record order in analytics
    recordOrder({
      customerId: newOrder.customerId,
      customerName: customerInfo.name,
      email: customerInfo.email,
      items: orderItems,
      total: getCartTotalWithTax(),
      type: customerInfo.orderType
    });

    // If it's a delivery order, add to delivery system
    if (customerInfo.orderType === 'delivery' && customerInfo.address) {
      addDeliveryOrder({
        orderId,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        address: customerInfo.address,
        items: orderItems,
        total: getCartTotalWithTax(),
        status: 'pending',
        estimatedTime: 30
      });
    }

    // Clear cart after successful checkout
    clearCart();

    return orderId;
  };

  const getCustomerOrders = (customerEmail: string) => {
    return orders.filter(order => order.customerEmail === customerEmail);
  };

  return (
    <CartContext.Provider value={{
      items,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartTotalWithTax,
      getTaxAmount,
      getItemCount,
      checkout,
      getCustomerOrders
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};