import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        alert('Invalid credentials. Check the demo credentials below.');
      }
    } else {
      // Registration logic (mock)
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Demo User Accounts:
              </h4>
              <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                <p><strong>🔑 Main Admin (You):</strong> admin@jazeera.com / admin123</p>
                <p><strong>🚚 Delivery User:</strong> delivery1@jazeera.com / delivery123</p>
                <p><strong>💰 Cashier User:</strong> cashier1@jazeera.com / cashier123</p>
                <p><strong>🍽️ Waiter User:</strong> waiter1@jazeera.com / waiter123</p>
                <p><strong>👤 Customer User:</strong> customer1@jazeera.com / customer123</p>
                <p><strong>📧 Any Customer:</strong> any@email.com / 123456</p>
              </div>
            </div>
          )}

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;