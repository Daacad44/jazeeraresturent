import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useCart, MenuItem } from '../contexts/CartContext';

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Burger', 'Shuwarma', 'Bariis Baryani', 'Seafood', 'Desserts', 'Beverages'];

  const menuItems: MenuItem[] = [
    // Appetizers
    {
      id: '1',
      name: 'Burger',
      price: 2,
      description: 'Burger chiken waxaa laga sameeyay chicken',
      image: 'https://www.pinterest.com/pin/56154326598157662',
      category: 'Appetizers'
    },
    {
      id: '2',
      name: 'Hummus Platter',
      price: 12.99,
      description: 'Fresh hummus with warm pita bread and vegetables',
      image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },
    {
      id: '3',
      name: 'Soup of the Day',
      price: 7.99,
      description: 'Chef\'s special soup made with fresh ingredients',
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },

    // Main Course
    {
      id: '4',
      name: 'Lamb Biryani',
      price: 18.99,
      description: 'Aromatic basmati rice with tender lamb and exotic spices',
      image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course'
    },
    {
      id: '5',
      name: 'Chicken Curry',
      price: 16.99,
      description: 'Traditional chicken curry with aromatic spices',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course'
    },
    {
      id: '6',
      name: 'Vegetable Tagine',
      price: 14.99,
      description: 'Mixed vegetables slow-cooked in traditional tagine',
      image: 'https://images.pexels.com/photos/6646374/pexels-photo-6646374.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course'
    },

    // Grill
    {
      id: '7',
      name: 'Mixed Grill Platter',
      price: 24.99,
      description: 'Assorted grilled meats with traditional accompaniments',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grill'
    },
    {
      id: '8',
      name: 'Grilled Chicken',
      price: 19.99,
      description: 'Marinated chicken grilled to perfection',
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grill'
    },
    {
      id: '9',
      name: 'Beef Kebabs',
      price: 21.99,
      description: 'Tender beef kebabs with herbs and spices',
      image: 'https://images.pexels.com/photos/10922923/pexels-photo-10922923.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grill'
    },

    // Seafood
    {
      id: '10',
      name: 'Fresh Seafood Curry',
      price: 22.99,
      description: 'Ocean-fresh fish in aromatic coconut curry',
      image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: '11',
      name: 'Grilled Fish',
      price: 20.99,
      description: 'Daily catch grilled with lemon and herbs',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: '12',
      name: 'Shrimp Special',
      price: 25.99,
      description: 'Jumbo shrimp in garlic butter sauce',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },

    // Desserts
    {
      id: '13',
      name: 'Baklava',
      price: 6.99,
      description: 'Traditional honey-sweetened pastry',
      image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },
    {
      id: '14',
      name: 'Rice Pudding',
      price: 5.99,
      description: 'Creamy rice pudding with cinnamon',
      image: 'https://images.pexels.com/photos/7937485/pexels-photo-7937485.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },
    {
      id: '15',
      name: 'Fresh Fruit Platter',
      price: 8.99,
      description: 'Seasonal fresh fruits beautifully arranged',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },

    // Beverages
    {
      id: '16',
      name: 'Traditional Tea',
      price: 3.99,
      description: 'Authentic blend of spices and tea',
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: '17',
      name: 'Fresh Juice',
      price: 4.99,
      description: 'Daily selection of fresh fruit juices',
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: '18',
      name: 'Coffee Special',
      price: 5.99,
      description: 'Premium coffee with traditional preparation',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    }
  ];

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
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-yellow-600">
                    ${item.price}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;