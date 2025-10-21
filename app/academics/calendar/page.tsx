'use client';

import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDownload, FaBell, FaExclamationTriangle } from 'react-icons/fa';
import SEO from '@/components/SEO';

interface AcademicEvent {
  id: string;
  title: string;
  type: 'exam' | 'holiday' | 'event' | 'deadline' | 'result';
  date: string;
  time?: string;
  location?: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  semester?: number;
  program?: string;
  duration?: string;
  instructions?: string;
}

interface ExamSchedule {
  id: string;
  subject: string;
  code: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  hall: string;
  instructions: string;
  semester: number;
  program: string;
}

const AcademicCalendar: React.FC = () => {
  const [academicEvents, setAcademicEvents] = useState<AcademicEvent[]>([]);
  const [examSchedule, setExamSchedule] = useState<ExamSchedule[]>([]);
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setAcademicEvents([
        {
          id: '1',
          title: 'Mid-term Examinations Begin',
          type: 'exam',
          date: '2024-03-15',
          time: '9:00 AM',
          location: 'Various Halls',
          description: 'Mid-term examinations for all programs begin',
          priority: 'high',
          semester: 3,
          program: 'BCA',
          duration: '2 hours',
          instructions: 'Students must bring their ID cards and admit cards'
        },
        {
          id: '2',
          title: 'Holi Holiday',
          type: 'holiday',
          date: '2024-03-25',
          description: 'College closed for Holi festival',
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Project Submission Deadline',
          type: 'deadline',
          date: '2024-03-20',
          time: '5:00 PM',
          description: 'Final year project submission deadline',
          priority: 'high',
          semester: 6,
          instructions: 'Submit both hard copy and soft copy'
        },
        {
          id: '4',
          title: 'Cultural Festival',
          type: 'event',
          date: '2024-03-30',
          time: '10:00 AM - 6:00 PM',
          location: 'Main Auditorium',
          description: 'Annual cultural festival with competitions and performances',
          priority: 'medium'
        },
        {
          id: '5',
          title: 'Semester Results Declaration',
          type: 'result',
          date: '2024-04-15',
          time: '2:00 PM',
          description: 'Semester examination results will be declared',
          priority: 'high'
        }
      ]);

      setExamSchedule([
        {
          id: '1',
          subject: 'Data Structures and Algorithms',
          code: 'BCA301',
          date: '2024-03-15',
          time: '9:00 AM - 12:00 PM',
          duration: '3 hours',
          location: 'Main Campus',
          hall: 'Hall A',
          instructions: 'Students must bring calculators and ID cards',
          semester: 3,
          program: 'BCA'
        },
        {
          id: '2',
          subject: 'Database Management Systems',
          code: 'BCA302',
          date: '2024-03-18',
          time: '9:00 AM - 12:00 PM',
          duration: '3 hours',
          location: 'Main Campus',
          hall: 'Hall B',
          instructions: 'No calculators allowed',
          semester: 3,
          program: 'BCA'
        },
        {
          id: '3',
          subject: 'Web Development',
          code: 'BCA303',
          date: '2024-03-21',
          time: '2:00 PM - 5:00 PM',
          duration: '3 hours',
          location: 'Computer Lab',
          hall: 'Lab 1',
          instructions: 'Practical examination - bring your own laptop',
          semester: 3,
          program: 'BCA'
        },
        {
          id: '4',
          subject: 'Business Communication',
          code: 'BBA301',
          date: '2024-03-16',
          time: '9:00 AM - 12:00 PM',
          duration: '3 hours',
          location: 'Main Campus',
          hall: 'Hall C',
          instructions: 'Written examination',
          semester: 3,
          program: 'BBA'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const programs = ['all', 'BCA', 'BBA', 'BA'];
  const semesters = [1, 2, 3, 4, 5, 6];
  const eventTypes = [
    { id: 'all', label: 'All Events' },
    { id: 'exam', label: 'Examinations' },
    { id: 'holiday', label: 'Holidays' },
    { id: 'event', label: 'Events' },
    { id: 'deadline', label: 'Deadlines' },
    { id: 'result', label: 'Results' }
  ];

  const filteredEvents = academicEvents.filter(event => {
    const matchesProgram = selectedProgram === 'all' || event.program === selectedProgram;
    const matchesSemester = selectedSemester === null || event.semester === selectedSemester;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesProgram && matchesSemester && matchesType;
  });

  const filteredExams = examSchedule.filter(exam => {
    const matchesProgram = selectedProgram === 'all' || exam.program === selectedProgram;
    const matchesSemester = selectedSemester === null || exam.semester === selectedSemester;
    return matchesProgram && matchesSemester;
  });

  const getTypeColor = (type: string) => {
    const colors = {
      exam: 'bg-red-100 text-red-800',
      holiday: 'bg-green-100 text-green-800',
      event: 'bg-blue-100 text-blue-800',
      deadline: 'bg-orange-100 text-orange-800',
      result: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const upcomingExams = examSchedule.filter(exam => {
    const examDate = new Date(exam.date);
    const today = new Date();
    return examDate >= today;
  }).slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Academic Calendar & Exam Schedule"
        description="View academic calendar, exam schedules, and important dates"
        canonical="/academics/calendar"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-3 text-blue-600" />
                  Academic Calendar & Exam Schedule
                </h1>
                <p className="text-gray-600 mt-1">Stay updated with important academic dates and schedules</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaDownload className="inline mr-2" />
                  Download Calendar
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <FaBell className="inline mr-2" />
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaExclamationTriangle className="text-red-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingExams.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{academicEvents.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaClock className="text-green-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Deadlines</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {academicEvents.filter(event => event.type === 'deadline').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaBell className="text-purple-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {academicEvents.filter(event => event.priority === 'high').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'calendar'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Academic Calendar
                </button>
                <button
                  onClick={() => setActiveTab('exams')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'exams'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Exam Schedule
                </button>
              </nav>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {programs.map(program => (
                    <option key={program} value={program}>
                      {program === 'all' ? 'All Programs' : program}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedSemester || ''}
                  onChange={(e) => setSelectedSemester(e.target.value ? parseInt(e.target.value) : null)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Semesters</option>
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>Semester {semester}</option>
                  ))}
                </select>
                
                {activeTab === 'calendar' && (
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                            {event.priority} priority
                          </span>
                          {event.program && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {event.program} - Sem {event.semester}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      
                      {event.time && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaClock className="mr-2 text-blue-500" />
                          {event.time}
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="mr-2 text-blue-500" />
                          {event.location}
                        </div>
                      )}
                      
                      {event.duration && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaClock className="mr-2 text-blue-500" />
                          Duration: {event.duration}
                        </div>
                      )}
                    </div>

                    {event.instructions && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Important Instructions:</h4>
                        <p className="text-yellow-700 text-sm">{event.instructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Exam Schedule Tab */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              {filteredExams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{exam.subject}</h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {exam.code}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {exam.program} - Sem {exam.semester}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        {new Date(exam.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="mr-2 text-blue-500" />
                        {exam.time}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        {exam.hall}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="mr-2 text-blue-500" />
                        Duration: {exam.duration}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Exam Instructions:</h4>
                      <p className="text-blue-700 text-sm">{exam.instructions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming Exams Alert */}
          {upcomingExams.length > 0 && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FaExclamationTriangle className="text-red-600 text-xl mr-2" />
                <h3 className="text-lg font-semibold text-red-800">Upcoming Exams</h3>
              </div>
              <div className="space-y-2">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex justify-between items-center text-sm">
                    <span className="text-red-700">
                      {exam.subject} ({exam.code}) - {exam.program} Sem {exam.semester}
                    </span>
                    <span className="text-red-600 font-medium">
                      {new Date(exam.date).toLocaleDateString()} at {exam.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AcademicCalendar;
