import React from 'react';
import { Users, Award, Heart, Clock, MapPin, Star } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Food',
      description: 'Every dish is prepared with love and dedication to authentic flavors'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We believe in bringing people together through great food and hospitality'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Only the finest ingredients and traditional cooking methods'
    },
    {
      icon: Star,
      title: 'Customer First',
      description: 'Your satisfaction and experience is our top priority'
    }
  ];

  const team = [
    {
      name: 'Chef Mohamed Ali',
      position: 'Head Chef',
      experience: '15+ years',
      image: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master of traditional cuisine with modern techniques'
    },
    {
      name: 'Fatima Hassan',
      position: 'Restaurant Manager',
      experience: '10+ years',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ensuring exceptional service and customer satisfaction'
    },
    {
      name: 'Ahmed Omar',
      position: 'Sous Chef',
      experience: '8+ years',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Specialist in grilled dishes and traditional preparations'
    }
  ];

  const achievements = [
    { year: '2010', event: 'Jazeera Restaurant founded' },
    { year: '2012', event: 'Winner of Best New Restaurant Award' },
    { year: '2015', event: 'Expanded to include catering services' },
    { year: '2018', event: 'Launched online ordering and delivery' },
    { year: '2020', event: 'Achieved 5000+ satisfied customers' },
    { year: '2022', event: 'Received Excellence in Service Award' },
    { year: '2024', event: 'Celebrating 14 years of authentic cuisine' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About Jazeera Restaurant
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Since 2010, we've been serving authentic cuisine with passion, dedication, and a commitment to bringing people together through exceptional food and hospitality.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">14+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">5000+</div>
                  <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Restaurant interior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                Jazeera Restaurant was born from a simple dream: to create a place where authentic flavors meet modern hospitality. 
                Founded in 2010 by a family passionate about traditional cuisine, we began our journey with a commitment to preserving 
                culinary heritage while creating new memories.
              </p>
              <p>
                Our name "Jazeera" means "island" in Arabic, representing our restaurant as an oasis of authentic flavors in the heart 
                of the community. We believe that great food has the power to bring people together, create connections, and turn 
                strangers into friends around our tables.
              </p>
              <p>
                Every recipe in our kitchen has been carefully crafted and perfected over the years, combining traditional cooking 
                methods with the finest fresh ingredients. We source locally whenever possible and maintain the highest standards 
                of quality in everything we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-4">
                  <value.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The passionate people behind your exceptional dining experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-yellow-600 font-semibold mb-2">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {member.experience} experience
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Milestones that shaped our story
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-200 dark:bg-yellow-800"></div>
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-sm ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}
                  >
                    <div className="text-yellow-600 font-bold text-lg mb-2">
                      {achievement.year}
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {achievement.event}
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Visit Us Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the warmth of our hospitality and the authenticity of our cuisine
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-6 h-6" />
              <span>Mogadishu, Somalia</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-6 h-6" />
              <span>Daily: 8:00 AM - 11:00 PM</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-6 h-6" />
              <span>5000+ Happy Customers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;