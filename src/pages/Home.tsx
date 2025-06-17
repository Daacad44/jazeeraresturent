import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin, Phone, Users, Award, Utensils, Heart, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Home: React.FC = () => {
  const { addToCart } = useCart();

  const featuredDishes = [
    {
      id: '1',
      name: 'Lamb Biryani',
      price: 18.99,
      description: 'Aromatic basmati rice with tender lamb and exotic spices',
      image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course'
    },
    {
      id: '2',
      name: 'Mixed Grill Platter',
      price: 24.99,
      description: 'Assorted grilled meats with traditional accompaniments',
      image: 'https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Grill'
    },
    {
      id: '3',
      name: 'Fresh Seafood Curry',
      price: 22.99,
      description: 'Ocean-fresh fish in aromatic coconut curry',
      image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seafood'
    }
  ];

  const stats = [
    { icon: Users, number: '5000+', label: 'Happy Customers' },
    { icon: Award, number: '15+', label: 'Awards Won' },
    { icon: Utensils, number: '200+', label: 'Menu Items' },
    { icon: Star, number: '4.9', label: 'Rating' }
  ];

  const services = [
    {
      icon: Utensils,
      title: 'Dine In',
      description: 'Enjoy our authentic atmosphere with exceptional service'
    },
    {
      icon: Truck,
      title: 'Delivery',
      description: 'Fast delivery to your doorstep, hot and fresh'
    },
    {
      icon: Heart,
      title: 'Catering',
      description: 'Perfect for events, parties, and special occasions'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Jazeera
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience authentic cuisine with a modern touch. Fresh ingredients, traditional recipes, unforgettable flavors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Order Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Dishes */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Dishes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Taste our chef's special recommendations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {dish.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-yellow-600">
                      ${dish.price}
                    </span>
                    <button
                      onClick={() => addToCart(dish)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: About Preview */}
      <section className="py-20 bg-yellow-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since 2010, Jazeera Restaurant has been serving authentic cuisine with passion and dedication. 
                Our journey began with a simple mission: to bring traditional flavors to modern dining.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Every dish tells a story, crafted with love using time-honored recipes passed down through generations, 
                combined with the freshest local ingredients.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Restaurant interior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">4.9</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">1000+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Statistics */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Multiple ways to enjoy our cuisine
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-6">
                  <service.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Location & Hours */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Visit Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Location
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Mogadishu, Somalia<br />
                      Easy to find, plenty of parking
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Opening Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Sunday<br />
                      8:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Contact
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +252611777223<br />
                      +252611777224<br />
                      +252611777225
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-20 bg-yellow-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real experiences from real people
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmed Hassan',
                comment: 'The best authentic cuisine in the city! Every dish is perfectly prepared.',
                rating: 5
              },
              {
                name: 'Fatima Ali',
                comment: 'Outstanding service and incredible flavors. Highly recommended!',
                rating: 5
              },
              {
                name: 'Omar Mohamed',
                comment: 'A true gem! The atmosphere is perfect for family dining.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.comment}"
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Special Offers */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Special Weekend Offer
            </h2>
            <p className="text-xl mb-8">
              Get 20% off on all family platters this weekend!
            </p>
            <Link
              to="/menu"
              className="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Order Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Newsletter */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive offers and updates
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Section 10: Call to Action */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Experience Jazeera?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your table or order online for an unforgettable dining experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200"
            >
              Order Online
            </Link>
            <Link
              to="/contact"
              className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-50 hover:text-yellow-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;