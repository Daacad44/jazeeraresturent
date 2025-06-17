import React, { createContext, useContext, useState, useEffect } from 'react';

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
  estimatedTime: number; // in minutes
}

export interface DeliveryEmployee {
  id: string;
  name: string;
  phone: string;
  email: string;
  isActive: boolean;
  currentOrders: string[];
  totalDeliveries: number;
  rating: number;
}

interface DeliveryContextType {
  orders: DeliveryOrder[];
  employees: DeliveryEmployee[];
  addDeliveryOrder: (order: Omit<DeliveryOrder, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: DeliveryOrder['status'], employeeId?: string) => void;
  addEmployee: (employee: Omit<DeliveryEmployee, 'id' | 'currentOrders' | 'totalDeliveries' | 'rating'>) => void;
  assignOrder: (orderId: string, employeeId: string) => void;
  getOrdersByEmployee: (employeeId: string) => DeliveryOrder[];
  getActiveOrders: () => DeliveryOrder[];
  markOrderDelivered: (orderId: string) => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [employees, setEmployees] = useState<DeliveryEmployee[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      phone: '+252611777226',
      email: 'ahmed.delivery@jazeera.com',
      isActive: true,
      currentOrders: [],
      totalDeliveries: 45,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Omar Mohamed',
      phone: '+252611777227',
      email: 'omar.delivery@jazeera.com',
      isActive: true,
      currentOrders: [],
      totalDeliveries: 38,
      rating: 4.9
    }
  ]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('jazeera-delivery-orders');
    const savedEmployees = localStorage.getItem('jazeera-delivery-employees');
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined
      })));
    }
    
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jazeera-delivery-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('jazeera-delivery-employees', JSON.stringify(employees));
  }, [employees]);

  const addDeliveryOrder = (orderData: Omit<DeliveryOrder, 'id' | 'createdAt'>) => {
    const newOrder: DeliveryOrder = {
      ...orderData,
      id: `DEL-${Date.now()}`,
      createdAt: new Date()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: DeliveryOrder['status'], employeeId?: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status };
        if (status === 'delivered') {
          updatedOrder.deliveredAt = new Date();
        }
        if (employeeId) {
          updatedOrder.assignedTo = employeeId;
        }
        return updatedOrder;
      }
      return order;
    }));

    if (employeeId && status === 'assigned') {
      setEmployees(prev => prev.map(emp => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            currentOrders: [...emp.currentOrders, orderId]
          };
        }
        return emp;
      }));
    }
  };

  const addEmployee = (employeeData: Omit<DeliveryEmployee, 'id' | 'currentOrders' | 'totalDeliveries' | 'rating'>) => {
    const newEmployee: DeliveryEmployee = {
      ...employeeData,
      id: `EMP-${Date.now()}`,
      currentOrders: [],
      totalDeliveries: 0,
      rating: 5.0
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const assignOrder = (orderId: string, employeeId: string) => {
    updateOrderStatus(orderId, 'assigned', employeeId);
  };

  const getOrdersByEmployee = (employeeId: string) => {
    return orders.filter(order => order.assignedTo === employeeId);
  };

  const getActiveOrders = () => {
    return orders.filter(order => order.status !== 'delivered');
  };

  const markOrderDelivered = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'delivered' as const,
          deliveredAt: new Date()
        };
      }
      return order;
    }));

    // Update employee stats
    const order = orders.find(o => o.id === orderId);
    if (order?.assignedTo) {
      setEmployees(prev => prev.map(emp => {
        if (emp.id === order.assignedTo) {
          return {
            ...emp,
            currentOrders: emp.currentOrders.filter(id => id !== orderId),
            totalDeliveries: emp.totalDeliveries + 1
          };
        }
        return emp;
      }));
    }
  };

  return (
    <DeliveryContext.Provider value={{
      orders,
      employees,
      addDeliveryOrder,
      updateOrderStatus,
      addEmployee,
      assignOrder,
      getOrdersByEmployee,
      getActiveOrders,
      markOrderDelivered
    }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
};