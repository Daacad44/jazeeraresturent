import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DailyStats {
  date: string;
  totalOrders: number;
  totalRevenue: number;
  topSellingItem: string;
  topSellingQuantity: number;
  averageOrderValue: number;
  deliveryOrders: number;
  dineInOrders: number;
}

export interface CustomerVisit {
  customerId: string;
  customerName: string;
  email: string;
  visitCount: number;
  lastVisit: Date;
  totalSpent: number;
  favoriteItems: string[];
}

interface AnalyticsContextType {
  dailyStats: DailyStats[];
  customerVisits: CustomerVisit[];
  recordOrder: (order: {
    customerId?: string;
    customerName?: string;
    email?: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    type: 'delivery' | 'dine-in';
  }) => void;
  getTodayStats: () => DailyStats | null;
  getCustomerByEmail: (email: string) => CustomerVisit | null;
  getTopSellingItems: (days?: number) => Array<{ name: string; quantity: number }>;
  getRevenueData: (days?: number) => Array<{ date: string; revenue: number }>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [customerVisits, setCustomerVisits] = useState<CustomerVisit[]>([]);

  useEffect(() => {
    const savedStats = localStorage.getItem('jazeera-daily-stats');
    const savedVisits = localStorage.getItem('jazeera-customer-visits');
    
    if (savedStats) {
      setDailyStats(JSON.parse(savedStats));
    }
    
    if (savedVisits) {
      setCustomerVisits(JSON.parse(savedVisits).map((visit: any) => ({
        ...visit,
        lastVisit: new Date(visit.lastVisit)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jazeera-daily-stats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  useEffect(() => {
    localStorage.setItem('jazeera-customer-visits', JSON.stringify(customerVisits));
  }, [customerVisits]);

  const recordOrder = (order: {
    customerId?: string;
    customerName?: string;
    email?: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    type: 'delivery' | 'dine-in';
  }) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Update daily stats
    setDailyStats(prev => {
      const existingDay = prev.find(day => day.date === today);
      const topItem = order.items.reduce((max, item) => 
        item.quantity > max.quantity ? item : max
      );
      
      if (existingDay) {
        return prev.map(day => {
          if (day.date === today) {
            const newTotalOrders = day.totalOrders + 1;
            const newTotalRevenue = day.totalRevenue + order.total;
            
            return {
              ...day,
              totalOrders: newTotalOrders,
              totalRevenue: newTotalRevenue,
              averageOrderValue: newTotalRevenue / newTotalOrders,
              deliveryOrders: order.type === 'delivery' ? day.deliveryOrders + 1 : day.deliveryOrders,
              dineInOrders: order.type === 'dine-in' ? day.dineInOrders + 1 : day.dineInOrders,
              topSellingItem: topItem.name,
              topSellingQuantity: day.topSellingQuantity + topItem.quantity
            };
          }
          return day;
        });
      } else {
        return [...prev, {
          date: today,
          totalOrders: 1,
          totalRevenue: order.total,
          topSellingItem: topItem.name,
          topSellingQuantity: topItem.quantity,
          averageOrderValue: order.total,
          deliveryOrders: order.type === 'delivery' ? 1 : 0,
          dineInOrders: order.type === 'dine-in' ? 1 : 0
        }];
      }
    });

    // Update customer visits
    if (order.email && order.customerName) {
      setCustomerVisits(prev => {
        const existingCustomer = prev.find(customer => customer.email === order.email);
        
        if (existingCustomer) {
          return prev.map(customer => {
            if (customer.email === order.email) {
              return {
                ...customer,
                visitCount: customer.visitCount + 1,
                lastVisit: new Date(),
                totalSpent: customer.totalSpent + order.total,
                favoriteItems: [...new Set([...customer.favoriteItems, ...order.items.map(item => item.name)])]
              };
            }
            return customer;
          });
        } else {
          return [...prev, {
            customerId: order.customerId || `CUST-${Date.now()}`,
            customerName: order.customerName,
            email: order.email,
            visitCount: 1,
            lastVisit: new Date(),
            totalSpent: order.total,
            favoriteItems: order.items.map(item => item.name)
          }];
        }
      });
    }
  };

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyStats.find(day => day.date === today) || null;
  };

  const getCustomerByEmail = (email: string) => {
    return customerVisits.find(customer => customer.email === email) || null;
  };

  const getTopSellingItems = (days = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentStats = dailyStats.filter(day => new Date(day.date) >= cutoffDate);
    const itemCounts: { [key: string]: number } = {};
    
    recentStats.forEach(day => {
      if (itemCounts[day.topSellingItem]) {
        itemCounts[day.topSellingItem] += day.topSellingQuantity;
      } else {
        itemCounts[day.topSellingItem] = day.topSellingQuantity;
      }
    });
    
    return Object.entries(itemCounts)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  };

  const getRevenueData = (days = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return dailyStats
      .filter(day => new Date(day.date) >= cutoffDate)
      .map(day => ({ date: day.date, revenue: day.totalRevenue }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <AnalyticsContext.Provider value={{
      dailyStats,
      customerVisits,
      recordOrder,
      getTodayStats,
      getCustomerByEmail,
      getTopSellingItems,
      getRevenueData
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};