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
    // Main Admin (You)
    'admin@jazeera.com': { password: 'admin123', role: 'admin', name: 'Main Admin', id: 'admin-1' },
    
    // Delivery Users
    'delivery1@jazeera.com': { password: 'delivery123', role: 'driver', name: 'Ahmed Delivery', id: 'driver-1', staffId: '1' },
    'delivery2@jazeera.com': { password: 'delivery123', role: 'driver', name: 'Omar Delivery', id: 'driver-2', staffId: '2' },
    
    // Cashier Users
    'cashier1@jazeera.com': { password: 'cashier123', role: 'cashier', name: 'Fatima Cashier', id: 'cashier-1', staffId: '1' },
    'cashier2@jazeera.com': { password: 'cashier123', role: 'cashier', name: 'Hassan Cashier', id: 'cashier-2', staffId: '2' },
    
    // Waiter Users
    'waiter1@jazeera.com': { password: 'waiter123', role: 'waiter', name: 'Mariam Waiter', id: 'waiter-1', staffId: '1' },
    'waiter2@jazeera.com': { password: 'waiter123', role: 'waiter', name: 'Ali Waiter', id: 'waiter-2', staffId: '2' },
    
    // Customer Users
    'customer1@jazeera.com': { password: 'customer123', role: 'customer', name: 'Ahmed Customer', id: 'customer-1' },
    'customer2@jazeera.com': { password: 'customer123', role: 'customer', name: 'Amina Customer', id: 'customer-2' }
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