import React from 'react';
import { Utensils, Truck, Heart, Clock, MapPin, Phone, Star, Users } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Utensils,
      title: 'Dine In Experience',
      description: 'Enjoy our authentic atmosphere with exceptional service in our beautifully designed restaurant.',
      features: ['Comfortable seating', 'Live music on weekends', 'Family-friendly environment', 'Professional waitstaff'],
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your favorite dishes delivered hot and fresh to your doorstep within 30 minutes.',
      features: ['30-minute delivery', 'Temperature-controlled packaging', 'Real-time tracking', 'Free delivery over $25'],
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Heart,
      title: 'Event Catering',
      description: 'Perfect for weddings, corporate events, parties, and special occasions of any size.',
      features: ['Custom menu planning', 'Professional setup', 'Experienced staff', 'Equipment rental'],
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const additionalServices = [
    {
      icon: Clock,
      title: 'Advance Ordering',
      description: 'Schedule your orders up to 7 days in advance for special occasions.'
    },
    {
      icon: Users,
      title: 'Group Reservations',
      description: 'Book tables for large groups with special arrangements and menu options.'
    },
    {
      icon: Star,
      title: 'Loyalty Program',
      description: 'Earn points with every order and unlock exclusive discounts and rewards.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From intimate dining experiences to large-scale events, we're here to serve you with excellence and authentic flavors.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-6">
                    <service.icon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-2xl shadow-xl w-full h-96 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              More ways we go above and beyond for our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-4">
                  <service.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
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

      {/* Contact Information */}
      <section className="py-20 bg-yellow-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Experience Our Services?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Contact us today to discuss your dining or catering needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <Phone className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Call Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                +252611777223<br />
                +252611777224<br />
                +252611777225
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Visit Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Mogadishu, Somalia<br />
                Open Daily 8AM - 11PM
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quick Response
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We respond to all inquiries<br />
                within 2 hours during<br />
                business hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Experience the Jazeera Difference
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're dining in, ordering delivery, or planning an event, we're committed to excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
              Book a Table
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-3 rounded-full font-semibold transition-all duration-200">
              Request Catering Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;