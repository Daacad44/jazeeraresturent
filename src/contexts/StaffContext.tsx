import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Cashier {
  id: string;
  name: string;
  email: string;
  phone: string;
  shift: 'morning' | 'afternoon' | 'evening' | 'night';
  isActive: boolean;
  totalSales: number;
  ordersProcessed: number;
  startTime: string;
  endTime: string;
}

export interface Waiter {
  id: string;
  name: string;
  email: string;
  phone: string;
  section: string;
  isActive: boolean;
  tablesServed: number;
  tips: number;
  shift: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  isActive: boolean;
  currentDeliveries: string[];
  totalDeliveries: number;
  rating: number;
  status: 'available' | 'busy' | 'offline';
}

interface StaffContextType {
  cashiers: Cashier[];
  waiters: Waiter[];
  drivers: Driver[];
  addCashier: (cashier: Omit<Cashier, 'id' | 'totalSales' | 'ordersProcessed'>) => void;
  addWaiter: (waiter: Omit<Waiter, 'id' | 'tablesServed' | 'tips'>) => void;
  addDriver: (driver: Omit<Driver, 'id' | 'currentDeliveries' | 'totalDeliveries' | 'rating' | 'status'>) => void;
  updateCashierStatus: (id: string, isActive: boolean) => void;
  updateWaiterStatus: (id: string, isActive: boolean) => void;
  updateDriverStatus: (id: string, status: Driver['status']) => void;
  assignDeliveryToDriver: (driverId: string, deliveryId: string) => void;
  completeDelivery: (driverId: string, deliveryId: string) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cashiers, setCashiers] = useState<Cashier[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed.cashier@jazeera.com',
      phone: '+252611777230',
      shift: 'morning',
      isActive: true,
      totalSales: 2450.75,
      ordersProcessed: 45,
      startTime: '08:00',
      endTime: '16:00'
    },
    {
      id: '2',
      name: 'Fatima Ali',
      email: 'fatima.cashier@jazeera.com',
      phone: '+252611777231',
      shift: 'afternoon',
      isActive: true,
      totalSales: 1890.50,
      ordersProcessed: 38,
      startTime: '12:00',
      endTime: '20:00'
    },
    {
      id: '3',
      name: 'Omar Mohamed',
      email: 'omar.cashier@jazeera.com',
      phone: '+252611777232',
      shift: 'evening',
      isActive: false,
      totalSales: 3200.25,
      ordersProcessed: 52,
      startTime: '16:00',
      endTime: '00:00'
    },
    {
      id: '4',
      name: 'Amina Said',
      email: 'amina.cashier@jazeera.com',
      phone: '+252611777233',
      shift: 'night',
      isActive: true,
      totalSales: 1650.00,
      ordersProcessed: 28,
      startTime: '20:00',
      endTime: '04:00'
    }
  ]);

  const [waiters, setWaiters] = useState<Waiter[]>([
    {
      id: '1',
      name: 'Hassan Omar',
      email: 'hassan.waiter@jazeera.com',
      phone: '+252611777234',
      section: 'Section A',
      isActive: true,
      tablesServed: 12,
      tips: 85.50,
      shift: 'morning'
    },
    {
      id: '2',
      name: 'Mariam Ahmed',
      email: 'mariam.waiter@jazeera.com',
      phone: '+252611777235',
      section: 'Section B',
      isActive: true,
      tablesServed: 15,
      tips: 120.75,
      shift: 'afternoon'
    },
    {
      id: '3',
      name: 'Ali Hassan',
      email: 'ali.waiter@jazeera.com',
      phone: '+252611777236',
      section: 'Section C',
      isActive: false,
      tablesServed: 8,
      tips: 65.25,
      shift: 'evening'
    }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'Mohamed Ali',
      email: 'mohamed.driver@jazeera.com',
      phone: '+252611777237',
      vehicleType: 'Motorcycle',
      licenseNumber: 'DL123456',
      isActive: true,
      currentDeliveries: ['DEL-001'],
      totalDeliveries: 156,
      rating: 4.8,
      status: 'busy'
    },
    {
      id: '2',
      name: 'Abdi Rahman',
      email: 'abdi.driver@jazeera.com',
      phone: '+252611777238',
      vehicleType: 'Car',
      licenseNumber: 'DL789012',
      isActive: true,
      currentDeliveries: [],
      totalDeliveries: 203,
      rating: 4.9,
      status: 'available'
    }
  ]);

  useEffect(() => {
    const savedCashiers = localStorage.getItem('jazeera-cashiers');
    const savedWaiters = localStorage.getItem('jazeera-waiters');
    const savedDrivers = localStorage.getItem('jazeera-drivers');
    
    if (savedCashiers) setCashiers(JSON.parse(savedCashiers));
    if (savedWaiters) setWaiters(JSON.parse(savedWaiters));
    if (savedDrivers) setDrivers(JSON.parse(savedDrivers));
  }, []);

  useEffect(() => {
    localStorage.setItem('jazeera-cashiers', JSON.stringify(cashiers));
  }, [cashiers]);

  useEffect(() => {
    localStorage.setItem('jazeera-waiters', JSON.stringify(waiters));
  }, [waiters]);

  useEffect(() => {
    localStorage.setItem('jazeera-drivers', JSON.stringify(drivers));
  }, [drivers]);

  const addCashier = (cashierData: Omit<Cashier, 'id' | 'totalSales' | 'ordersProcessed'>) => {
    const newCashier: Cashier = {
      ...cashierData,
      id: `CASH-${Date.now()}`,
      totalSales: 0,
      ordersProcessed: 0
    };
    setCashiers(prev => [...prev, newCashier]);
  };

  const addWaiter = (waiterData: Omit<Waiter, 'id' | 'tablesServed' | 'tips'>) => {
    const newWaiter: Waiter = {
      ...waiterData,
      id: `WAIT-${Date.now()}`,
      tablesServed: 0,
      tips: 0
    };
    setWaiters(prev => [...prev, newWaiter]);
  };

  const addDriver = (driverData: Omit<Driver, 'id' | 'currentDeliveries' | 'totalDeliveries' | 'rating' | 'status'>) => {
    const newDriver: Driver = {
      ...driverData,
      id: `DRIV-${Date.now()}`,
      currentDeliveries: [],
      totalDeliveries: 0,
      rating: 5.0,
      status: 'available'
    };
    setDrivers(prev => [...prev, newDriver]);
  };

  const updateCashierStatus = (id: string, isActive: boolean) => {
    setCashiers(prev => prev.map(cashier =>
      cashier.id === id ? { ...cashier, isActive } : cashier
    ));
  };

  const updateWaiterStatus = (id: string, isActive: boolean) => {
    setWaiters(prev => prev.map(waiter =>
      waiter.id === id ? { ...waiter, isActive } : waiter
    ));
  };

  const updateDriverStatus = (id: string, status: Driver['status']) => {
    setDrivers(prev => prev.map(driver =>
      driver.id === id ? { ...driver, status } : driver
    ));
  };

  const assignDeliveryToDriver = (driverId: string, deliveryId: string) => {
    setDrivers(prev => prev.map(driver =>
      driver.id === driverId 
        ? { 
            ...driver, 
            currentDeliveries: [...driver.currentDeliveries, deliveryId],
            status: 'busy' as const
          }
        : driver
    ));
  };

  const completeDelivery = (driverId: string, deliveryId: string) => {
    setDrivers(prev => prev.map(driver =>
      driver.id === driverId 
        ? { 
            ...driver, 
            currentDeliveries: driver.currentDeliveries.filter(id => id !== deliveryId),
            totalDeliveries: driver.totalDeliveries + 1,
            status: driver.currentDeliveries.length <= 1 ? 'available' as const : 'busy' as const
          }
        : driver
    ));
  };

  return (
    <StaffContext.Provider value={{
      cashiers,
      waiters,
      drivers,
      addCashier,
      addWaiter,
      addDriver,
      updateCashierStatus,
      updateWaiterStatus,
      updateDriverStatus,
      assignDeliveryToDriver,
      completeDelivery
    }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};