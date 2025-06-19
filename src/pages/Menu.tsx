import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useCart, MenuItem } from '../contexts/CartContext';

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Burger', 'Shuwarma', 'Bariis Baryani', 'Seafood', 'Desserts', 'Beverages', 'Appetizers', 'Grilled Items', 'Pasta & Rice', 'Traditional Dishes'];

  // Empty menu items array - all items removed by their names
  const menuItems: MenuItem[] = [];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our authentic cuisine crafted with love and tradition
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
                  0
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {selectedCategory !== 'All' && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🍽️ {selectedCategory}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {selectedCategory === 'Burger' && 'Delicious handcrafted burgers made with premium ingredients'}
              {selectedCategory === 'Shuwarma' && 'Traditional Middle Eastern wraps with authentic flavors'}
              {selectedCategory === 'Bariis Baryani' && 'Aromatic rice dishes with perfectly spiced meats and vegetables'}
              {selectedCategory === 'Seafood' && 'Fresh ocean catches prepared with Mediterranean and local influences'}
              {selectedCategory === 'Appetizers' && 'Perfect starters to begin your culinary journey'}
              {selectedCategory === 'Grilled Items' && 'Expertly grilled meats and vegetables with smoky flavors'}
              {selectedCategory === 'Pasta & Rice' && 'Comfort foods from around the world'}
              {selectedCategory === 'Traditional Dishes' && 'Authentic Somali cuisine passed down through generations'}
              {selectedCategory === 'Desserts' && 'Sweet endings to complete your dining experience'}
              {selectedCategory === 'Beverages' && 'Refreshing drinks to complement your meal'}
            </p>
          </div>
        )}

        {/* Empty State - No Menu Items */}
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🍽️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Menu Items Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            We're currently updating our menu with fresh new items. All menu categories are ready and waiting for delicious new additions.
          </p>
          
          {/* Category Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto mb-8">
            {categories.slice(1).map((category) => (
              <div key={category} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                <div className="text-2xl font-bold text-yellow-600 mb-1">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{category}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Items</div>
              </div>
            ))}
          </div>

          {/* Status Message */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              📋 Menu Status
            </h3>
            <p className="text-yellow-700 dark:text-yellow-400">
              All menu categories have been cleared and are ready for new items. The menu infrastructure is fully functional and waiting for fresh content.
            </p>
          </div>
        </div>

        {/* Contact for Menu Updates */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
          <p className="text-lg mb-6">
            Be the first to know when our new menu items are available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;