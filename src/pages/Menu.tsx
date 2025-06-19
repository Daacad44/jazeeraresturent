import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useCart, MenuItem } from '../contexts/CartContext';

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Burger', 'Shuwarma', 'Bariis Baryani', 'Seafood', 'Desserts', 'Beverages', 'Appetizers', 'Grilled Items', 'Pasta & Rice', 'Traditional Dishes'];

  const menuItems: MenuItem[] = [
    // Burger Section
    {
      id: 'burger-1',
      name: 'Classic Beef Burger',
      price: 12.99,
      description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },
    {
      id: 'burger-2',
      name: 'Chicken Deluxe Burger',
      price: 11.99,
      description: 'Grilled chicken breast with avocado, bacon, and garlic mayo',
      image: 'https://images.pexels.com/photos/2874990/pexels-photo-2874990.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },
    {
      id: 'burger-3',
      name: 'Fish Burger',
      price: 10.99,
      description: 'Crispy fish fillet with tartar sauce and fresh vegetables',
      image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },
    {
      id: 'burger-4',
      name: 'Veggie Burger',
      price: 9.99,
      description: 'Plant-based patty with fresh vegetables and hummus',
      image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },
    {
      id: 'burger-5',
      name: 'Double Cheese Burger',
      price: 15.99,
      description: 'Two beef patties with double cheese and crispy bacon',
      image: 'https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },

    // Shuwarma Section
    {
      id: 'shuwarma-1',
      name: 'Chicken Shuwarma',
      price: 8.99,
      description: 'Traditional chicken shuwarma with garlic sauce and vegetables',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'shuwarma-2',
      name: 'Beef Shuwarma',
      price: 9.99,
      description: 'Tender beef shuwarma with tahini sauce and fresh herbs',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'shuwarma-3',
      name: 'Mixed Shuwarma',
      price: 11.99,
      description: 'Combination of chicken and beef shuwarma with special sauce',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'shuwarma-4',
      name: 'Lamb Shuwarma',
      price: 12.99,
      description: 'Premium lamb shuwarma with yogurt sauce and pickles',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'shuwarma-5',
      name: 'Shuwarma Platter',
      price: 16.99,
      description: 'Large shuwarma serving with rice, salad, and multiple sauces',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },

    // Bariis Baryani Section
    {
      id: 'baryani-1',
      name: 'Lamb Biryani',
      price: 18.99,
      description: 'Aromatic basmati rice with tender lamb and exotic spices',
      image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bariis Baryani'
    },
    {
      id: 'baryani-2',
      name: 'Chicken Biryani',
      price: 16.99,
      description: 'Traditional chicken biryani with aromatic spices and basmati rice',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bariis Baryani'
    },
    {
      id: 'baryani-3',
      name: 'Beef Biryani',
      price: 19.99,
      description: 'Rich beef biryani with slow-cooked meat and fragrant rice',
      image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bariis Baryani'
    },
    {
      id: 'baryani-4',
      name: 'Vegetable Biryani',
      price: 14.99,
      description: 'Mixed vegetables biryani with fragrant spices and saffron rice',
      image: 'https://images.pexels.com/photos/6646374/pexels-photo-6646374.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bariis Baryani'
    },
    {
      id: 'baryani-5',
      name: 'Seafood Biryani',
      price: 22.99,
      description: 'Premium seafood biryani with shrimp, fish, and aromatic rice',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bariis Baryani'
    },
    {
      id: 'baryani-6',
      name: 'Special Mixed Biryani',
      price: 24.99,
      description: 'Chef\'s special with chicken, lamb, and vegetables',
      image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bariis Baryani'
    },

    // Seafood Section
    {
      id: 'seafood-1',
      name: 'Grilled Salmon',
      price: 24.99,
      description: 'Fresh Atlantic salmon grilled with herbs and lemon',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: 'seafood-2',
      name: 'Seafood Curry',
      price: 22.99,
      description: 'Ocean-fresh fish and shrimp in aromatic coconut curry',
      image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: 'seafood-3',
      name: 'Grilled Fish',
      price: 20.99,
      description: 'Daily catch grilled with Mediterranean herbs and olive oil',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: 'seafood-4',
      name: 'Shrimp Special',
      price: 25.99,
      description: 'Jumbo shrimp in garlic butter sauce with vegetables',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: 'seafood-5',
      name: 'Fish & Chips',
      price: 16.99,
      description: 'Crispy battered fish with golden fries and tartar sauce',
      image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: 'seafood-6',
      name: 'Seafood Platter',
      price: 32.99,
      description: 'Mixed seafood platter with fish, shrimp, and calamari',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },

    // Appetizers Section
    {
      id: 'appetizer-1',
      name: 'Samosas (6 pieces)',
      price: 8.99,
      description: 'Crispy pastries filled with spiced vegetables or meat',
      image: 'https://images.pexels.com/photos/5410022/pexels-photo-5410022.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },
    {
      id: 'appetizer-2',
      name: 'Spring Rolls (8 pieces)',
      price: 7.99,
      description: 'Fresh spring rolls with vegetables and sweet chili sauce',
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },
    {
      id: 'appetizer-3',
      name: 'Chicken Wings (10 pieces)',
      price: 12.99,
      description: 'Spicy buffalo wings with blue cheese dip',
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },
    {
      id: 'appetizer-4',
      name: 'Hummus & Pita',
      price: 6.99,
      description: 'Creamy hummus served with warm pita bread and olives',
      image: 'https://images.pexels.com/photos/6107787/pexels-photo-6107787.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },
    {
      id: 'appetizer-5',
      name: 'Mozzarella Sticks (8 pieces)',
      price: 9.99,
      description: 'Golden fried mozzarella sticks with marinara sauce',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers'
    },

    // Grilled Items Section
    {
      id: 'grill-1',
      name: 'Mixed Grill Platter',
      price: 28.99,
      description: 'Assorted grilled meats with traditional accompaniments',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled Items'
    },
    {
      id: 'grill-2',
      name: 'Grilled Chicken Breast',
      price: 18.99,
      description: 'Marinated chicken breast grilled to perfection',
      image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled Items'
    },
    {
      id: 'grill-3',
      name: 'Lamb Chops',
      price: 26.99,
      description: 'Tender lamb chops with rosemary and garlic',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled Items'
    },
    {
      id: 'grill-4',
      name: 'Beef Steak',
      price: 24.99,
      description: 'Premium beef steak grilled to your preference',
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled Items'
    },
    {
      id: 'grill-5',
      name: 'Grilled Vegetables',
      price: 14.99,
      description: 'Seasonal vegetables grilled with herbs and olive oil',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grilled Items'
    },

    // Pasta & Rice Section
    {
      id: 'pasta-1',
      name: 'Chicken Alfredo Pasta',
      price: 16.99,
      description: 'Creamy alfredo pasta with grilled chicken and parmesan',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pasta & Rice'
    },
    {
      id: 'pasta-2',
      name: 'Seafood Pasta',
      price: 19.99,
      description: 'Mixed seafood pasta in white wine and garlic sauce',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pasta & Rice'
    },
    {
      id: 'pasta-3',
      name: 'Vegetable Fried Rice',
      price: 12.99,
      description: 'Wok-fried rice with mixed vegetables and soy sauce',
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pasta & Rice'
    },
    {
      id: 'pasta-4',
      name: 'Chicken Fried Rice',
      price: 14.99,
      description: 'Traditional fried rice with chicken and vegetables',
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pasta & Rice'
    },

    // Traditional Dishes Section
    {
      id: 'traditional-1',
      name: 'Anjero with Stew',
      price: 13.99,
      description: 'Traditional Somali flatbread with meat stew',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'traditional-2',
      name: 'Suqaar',
      price: 17.99,
      description: 'Diced meat cooked with onions and traditional spices',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'traditional-3',
      name: 'Maraq (Soup)',
      price: 9.99,
      description: 'Traditional Somali soup with vegetables and meat',
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },
    {
      id: 'traditional-4',
      name: 'Hilib Ari (Goat Meat)',
      price: 21.99,
      description: 'Traditional goat meat prepared with authentic spices',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Traditional Dishes'
    },

    // Desserts Section
    {
      id: 'dessert-1',
      name: 'Baklava',
      price: 6.99,
      description: 'Traditional honey-sweetened pastry with nuts',
      image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },
    {
      id: 'dessert-2',
      name: 'Rice Pudding',
      price: 5.99,
      description: 'Creamy rice pudding with cinnamon and cardamom',
      image: 'https://images.pexels.com/photos/7937485/pexels-photo-7937485.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },
    {
      id: 'dessert-3',
      name: 'Fresh Fruit Platter',
      price: 8.99,
      description: 'Seasonal fresh fruits beautifully arranged',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },
    {
      id: 'dessert-4',
      name: 'Chocolate Cake',
      price: 7.99,
      description: 'Rich chocolate cake with chocolate ganache',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },
    {
      id: 'dessert-5',
      name: 'Ice Cream Selection',
      price: 4.99,
      description: 'Choice of vanilla, chocolate, or strawberry ice cream',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },

    // Beverages Section
    {
      id: 'beverage-1',
      name: 'Traditional Somali Tea',
      price: 3.99,
      description: 'Authentic blend of spices and tea with milk',
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'beverage-2',
      name: 'Fresh Juice Selection',
      price: 4.99,
      description: 'Daily selection of fresh fruit juices (orange, mango, guava)',
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'beverage-3',
      name: 'Arabic Coffee',
      price: 5.99,
      description: 'Premium Arabic coffee with traditional preparation',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'beverage-4',
      name: 'Soft Drinks',
      price: 2.99,
      description: 'Coca-Cola, Pepsi, Sprite, Fanta, and other sodas',
      image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'beverage-5',
      name: 'Lassi',
      price: 4.99,
      description: 'Traditional yogurt drink with mango or rose flavor',
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'beverage-6',
      name: 'Mineral Water',
      price: 1.99,
      description: 'Premium bottled water (500ml)',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
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
            Our Complete Menu
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
                  {menuItems.filter(item => item.category === category).length}
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
                  {item.category}
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
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Try searching for different keywords or browse our categories!
            </p>
          </div>
        )}

        {/* Special Offers Section */}
        {selectedCategory === 'All' && (
          <div className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">🎉 Today's Special Offers!</h3>
            <p className="text-lg mb-6">
              Enjoy our chef's recommendations and daily specials
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold">🍔 Burger Combo</h4>
                <p>Any burger + fries + drink</p>
                <p className="font-bold">Save $3.99</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold">🍛 Biryani Special</h4>
                <p>Large biryani + appetizer</p>
                <p className="font-bold">Save $5.99</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold">🐟 Seafood Night</h4>
                <p>20% off all seafood dishes</p>
                <p className="font-bold">Fridays only</p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Statistics */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Menu at a Glance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <div key={category} className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {menuItems.filter(item => item.category === category).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {category}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <strong>{menuItems.length}</strong> delicious items across <strong>{categories.length - 1}</strong> categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;