import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useCart, MenuItem } from '../contexts/CartContext';

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Fried Chicken', 'Burgers', 'Shuwarma', 'Quraac & Breakfast', 'Traditional Dishes', 'Grilled & Kebab', 'Sides & Extras', 'Beverages'];

  const menuItems: MenuItem[] = [
    // 🐔 FRIED CHICKEN & FAST FOOD CATEGORY
    {
      id: 'fc-1',
      name: '21 Pc Fried Chicken Family Pack',
      price: 25,
      description: '21 pieces of crispy fried chicken + 4 garlic dips + 5 Coca-Cola + coleslaw',
      image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-2',
      name: '12 Pc Fried Chicken Meal',
      price: 13.5,
      description: '12 pieces of crispy fried chicken + 4 garlic dips + 2 Coca-Cola',
      image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-3',
      name: '9 Pc Fried Chicken Combo',
      price: 10,
      description: '9 pieces of crispy fried chicken + 4 garlic dips + 2 Coca-Cola',
      image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-4',
      name: '6 Pc Fried Chicken Set',
      price: 7,
      description: '6 pieces of crispy fried chicken + 4 garlic dips + 1 Coca-Cola',
      image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-5',
      name: '3 Pc Chicken',
      price: 3.6,
      description: '3 pieces of golden crispy fried chicken',
      image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-6',
      name: '9 Pc Strips Meal',
      price: 7.5,
      description: '9 pieces of chicken strips + 2 garlic dips + 1 Coca-Cola',
      image: 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-7',
      name: '6 Pc Strips Meal',
      price: 4,
      description: '6 pieces of chicken strips + 2 garlic dips + 1 Coca-Cola',
      image: 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-8',
      name: '2 Pc Crunchy Wrap Meal',
      price: 5.5,
      description: '2 pieces of crunchy wrap + 2 garlic dips + 1 Coca-Cola',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-9',
      name: '1 Pc Crunchy Wrap',
      price: 4.7,
      description: 'Single crunchy wrap with crispy chicken',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-10',
      name: 'Crunchy Burger Meal',
      price: 6,
      description: 'Crunchy burger + 4 garlic dips + 1 Coca-Cola',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },
    {
      id: 'fc-11',
      name: '2 Pc Royal Meal',
      price: 2.7,
      description: '2 pieces royal meal + 1 Coca-Cola + 1 roti',
      image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fried Chicken'
    },

    // 🍔 BURGERS CATEGORY
    {
      id: 'bg-1',
      name: 'Premium Meat Burger',
      price: 3.5,
      description: 'Juicy beef patty with fresh vegetables and special sauce',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burgers'
    },
    {
      id: 'bg-2',
      name: 'Classic Meat Burger',
      price: 2.5,
      description: 'Traditional beef burger with lettuce and tomato',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burgers'
    },
    {
      id: 'bg-3',
      name: 'Deluxe Chicken Burger',
      price: 3,
      description: 'Grilled chicken breast with fresh toppings',
      image: 'https://images.pexels.com/photos/2874990/pexels-photo-2874990.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burgers'
    },
    {
      id: 'bg-4',
      name: 'Classic Chicken Burger',
      price: 2,
      description: 'Crispy chicken fillet with mayo and lettuce',
      image: 'https://images.pexels.com/photos/2874990/pexels-photo-2874990.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burgers'
    },
    {
      id: 'bg-5',
      name: 'Classic Fish Burger',
      price: 2,
      description: 'Crispy fish fillet with tartar sauce',
      image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burgers'
    },
    {
      id: 'bg-6',
      name: 'Deluxe Fish Burger',
      price: 3,
      description: 'Premium fish fillet with fresh vegetables and special sauce',
      image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burgers'
    },

    // 🥙 SHUWARMA CATEGORY
    {
      id: 'sh-1',
      name: 'Classic Chicken Shuwarma',
      price: 2,
      description: 'Traditional chicken shuwarma with garlic sauce and vegetables',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'sh-2',
      name: 'Deluxe Chicken Shuwarma',
      price: 3,
      description: 'Premium chicken shuwarma with extra toppings and sauce',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'sh-3',
      name: 'Classic Fish Shuwarma',
      price: 2,
      description: 'Fresh fish shuwarma with tahini sauce and vegetables',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'sh-4',
      name: 'Deluxe Fish Shuwarma',
      price: 3,
      description: 'Premium fish shuwarma with special sauce and fresh herbs',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'sh-5',
      name: 'Meat Shuwarma',
      price: 3,
      description: 'Tender meat shuwarma with traditional spices and sauce',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },

    // 🌅 QURAAC & BREAKFAST CATEGORY
    {
      id: 'qr-1',
      name: 'Fuul & Toonah',
      price: 2.5,
      description: 'Traditional fava beans with tuna and spices',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-2',
      name: 'Classic Fuul',
      price: 2,
      description: 'Traditional fava beans with olive oil and spices',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-3',
      name: 'Fuul & Ukun',
      price: 2.5,
      description: 'Fava beans with scrambled eggs and herbs',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-4',
      name: 'Fuul Double',
      price: 5,
      description: 'Double portion of traditional fava beans',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-5',
      name: 'Fuul Family',
      price: 4,
      description: 'Family-sized portion of traditional fava beans',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-6',
      name: 'Fuul & Chicken',
      price: 6,
      description: 'Fava beans with grilled chicken pieces',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-7',
      name: 'Fuul & Fish',
      price: 3,
      description: 'Fava beans with fresh fish pieces',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-8',
      name: 'Fuul & Meat',
      price: 3,
      description: 'Fava beans with tender meat pieces',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-9',
      name: 'Chicken Suqaar',
      price: 2.5,
      description: 'Diced chicken cooked with traditional spices',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-10',
      name: 'Fish Suqaar',
      price: 2.5,
      description: 'Diced fish cooked with aromatic spices',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-11',
      name: 'Meat Suqaar',
      price: 2.5,
      description: 'Diced meat cooked with traditional spices',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-12',
      name: 'Dugaag (Hilib)',
      price: 2.5,
      description: 'Traditional meat stew with spices',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-13',
      name: 'Koosto',
      price: 2,
      description: 'Traditional breakfast dish with vegetables',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },
    {
      id: 'qr-14',
      name: 'Ukun Karis',
      price: 0.25,
      description: 'Single egg prepared your way',
      image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Quraac & Breakfast'
    },

    // 🍛 TRADITIONAL DISHES CATEGORY
    {
      id: 'td-1',
      name: 'Cadas',
      price: 2,
      description: 'Traditional lentil dish with spices',
      image: 'https://images.pexels.com/photos/6646374/pexels-photo-6646374.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'td-2',
      name: 'Dacmiyah',
      price: 3,
      description: 'Traditional vegetable stew with meat',
      image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'td-3',
      name: 'Kalaan kal & Sawayad',
      price: 3,
      description: 'Traditional fish curry with vegetables',
      image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'td-4',
      name: 'Beer Geel',
      price: 2,
      description: 'Traditional camel liver dish',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'td-5',
      name: 'Canjeero',
      price: 0.5,
      description: 'Traditional Somali pancake',
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'td-6',
      name: 'Jabaati',
      price: 0.5,
      description: 'Traditional flatbread',
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },

    // 🍳 GRILLED & KEBAB CATEGORY
    {
      id: 'gk-1',
      name: 'Shak Shuuko',
      price: 2,
      description: 'Traditional shakshuka with eggs and tomatoes',
      image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-2',
      name: 'Shak Shuuko & Toonah',
      price: 2.5,
      description: 'Shakshuka with tuna and spices',
      image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-3',
      name: 'Beer Ari',
      price: 3,
      description: 'Grilled goat liver with spices',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-4',
      name: 'Kabaab Chicken',
      price: 4,
      description: 'Grilled chicken kebab with herbs and spices',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-5',
      name: 'Kabaab Hilib',
      price: 5,
      description: 'Traditional meat kebab with aromatic spices',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-6',
      name: 'Kabaab Meat',
      price: 6,
      description: 'Premium meat kebab with special marinade',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-7',
      name: 'Finger Fish (7pc)',
      price: 5,
      description: '7 pieces of crispy finger fish',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-8',
      name: 'Finger Fish (5pc)',
      price: 4,
      description: '5 pieces of crispy finger fish',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },
    {
      id: 'gk-9',
      name: 'Kili Ari',
      price: 3,
      description: 'Grilled kidney with traditional spices',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled & Kebab'
    },

    // 🍟 SIDES & EXTRAS CATEGORY
    {
      id: 'se-1',
      name: 'Classic Chips',
      price: 1.5,
      description: 'Golden crispy french fries',
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sides & Extras'
    },
    {
      id: 'se-2',
      name: 'Chips Masala',
      price: 2,
      description: 'Spiced french fries with masala seasoning',
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sides & Extras'
    },
    {
      id: 'se-3',
      name: 'Rooti',
      price: 0.5,
      description: 'Traditional flatbread',
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sides & Extras'
    },
    {
      id: 'se-4',
      name: 'Toonah',
      price: 2,
      description: 'Fresh tuna salad',
      image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sides & Extras'
    },

    // 🥤 BEVERAGES CATEGORY
    {
      id: 'bv-1',
      name: 'Coca-Cola',
      price: 1,
      description: 'Refreshing Coca-Cola soft drink',
      image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'bv-2',
      name: 'Traditional Tea',
      price: 1.5,
      description: 'Authentic spiced tea blend',
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'bv-3',
      name: 'Fresh Juice',
      price: 2,
      description: 'Daily selection of fresh fruit juices',
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'bv-4',
      name: 'Coffee Special',
      price: 2.5,
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

  const getCategoryCount = (category: string) => {
    return menuItems.filter(item => item.category === category).length;
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Fried Chicken': return '🍗';
      case 'Burgers': return '🍔';
      case 'Shuwarma': return '🥙';
      case 'Quraac & Breakfast': return '🌅';
      case 'Traditional Dishes': return '🍛';
      case 'Grilled & Kebab': return '🔥';
      case 'Sides & Extras': return '🍟';
      case 'Beverages': return '🥤';
      default: return '🍽️';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Complete Menu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our authentic cuisine crafted with love and tradition
          </p>
          <div className="mt-4 text-lg font-semibold text-yellow-600">
            {menuItems.length} Delicious Items Available
          </div>
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
              {category !== 'All' && getCategoryEmoji(category)} {category}
              {category !== 'All' && (
                <span className="ml-2 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
                  {getCategoryCount(category)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {selectedCategory !== 'All' && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {getCategoryEmoji(selectedCategory)} {selectedCategory}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {selectedCategory === 'Fried Chicken' && 'Crispy, golden fried chicken and fast food favorites'}
              {selectedCategory === 'Burgers' && 'Delicious handcrafted burgers made with premium ingredients'}
              {selectedCategory === 'Shuwarma' && 'Traditional Middle Eastern wraps with authentic flavors'}
              {selectedCategory === 'Quraac & Breakfast' && 'Traditional breakfast dishes and morning favorites'}
              {selectedCategory === 'Traditional Dishes' && 'Authentic Somali cuisine passed down through generations'}
              {selectedCategory === 'Grilled & Kebab' && 'Expertly grilled meats and kebabs with smoky flavors'}
              {selectedCategory === 'Sides & Extras' && 'Perfect accompaniments to complete your meal'}
              {selectedCategory === 'Beverages' && 'Refreshing drinks to complement your meal'}
            </p>
          </div>
        )}

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {getCategoryEmoji(item.category)}
                </div>
              </div>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full font-semibold transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
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

        {/* Menu Summary */}
        {selectedCategory === 'All' && (
          <div className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">🍽️ Complete Menu Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>🍗 {getCategoryCount('Fried Chicken')} Fried Chicken Items</div>
              <div>🍔 {getCategoryCount('Burgers')} Burger Varieties</div>
              <div>🥙 {getCategoryCount('Shuwarma')} Shuwarma Options</div>
              <div>🌅 {getCategoryCount('Quraac & Breakfast')} Breakfast Items</div>
              <div>🍛 {getCategoryCount('Traditional Dishes')} Traditional Dishes</div>
              <div>🔥 {getCategoryCount('Grilled & Kebab')} Grilled & Kebab</div>
              <div>🍟 {getCategoryCount('Sides & Extras')} Sides & Extras</div>
              <div>🥤 {getCategoryCount('Beverages')} Beverages</div>
            </div>
            <p className="mt-6 text-lg">
              From traditional Somali breakfast to crispy fried chicken - we have something for everyone!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;