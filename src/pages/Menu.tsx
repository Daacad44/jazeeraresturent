import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useCart, MenuItem } from '../contexts/CartContext';

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Pizza', 'Burger', 'Shuwarma', 'Bariis Baryani', 'Seafood', 'Desserts', 'Beverages'];

  const menuItems: MenuItem[] = [
    // Pizza Section
    // Pizza Super Chicken
    {
      id: 'pizza-1',
      name: 'Pizza Super Chicken Large',
      price: 13,
      description: 'Large pizza with super chicken toppings, cheese, and special sauce',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-2',
      name: 'Pizza Super Chicken Medium',
      price: 9,
      description: 'Medium pizza with super chicken toppings, cheese, and special sauce',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-3',
      name: 'Pizza Super Chicken Small',
      price: 7,
      description: 'Small pizza with super chicken toppings, cheese, and special sauce',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },

    // Pizza Odkac
    {
      id: 'pizza-4',
      name: 'Pizza Odkac Large',
      price: 14,
      description: 'Large pizza with traditional odkac toppings and authentic spices',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-5',
      name: 'Pizza Odkac Medium',
      price: 10,
      description: 'Medium pizza with traditional odkac toppings and authentic spices',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-6',
      name: 'Pizza Odkac Small',
      price: 7,
      description: 'Small pizza with traditional odkac toppings and authentic spices',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },

    // Meat Pizza
    {
      id: 'pizza-7',
      name: 'Meat Pizza Large',
      price: 12,
      description: 'Large pizza loaded with premium meat toppings and melted cheese',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-8',
      name: 'Meat Pizza Medium',
      price: 9,
      description: 'Medium pizza loaded with premium meat toppings and melted cheese',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-9',
      name: 'Meat Pizza Small',
      price: 7,
      description: 'Small pizza loaded with premium meat toppings and melted cheese',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },

    // BBQ Chicken Pizza
    {
      id: 'pizza-10',
      name: 'BBQ Chicken Pizza Large',
      price: 12,
      description: 'Large pizza with BBQ chicken, onions, and smoky BBQ sauce',
      image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-11',
      name: 'BBQ Chicken Pizza Medium',
      price: 8,
      description: 'Medium pizza with BBQ chicken, onions, and smoky BBQ sauce',
      image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-12',
      name: 'BBQ Chicken Pizza Small',
      price: 6,
      description: 'Small pizza with BBQ chicken, onions, and smoky BBQ sauce',
      image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },

    // Pizza Mexican
    {
      id: 'pizza-13',
      name: 'Pizza Mexican Large',
      price: 14,
      description: 'Large pizza with spicy Mexican toppings, jalapeños, and peppers',
      image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-14',
      name: 'Pizza Mexican Medium',
      price: 10,
      description: 'Medium pizza with spicy Mexican toppings, jalapeños, and peppers',
      image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-15',
      name: 'Pizza Mexican Small',
      price: 7,
      description: 'Small pizza with spicy Mexican toppings, jalapeños, and peppers',
      image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },

    // Pizza Jazira Box (Special Combo)
    {
      id: 'pizza-16',
      name: 'Pizza Jazira Box Large',
      price: 14,
      description: 'Large pizza combo with special Jazira toppings and side items',
      image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-17',
      name: 'Pizza Jazira Box Medium',
      price: 12,
      description: 'Medium pizza combo with special Jazira toppings and side items',
      image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-18',
      name: 'Pizza Jazira Box Small',
      price: 8,
      description: 'Small pizza combo with special Jazira toppings and side items',
      image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },

    // Tuna Pizza
    {
      id: 'pizza-19',
      name: 'Tuna Pizza Large',
      price: 12,
      description: 'Large pizza with fresh tuna, olives, and Mediterranean herbs',
      image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-20',
      name: 'Tuna Pizza Medium',
      price: 9,
      description: 'Medium pizza with fresh tuna, olives, and Mediterranean herbs',
      image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },
    {
      id: 'pizza-21',
      name: 'Tuna Pizza Small',
      price: 7,
      description: 'Small pizza with fresh tuna, olives, and Mediterranean herbs',
      image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza'
    },

    // Burger Section
    {
      id: 'burger-1',
      name: 'Chicken Burger',
      price: 8,
      description: 'Juicy grilled chicken burger with fresh lettuce and tomatoes',
      image: 'https://images.pexels.com/photos/2874990/pexels-photo-2874990.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },
    {
      id: 'burger-2',
      name: 'Beef Burger',
      price: 10,
      description: 'Premium beef burger with cheese, pickles, and special sauce',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },
    {
      id: 'burger-3',
      name: 'Fish Burger',
      price: 9,
      description: 'Crispy fish fillet burger with tartar sauce and fresh vegetables',
      image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Burger'
    },

    // Shuwarma Section
    {
      id: 'shuwarma-1',
      name: 'Chicken Shuwarma',
      price: 6,
      description: 'Traditional chicken shuwarma with garlic sauce and vegetables',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'shuwarma-2',
      name: 'Meat Shuwarma',
      price: 7,
      description: 'Tender meat shuwarma with tahini sauce and fresh herbs',
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Shuwarma'
    },
    {
      id: 'shuwarma-3',
      name: 'Mixed Shuwarma',
      price: 8,
      description: 'Combination of chicken and meat shuwarma with special sauce',
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
      name: 'Vegetable Biryani',
      price: 14.99,
      description: 'Mixed vegetables biryani with fragrant spices and saffron rice',
      image: 'https://images.pexels.com/photos/6646374/pexels-photo-6646374.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bariis Baryani'
    },

    // Seafood
    {
      id: 'seafood-1',
      name: 'Fresh Seafood Curry',
      price: 22.99,
      description: 'Ocean-fresh fish in aromatic coconut curry',
      image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: 'seafood-2',
      name: 'Grilled Fish',
      price: 20.99,
      description: 'Daily catch grilled with lemon and herbs',
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },
    {
      id: 'seafood-3',
      name: 'Shrimp Special',
      price: 25.99,
      description: 'Jumbo shrimp in garlic butter sauce',
      image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    },

    // Desserts
    {
      id: 'dessert-1',
      name: 'Baklava',
      price: 6.99,
      description: 'Traditional honey-sweetened pastry',
      image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts'
    },
    {
      id: 'dessert-2',
      name: 'Rice Pudding',
      price: 5.99,
      description: 'Creamy rice pudding with cinnamon',
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

    // Beverages
    {
      id: 'beverage-1',
      name: 'Traditional Tea',
      price: 3.99,
      description: 'Authentic blend of spices and tea',
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'beverage-2',
      name: 'Fresh Juice',
      price: 4.99,
      description: 'Daily selection of fresh fruit juices',
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages'
    },
    {
      id: 'beverage-3',
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

  // Special search for pizza variations
  const getSearchResults = () => {
    if (searchTerm.toLowerCase() === 'pizza') {
      return menuItems.filter(item => item.category === 'Pizza');
    }
    return filteredItems;
  };

  const searchResults = getSearchResults();

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
              placeholder="Search menu items... (try 'pizza')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {searchTerm.toLowerCase() === 'pizza' && (
            <div className="text-center mt-4">
              <p className="text-green-600 dark:text-green-400 font-semibold">
                🍕 Found {menuItems.filter(item => item.category === 'Pizza').length} pizza varieties!
              </p>
            </div>
          )}
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
              {category === 'Pizza' && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  21
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Special Pizza Section Header */}
        {(selectedCategory === 'Pizza' || searchTerm.toLowerCase() === 'pizza') && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🍕 Pizza Collection
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From classic to specialty - all sizes available: Small, Medium & Large
            </p>
          </div>
        )}

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((item) => (
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
                {item.category === 'Pizza' && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🍕 PIZZA
                  </div>
                )}
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

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No items found matching your search.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Try searching for "pizza" to see all our pizza varieties!
            </p>
          </div>
        )}

        {/* Pizza Search Suggestion */}
        {searchTerm === '' && selectedCategory === 'All' && (
          <div className="mt-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">🍕 Try Our Pizza Collection!</h3>
            <p className="text-lg mb-6">
              Search for "pizza" to discover all our delicious pizza varieties including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>🍗 Pizza Chicken</div>
              <div>🥩 Pizza Meat</div>
              <div>🌶️ Pizza Odkac</div>
              <div>🔥 BBQ Chicken</div>
            </div>
            <button
              onClick={() => setSearchTerm('pizza')}
              className="mt-6 bg-white text-red-500 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Show All Pizzas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;