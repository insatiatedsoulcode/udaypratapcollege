'use client';

import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser, FaEye, FaDownload, FaFilter, FaSearch } from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: 'academic' | 'cultural' | 'sports' | 'workshop' | 'conference';
  image: string;
  registrationRequired: boolean;
  registrationLink?: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  category: 'general' | 'academic' | 'sports' | 'achievements';
  image?: string;
  featured: boolean;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [activeTab, setActiveTab] = useState('events');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setEvents([
        {
          id: '1',
          title: 'Annual Cultural Festival 2024',
          description: 'Join us for our annual cultural festival featuring dance, music, drama, and art exhibitions. Students from all departments will showcase their talents.',
          date: '2024-03-20',
          time: '10:00 AM - 6:00 PM',
          location: 'Main Auditorium',
          organizer: 'Cultural Committee',
          category: 'cultural',
          image: '/images/cultural-festival.jpg',
          registrationRequired: true,
          registrationLink: '/events/register/1',
          maxParticipants: 500,
          currentParticipants: 350,
          status: 'upcoming'
        },
        {
          id: '2',
          title: 'Tech Workshop: Introduction to AI',
          description: 'Learn the fundamentals of Artificial Intelligence and Machine Learning in this hands-on workshop conducted by industry experts.',
          date: '2024-03-15',
          time: '2:00 PM - 5:00 PM',
          location: 'Computer Lab 2',
          organizer: 'Computer Science Department',
          category: 'workshop',
          image: '/images/ai-workshop.jpg',
          registrationRequired: true,
          registrationLink: '/events/register/2',
          maxParticipants: 30,
          currentParticipants: 25,
          status: 'upcoming'
        },
        {
          id: '3',
          title: 'Inter-College Sports Tournament',
          description: 'Annual sports tournament featuring cricket, football, basketball, and athletics competitions.',
          date: '2024-03-10',
          time: '8:00 AM - 5:00 PM',
          location: 'Sports Complex',
          organizer: 'Sports Committee',
          category: 'sports',
          image: '/images/sports-tournament.jpg',
          registrationRequired: false,
          maxParticipants: 200,
          currentParticipants: 180,
          status: 'upcoming'
        },
        {
          id: '4',
          title: 'Academic Conference 2024',
          description: 'Annual academic conference showcasing research papers and projects from students and faculty across all departments.',
          date: '2024-02-28',
          time: '9:00 AM - 4:00 PM',
          location: 'Conference Hall',
          organizer: 'Academic Committee',
          category: 'conference',
          image: '/images/academic-conference.jpg',
          registrationRequired: true,
          registrationLink: '/events/register/4',
          maxParticipants: 100,
          currentParticipants: 85,
          status: 'completed'
        }
      ]);

      setNews([
        {
          id: '1',
          title: 'Uday Pratap College Ranked Among Top 50 Colleges in UP',
          content: 'We are proud to announce that Uday Pratap College has been ranked among the top 50 colleges in Uttar Pradesh by the Education Ministry...',
          author: 'Dr. Rajesh Kumar',
          publishDate: '2024-03-01',
          category: 'achievements',
          image: '/images/ranking-news.jpg',
          featured: true
        },
        {
          id: '2',
          title: 'New Computer Lab Inaugurated',
          content: 'The new state-of-the-art computer lab with 50 high-end machines has been inaugurated by the Principal. The lab features the latest technology...',
          author: 'Prof. Priya Sharma',
          publishDate: '2024-02-25',
          category: 'academic',
          featured: false
        },
        {
          id: '3',
          title: 'Students Win National Debate Competition',
          content: 'Our students have secured the first position in the National Inter-College Debate Competition held in Delhi. The team consisted of...',
          author: 'Dr. Amit Singh',
          publishDate: '2024-02-20',
          category: 'achievements',
          featured: true
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'academic', label: 'Academic' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'sports', label: 'Sports' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'conference', label: 'Conference' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      cultural: 'bg-purple-100 text-purple-800',
      sports: 'bg-green-100 text-green-800',
      workshop: 'bg-orange-100 text-orange-800',
      conference: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: 'bg-green-100 text-green-800',
      ongoing: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-3 text-blue-600" />
                  Events & News
                </h1>
                <p className="text-gray-600 mt-1">Stay updated with campus activities and announcements</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaDownload className="inline mr-2" />
                  Download Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'events'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Events
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'news'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  News & Updates
                </button>
              </nav>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={activeTab === 'events' ? 'Search events...' : 'Search news...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {activeTab === 'events' && (
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <FaFilter className="mr-2" />
                    Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="mr-2 text-blue-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaUser className="mr-2 text-blue-500" />
                        {event.organizer}
                      </div>
                    </div>

                    {event.registrationRequired && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Participants</span>
                          <span>{event.currentParticipants}/{event.maxParticipants}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(event.currentParticipants / (event.maxParticipants || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                        <FaEye className="mr-1" />
                        View Details
                      </button>
                      
                      {event.registrationRequired && event.status === 'upcoming' && (
                        <button className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              {/* Featured News */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredNews.filter(article => article.featured).map((article) => (
                    <div key={article.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(article.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">By {article.author}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Read More →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All News */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">All News</h2>
                <div className="space-y-4">
                  {filteredNews.filter(article => !article.featured).map((article) => (
                    <div key={article.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(article.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">By {article.author}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Read More →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
