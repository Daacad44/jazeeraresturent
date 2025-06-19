import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DeliveryUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'delivery_manager';
  isActive: boolean;
  ordersPlaced: number;
  lastLogin?: Date;
}

export interface DeliveryOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'assigned' | 'picked-up' | 'delivered';
  assignedTo?: string;
  createdAt: Date;
  deliveredAt?: Date;
  estimatedTime: number;
  placedBy: string; // delivery user ID
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

interface DeliveryUserContextType {
  deliveryUsers: DeliveryUser[];
  currentDeliveryUser: DeliveryUser | null;
  deliveryOrders: DeliveryOrder[];
  loginDeliveryUser: (email: string, password: string) => Promise<boolean>;
  logoutDeliveryUser: () => void;
  placeDeliveryOrder: (orderData: Omit<DeliveryOrder, 'id' | 'createdAt' | 'placedBy'>) => void;
  assignOrderToDriver: (orderId: string, driverId: string) => void;
  updateOrderStatus: (orderId: string, status: DeliveryOrder['status']) => void;
  getOrdersByUser: (userId: string) => DeliveryOrder[];
  getOrdersByDriver: (driverId: string) => DeliveryOrder[];
}

const DeliveryUserContext = createContext<DeliveryUserContextType | undefined>(undefined);

export const DeliveryUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deliveryUsers] = useState<DeliveryUser[]>([
    {
      id: 'DU001',
      name: 'Ahmed Hassan',
      email: 'ahmed.delivery@jazeera.com',
      password: 'delivery2024',
      role: 'delivery_manager',
      isActive: true,
      ordersPlaced: 45
    },
    {
      id: 'DU002',
      name: 'Fatima Omar',
      email: 'fatima.delivery@jazeera.com',
      password: 'delivery2024',
      role: 'delivery_manager',
      isActive: true,
      ordersPlaced: 38
    },
    {
      id: 'DU003',
      name: 'Mohamed Ali',
      email: 'mohamed.delivery@jazeera.com',
      password: 'delivery2024',
      role: 'delivery_manager',
      isActive: true,
      ordersPlaced: 52
    },
    {
      id: 'DU004',
      name: 'Amina Said',
      email: 'amina.delivery@jazeera.com',
      password: 'delivery2024',
      role: 'delivery_manager',
      isActive: true,
      ordersPlaced: 29
    },
    {
      id: 'DU005',
      name: 'Omar Hassan',
      email: 'omar.delivery@jazeera.com',
      password: 'delivery2024',
      role: 'delivery_manager',
      isActive: true,
      ordersPlaced: 41
    }
  ]);

  const [currentDeliveryUser, setCurrentDeliveryUser] = useState<DeliveryUser | null>(null);
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('jazeera-delivery-user');
    const savedOrders = localStorage.getItem('jazeera-delivery-orders');
    
    if (savedUser) {
      setCurrentDeliveryUser(JSON.parse(savedUser));
    }
    
    if (savedOrders) {
      setDeliveryOrders(JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined
      })));
    }
  }, []);

  useEffect(() => {
    if (currentDeliveryUser) {
      localStorage.setItem('jazeera-delivery-user', JSON.stringify(currentDeliveryUser));
    }
  }, [currentDeliveryUser]);

  useEffect(() => {
    localStorage.setItem('jazeera-delivery-orders', JSON.stringify(deliveryOrders));
  }, [deliveryOrders]);

  const loginDeliveryUser = async (email: string, password: string): Promise<boolean> => {
    const user = deliveryUsers.find(u => u.email === email && u.password === password && u.isActive);
    if (user) {
      const updatedUser = { ...user, lastLogin: new Date() };
      setCurrentDeliveryUser(updatedUser);
      return true;
    }
    return false;
  };

  const logoutDeliveryUser = () => {
    setCurrentDeliveryUser(null);
    localStorage.removeItem('jazeera-delivery-user');
  };

  const placeDeliveryOrder = (orderData: Omit<DeliveryOrder, 'id' | 'createdAt' | 'placedBy'>) => {
    if (!currentDeliveryUser) return;

    const newOrder: DeliveryOrder = {
      ...orderData,
      id: `DEL-${Date.now()}`,
      createdAt: new Date(),
      placedBy: currentDeliveryUser.id
    };

    setDeliveryOrders(prev => [...prev, newOrder]);
  };

  const assignOrderToDriver = (orderId: string, driverId: string) => {
    setDeliveryOrders(prev => prev.map(order =>
      order.id === orderId 
        ? { ...order, assignedTo: driverId, status: 'assigned' as const }
        : order
    ));
  };

  const updateOrderStatus = (orderId: string, status: DeliveryOrder['status']) => {
    setDeliveryOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status };
        if (status === 'delivered') {
          updatedOrder.deliveredAt = new Date();
        }
        return updatedOrder;
      }
      return order;
    }));
  };

  const getOrdersByUser = (userId: string) => {
    return deliveryOrders.filter(order => order.placedBy === userId);
  };

  const getOrdersByDriver = (driverId: string) => {
    return deliveryOrders.filter(order => order.assignedTo === driverId);
  };

  return (
    <DeliveryUserContext.Provider value={{
      deliveryUsers,
      currentDeliveryUser,
      deliveryOrders,
      loginDeliveryUser,
      logoutDeliveryUser,
      placeDeliveryOrder,
      assignOrderToDriver,
      updateOrderStatus,
      getOrdersByUser,
      getOrdersByDriver
    }}>
      {children}
    </DeliveryUserContext.Provider>
  );
};

export const useDeliveryUser = () => {
  const context = useContext(DeliveryUserContext);
  if (context === undefined) {
    throw new Error('useDeliveryUser must be used within a DeliveryUserProvider');
  }
  return context;
};