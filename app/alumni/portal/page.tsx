'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaSearch, FaFilter, FaPlus, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import SEO from '@/components/SEO';

interface AlumniProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  graduationYear: number;
  program: string;
  currentCompany?: string;
  currentPosition?: string;
  location?: string;
  linkedin?: string;
  bio?: string;
  profileImage?: string;
  achievements?: string[];
  skills?: string[];
  verified: boolean;
}

interface AlumniPost {
  id: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  type: 'update' | 'achievement' | 'job' | 'event';
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  description: string;
  requirements: string[];
  postedBy: string;
  postedDate: string;
  applicationDeadline?: string;
  salary?: string;
}

const AlumniPortal: React.FC = () => {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [posts, setPosts] = useState<AlumniPost[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [activeTab, setActiveTab] = useState('network');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setAlumni([
        {
          id: '1',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@email.com',
          phone: '+91 98765 43210',
          graduationYear: 2020,
          program: 'BCA',
          currentCompany: 'Tech Solutions Pvt Ltd',
          currentPosition: 'Senior Software Developer',
          location: 'Bangalore, India',
          linkedin: 'https://linkedin.com/in/rajeshkumar',
          bio: 'Passionate software developer with 4+ years of experience in web development and cloud technologies.',
          achievements: ['Microsoft Certified Developer', 'Google Cloud Professional'],
          skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Python'],
          verified: true
        },
        {
          id: '2',
          name: 'Priya Sharma',
          email: 'priya.sharma@email.com',
          graduationYear: 2019,
          program: 'BBA',
          currentCompany: 'Global Finance Corp',
          currentPosition: 'Marketing Manager',
          location: 'Mumbai, India',
          linkedin: 'https://linkedin.com/in/priyasharma',
          bio: 'Marketing professional with expertise in digital marketing and brand management.',
          achievements: ['Digital Marketing Certified', 'Brand Management Excellence Award'],
          skills: ['Digital Marketing', 'Brand Management', 'Analytics', 'Social Media'],
          verified: true
        },
        {
          id: '3',
          name: 'Amit Singh',
          email: 'amit.singh@email.com',
          graduationYear: 2021,
          program: 'BCA',
          currentCompany: 'StartupXYZ',
          currentPosition: 'Full Stack Developer',
          location: 'Delhi, India',
          bio: 'Entrepreneur and developer building innovative solutions for the future.',
          achievements: ['Tech Startup Founder', 'Innovation Award Winner'],
          skills: ['Full Stack Development', 'Startup Management', 'UI/UX Design'],
          verified: false
        }
      ]);

      setPosts([
        {
          id: '1',
          authorId: '1',
          authorName: 'Rajesh Kumar',
          content: 'Excited to share that I&apos;ve been promoted to Senior Software Developer at Tech Solutions! Grateful for the journey and looking forward to new challenges.',
          likes: 24,
          comments: 8,
          shares: 3,
          timestamp: '2024-03-01T10:30:00Z',
          type: 'achievement'
        },
        {
          id: '2',
          authorId: '2',
          authorName: 'Priya Sharma',
          content: 'Our college reunion was amazing! It was great catching up with everyone. Thanks to all who made it possible.',
          likes: 18,
          comments: 12,
          shares: 5,
          timestamp: '2024-02-28T15:45:00Z',
          type: 'event'
        },
        {
          id: '3',
          authorId: '3',
          authorName: 'Amit Singh',
          content: 'We&apos;re hiring! Looking for talented developers to join our startup. If you&apos;re passionate about technology and innovation, reach out to me.',
          likes: 15,
          comments: 6,
          shares: 8,
          timestamp: '2024-02-25T09:20:00Z',
          type: 'job'
        }
      ]);

      setJobPostings([
        {
          id: '1',
          title: 'Software Developer',
          company: 'Tech Solutions Pvt Ltd',
          location: 'Bangalore, India',
          type: 'full-time',
          description: 'We are looking for a skilled software developer to join our team. You will be responsible for developing and maintaining web applications.',
          requirements: ['Bachelor&apos;s degree in Computer Science', '2+ years of experience', 'Knowledge of JavaScript, React, Node.js'],
          postedBy: 'Rajesh Kumar',
          postedDate: '2024-03-01',
          applicationDeadline: '2024-03-31',
          salary: '₹8-12 LPA'
        },
        {
          id: '2',
          title: 'Marketing Intern',
          company: 'Global Finance Corp',
          location: 'Mumbai, India',
          type: 'internship',
          description: 'Great opportunity for students to gain hands-on experience in digital marketing and brand management.',
          requirements: ['Currently pursuing BBA/MBA', 'Basic knowledge of marketing concepts', 'Good communication skills'],
          postedBy: 'Priya Sharma',
          postedDate: '2024-02-28',
          applicationDeadline: '2024-03-15',
          salary: '₹15,000/month'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const programs = ['all', 'BCA', 'BBA', 'BA'];
  const years = ['all', '2019', '2020', '2021', '2022', '2023'];

  const filteredAlumni = alumni.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.currentPosition?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === 'all' || person.program === selectedProgram;
    const matchesYear = selectedYear === 'all' || person.graduationYear.toString() === selectedYear;
    return matchesSearch && matchesProgram && matchesYear;
  });

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'internship': 'bg-yellow-100 text-yellow-800',
      'contract': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPostTypeColor = (type: string) => {
    const colors = {
      'update': 'bg-blue-100 text-blue-800',
      'achievement': 'bg-green-100 text-green-800',
      'job': 'bg-orange-100 text-orange-800',
      'event': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
      <SEO
        title="Alumni Portal"
        description="Connect with fellow alumni, share achievements, and explore career opportunities"
        canonical="/alumni/portal"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaGraduationCap className="mr-3 text-blue-600" />
                  Alumni Portal
                </h1>
                <p className="text-gray-600 mt-1">Connect, network, and grow with your fellow alumni</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaPlus className="inline mr-2" />
                  Join Network
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
                {[
                  { id: 'network', label: 'Alumni Network', icon: FaUser },
                  { id: 'feed', label: 'Updates Feed', icon: FaComment },
                  { id: 'jobs', label: 'Job Opportunities', icon: FaBriefcase }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search alumni by name, company, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year === 'all' ? 'All Years' : year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Alumni Network Tab */}
          {activeTab === 'network' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map((person) => (
                <div key={person.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl font-semibold text-gray-600">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{person.name}</h3>
                          {person.verified && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{person.currentPosition}</p>
                        <p className="text-sm text-gray-500">{person.currentCompany}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaGraduationCap className="mr-2 text-blue-500" />
                        {person.program} • {person.graduationYear}
                      </div>
                      
                      {person.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="mr-2 text-blue-500" />
                          {person.location}
                        </div>
                      )}
                    </div>

                    {person.bio && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{person.bio}</p>
                    )}

                    {person.skills && person.skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {person.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {skill}
                            </span>
                          ))}
                          {person.skills.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{person.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Connect
                      </button>
                      <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        <FaEnvelope />
                      </button>
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                          <FaLinkedin className="text-blue-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Updates Feed Tab */}
          {activeTab === 'feed' && (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">
                          {post.authorName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                          <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                            {post.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(post.timestamp).toLocaleDateString()} at {new Date(post.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                          <FaHeart className="mr-1" />
                          {post.likes}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                          <FaComment className="mr-1" />
                          {post.comments}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-green-500 transition-colors">
                          <FaShare className="mr-1" />
                          {post.shares}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Job Opportunities Tab */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              {jobPostings.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                            {job.type}
                          </span>
                          <span className="flex items-center text-sm text-gray-600">
                            <FaMapMarkerAlt className="mr-1 text-blue-500" />
                            {job.location}
                          </span>
                          {job.salary && (
                            <span className="text-sm text-gray-600 font-medium">{job.salary}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <p>Posted by: {job.postedBy}</p>
                        <p>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                        {job.applicationDeadline && (
                          <p>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                        )}
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlumniPortal;
