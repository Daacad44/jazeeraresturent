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

  // Staff accounts database
  const staffAccounts = {
    // Admin
    'admin@jazeera.com': { password: 'admin123', role: 'admin', name: 'Admin', id: 'admin-1' },
    
    // Cashiers
    'ahmed.cashier@jazeera.com': { password: 'cash123', role: 'cashier', name: 'Ahmed Hassan', id: 'cashier-1', staffId: '1' },
    'fatima.cashier@jazeera.com': { password: 'cash123', role: 'cashier', name: 'Fatima Ali', id: 'cashier-2', staffId: '2' },
    'omar.cashier@jazeera.com': { password: 'cash123', role: 'cashier', name: 'Omar Mohamed', id: 'cashier-3', staffId: '3' },
    'amina.cashier@jazeera.com': { password: 'cash123', role: 'cashier', name: 'Amina Said', id: 'cashier-4', staffId: '4' },
    
    // Waiters
    'hassan.waiter@jazeera.com': { password: 'wait123', role: 'waiter', name: 'Hassan Omar', id: 'waiter-1', staffId: '1' },
    'mariam.waiter@jazeera.com': { password: 'wait123', role: 'waiter', name: 'Mariam Ahmed', id: 'waiter-2', staffId: '2' },
    'ali.waiter@jazeera.com': { password: 'wait123', role: 'waiter', name: 'Ali Hassan', id: 'waiter-3', staffId: '3' },
    
    // Drivers
    'mohamed.driver@jazeera.com': { password: 'driv123', role: 'driver', name: 'Mohamed Ali', id: 'driver-1', staffId: '1' },
    'abdi.driver@jazeera.com': { password: 'driv123', role: 'driver', name: 'Abdi Rahman', id: 'driver-2', staffId: '2' }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('jazeera-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check staff accounts first
    const staffAccount = staffAccounts[email as keyof typeof staffAccounts];
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
    
    // Fallback for customer accounts
    if (email.includes('@') && password.length >= 6) {
      const customerUser = {
        id: '2',
        name: 'Customer',
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