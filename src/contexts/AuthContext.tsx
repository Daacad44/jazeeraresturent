import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'cashier' | 'waiter' | 'driver';
  staffId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isCashier: () => boolean;
  isWaiter: () => boolean;
  isDriver: () => boolean;
  isStaff: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Staff accounts database - dynamically updated from StaffContext
  const getStaffAccounts = () => {
    const savedCashiers = JSON.parse(localStorage.getItem('jazeera-cashiers') || '[]');
    const savedWaiters = JSON.parse(localStorage.getItem('jazeera-waiters') || '[]');
    const savedDrivers = JSON.parse(localStorage.getItem('jazeera-drivers') || '[]');

    const accounts: { [key: string]: any } = {
      // Main Admin (You)
      'admin@jazeera.com': { password: 'admin123', role: 'admin', name: 'Main Admin', id: 'admin-1' },
    };

    // Add cashiers
    savedCashiers.forEach((cashier: any) => {
      accounts[cashier.email] = {
        password: cashier.password || 'cashier123',
        role: 'cashier',
        name: cashier.name,
        id: `cashier-${cashier.id}`,
        staffId: cashier.id
      };
    });

    // Add waiters
    savedWaiters.forEach((waiter: any) => {
      accounts[waiter.email] = {
        password: waiter.password || 'waiter123',
        role: 'waiter',
        name: waiter.name,
        id: `waiter-${waiter.id}`,
        staffId: waiter.id
      };
    });

    // Add drivers
    savedDrivers.forEach((driver: any) => {
      accounts[driver.email] = {
        password: driver.password || 'driver123',
        role: 'driver',
        name: driver.name,
        id: `driver-${driver.id}`,
        staffId: driver.id
      };
    });

    // Default customer accounts
    accounts['customer1@jazeera.com'] = { password: 'customer123', role: 'customer', name: 'Ahmed Customer', id: 'customer-1' };
    accounts['customer2@jazeera.com'] = { password: 'customer123', role: 'customer', name: 'Amina Customer', id: 'customer-2' };

    return accounts;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('jazeera-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get current staff accounts
    const staffAccounts = getStaffAccounts();
    
    // Check staff accounts first
    const staffAccount = staffAccounts[email];
    if (staffAccount && staffAccount.password === password) {
      const loggedInUser = {
        id: staffAccount.id,
        name: staffAccount.name,
        email,
        role: staffAccount.role as User['role'],
        staffId: staffAccount.staffId
      };
      setUser(loggedInUser);
      localStorage.setItem('jazeera-user', JSON.stringify(loggedInUser));
      return true;
    }
    
    // Fallback for any other customer accounts
    if (email.includes('@') && password.length >= 6) {
      const customerUser = {
        id: `customer-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'customer' as const
      };
      setUser(customerUser);
      localStorage.setItem('jazeera-user', JSON.stringify(customerUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jazeera-user');
  };

  const isAdmin = () => user?.role === 'admin';
  const isCashier = () => user?.role === 'cashier';
  const isWaiter = () => user?.role === 'waiter';
  const isDriver = () => user?.role === 'driver';
  const isStaff = () => ['admin', 'cashier', 'waiter', 'driver'].includes(user?.role || '');

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      isCashier, 
      isWaiter, 
      isDriver, 
      isStaff 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};