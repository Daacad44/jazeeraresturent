import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { DeliveryProvider } from './contexts/DeliveryContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { StaffProvider } from './contexts/StaffContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Delivery from './pages/Delivery';
import Analytics from './pages/Analytics';
import CashierDashboard from './pages/CashierDashboard';
import WaiterDashboard from './pages/WaiterDashboard';
import DriverDashboard from './pages/DriverDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AnalyticsProvider>
          <DeliveryProvider>
            <StaffProvider>
              <CartProvider>
                <Router>
                  <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/delivery" element={<Delivery />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/cashier" element={<CashierDashboard />} />
                        <Route path="/waiter" element={<WaiterDashboard />} />
                        <Route path="/driver" element={<DriverDashboard />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </Router>
              </CartProvider>
            </StaffProvider>
          </DeliveryProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;