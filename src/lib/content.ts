// Types for our content structure
export interface CollegeInfo {
  name: string;
  tagline: string;
  description: string;
  established: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

export interface CollegeStats {
  students: number;
  faculty: number;
  placementRate: number;
  programs: number;
  alumni: number;
  yearsOfExcellence: number;
}

export interface Program {
  id: string;
  name: string;
  shortName: string;
  duration: string;
  description: string;
  color: string;
  subjects: string[];
  careerOptions: string[];
  eligibility: string;
  fees: {
    annual: number;
    total: number;
  };
  highlights: string[];
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  specialization: string;
  email: string;
  image: string;
  bio: string;
  achievements: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  image: string;
  location: string;
  time: string;
  featured: boolean;
}

export interface Notification {
  id: string;
  text: string;
  link: string;
  type: string;
  active: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  images: string[];
}

export interface ContentData {
  college: CollegeInfo;
  stats: CollegeStats;
  programs: Program[];
  faculty: Faculty[];
  events: Event[];
  notifications: Notification[];
  features: Feature[];
  gallery: {
    categories: GalleryCategory[];
  };
}

// Static content data (moved from JSON for client-side compatibility)
const staticContent: ContentData = {
  college: {
    name: "Uday Pratap College",
    tagline: "Excellence in Education",
    description: "Premier educational institution offering BA, BBA, and BCA programs with academic excellence and modern facilities.",
    established: "2010",
    location: "Varanasi, Uttar Pradesh",
    contact: {
      phone: "+91-12345-67890",
      email: "info@udaypratapcollege.com",
      address: "123 Education Street, Varanasi, UP 221001"
    },
    social: {
      facebook: "https://www.facebook.com/udaypratapcollege",
      twitter: "https://www.twitter.com/udaypratapcollege",
      instagram: "https://www.instagram.com/udaypratapcollege",
      linkedin: "https://www.linkedin.com/company/udaypratapcollege",
      youtube: "https://www.youtube.com/udaypratapcollege"
    }
  },
  stats: {
    students: 500,
    faculty: 15,
    placementRate: 95,
    programs: 3,
    alumni: 1200,
    yearsOfExcellence: 14
  },
  programs: [
    {
      id: "ba",
      name: "Bachelor of Arts",
      shortName: "BA",
      duration: "3 Years",
      description: "Explore diverse subjects and develop critical thinking skills in our comprehensive liberal arts program.",
      color: "blue",
      subjects: ["English Literature", "History", "Political Science", "Economics", "Psychology", "Sociology"],
      careerOptions: ["Civil Services", "Journalism", "Teaching", "Social Work", "Public Administration"],
      eligibility: "10+2 or equivalent from any recognized board",
      fees: {
        annual: 25000,
        total: 75000
      },
      highlights: [
        "Comprehensive curriculum covering humanities and social sciences",
        "Experienced faculty with research background",
        "Regular seminars and workshops",
        "Library with extensive collection",
        "Placement assistance"
      ]
    },
    {
      id: "bba",
      name: "Bachelor of Business Administration",
      shortName: "BBA",
      duration: "3 Years",
      description: "Develop leadership skills and business acumen to excel in the corporate world.",
      color: "green",
      subjects: ["Business Management", "Marketing", "Finance", "Human Resources", "Operations", "Entrepreneurship"],
      careerOptions: ["Business Analyst", "Marketing Manager", "HR Specialist", "Operations Manager", "Entrepreneur"],
      eligibility: "10+2 or equivalent from any recognized board",
      fees: {
        annual: 35000,
        total: 105000
      },
      highlights: [
        "Industry-relevant curriculum",
        "Guest lectures from industry experts",
        "Internship opportunities",
        "Case study methodology",
        "Strong placement record"
      ]
    },
    {
      id: "bca",
      name: "Bachelor of Computer Applications",
      shortName: "BCA",
      duration: "3 Years",
      description: "Master cutting-edge technology and programming skills for the digital age.",
      color: "purple",
      subjects: ["Programming", "Database Management", "Web Development", "Software Engineering", "Data Structures", "Computer Networks"],
      careerOptions: ["Software Developer", "Web Developer", "Database Administrator", "System Analyst", "IT Consultant"],
      eligibility: "10+2 or equivalent with Mathematics",
      fees: {
        annual: 40000,
        total: 120000
      },
      highlights: [
        "Modern computer labs with latest technology",
        "Industry-standard software and tools",
        "Project-based learning",
        "Industry partnerships",
        "Excellent placement opportunities"
      ]
    }
  ],
  faculty: [
    {
      id: "faculty-1",
      name: "Dr. Rajesh Kumar",
      designation: "Principal",
      department: "Administration",
      qualification: "Ph.D. in Education",
      experience: "20+ years",
      specialization: "Educational Leadership",
      email: "principal@udaypratapcollege.com",
      image: "/images/faculty/principal.jpg",
      bio: "Dr. Rajesh Kumar has been leading the institution with vision and dedication for over 15 years.",
      achievements: [
        "Published 25+ research papers",
        "Awarded Best Principal 2023",
        "Member of UGC Committee"
      ]
    },
    {
      id: "faculty-2",
      name: "Prof. Sunita Sharma",
      designation: "Head of Department",
      department: "Computer Science",
      qualification: "M.Tech in Computer Science",
      experience: "15+ years",
      specialization: "Software Engineering",
      email: "sunita.sharma@udaypratapcollege.com",
      image: "/images/faculty/sunita-sharma.jpg",
      bio: "Prof. Sunita Sharma is an expert in software engineering with extensive industry experience.",
      achievements: [
        "Industry experience with TCS",
        "Certified in multiple technologies",
        "Mentored 100+ students"
      ]
    },
    {
      id: "faculty-3",
      name: "Dr. Amit Verma",
      designation: "Associate Professor",
      department: "Business Administration",
      qualification: "Ph.D. in Management",
      experience: "12+ years",
      specialization: "Marketing Management",
      email: "amit.verma@udaypratapcollege.com",
      image: "/images/faculty/amit-verma.jpg",
      bio: "Dr. Amit Verma specializes in marketing strategies and consumer behavior.",
      achievements: [
        "Consultant for 10+ companies",
        "Published in top journals",
        "Guest speaker at conferences"
      ]
    }
  ],
  events: [
    {
      id: "event-1",
      title: "Annual Sports Meet",
      date: "2024-12-15",
      type: "sports",
      description: "Annual sports meet featuring various athletic competitions and cultural events.",
      image: "/images/events/sports-meet.jpg",
      location: "College Ground",
      time: "9:00 AM - 5:00 PM",
      featured: true
    },
    {
      id: "event-2",
      title: "Tech Fest 2024",
      date: "2024-12-20",
      type: "academic",
      description: "Annual technology festival showcasing student projects and innovations.",
      image: "/images/events/tech-fest.jpg",
      location: "Computer Lab",
      time: "10:00 AM - 4:00 PM",
      featured: true
    },
    {
      id: "event-3",
      title: "Cultural Night",
      date: "2024-12-25",
      type: "cultural",
      description: "Annual cultural night featuring music, dance, and drama performances.",
      image: "/images/events/cultural-night.jpg",
      location: "Auditorium",
      time: "6:00 PM - 10:00 PM",
      featured: false
    }
  ],
  notifications: [
    {
      id: "notif-1",
      text: "Admissions for 2025-26 are now open!",
      link: "/admissions",
      type: "admission",
      active: true
    },
    {
      id: "notif-2",
      text: "Annual Sports Meet on Dec 15th.",
      link: "/events/sports-meet",
      type: "event",
      active: true
    },
    {
      id: "notif-3",
      text: "Results for the 3rd Semester have been declared.",
      link: "/results",
      type: "academic",
      active: true
    }
  ],
  features: [
    {
      id: "feature-1",
      title: "Quality Education",
      description: "Comprehensive curriculum designed by industry experts and experienced faculty.",
      icon: "book",
      color: "blue"
    },
    {
      id: "feature-2",
      title: "Experienced Faculty",
      description: "Learn from qualified professors with years of teaching and industry experience.",
      icon: "users",
      color: "green"
    },
    {
      id: "feature-3",
      title: "Modern Facilities",
      description: "State-of-the-art infrastructure with modern classrooms, labs, and library.",
      icon: "building",
      color: "purple"
    },
    {
      id: "feature-4",
      title: "Placement Support",
      description: "Dedicated placement cell to help students secure promising career opportunities.",
      icon: "briefcase",
      color: "yellow"
    },
    {
      id: "feature-5",
      title: "Student Support",
      description: "Comprehensive support services including counseling, mentoring, and career guidance.",
      icon: "heart",
      color: "red"
    },
    {
      id: "feature-6",
      title: "Innovation",
      description: "Embracing modern teaching methods and technology-enhanced learning experiences.",
      icon: "lightning",
      color: "indigo"
    }
  ],
  gallery: {
    categories: [
      {
        id: "campus",
        name: "Campus Life",
        images: [
          "/images/gallery/campus-1.jpg",
          "/images/gallery/campus-2.jpg",
          "/images/gallery/campus-3.jpg"
        ]
      },
      {
        id: "events",
        name: "Events",
        images: [
          "/images/gallery/event-1.jpg",
          "/images/gallery/event-2.jpg",
          "/images/gallery/event-3.jpg"
        ]
      },
      {
        id: "facilities",
        name: "Facilities",
        images: [
          "/images/gallery/facility-1.jpg",
          "/images/gallery/facility-2.jpg",
          "/images/gallery/facility-3.jpg"
        ]
      }
    ]
  }
};

// Function to load content (now returns static data)
export function loadContent(): ContentData {
  return staticContent;
}

// Default content fallback
export function getDefaultContent(): ContentData {
  return {
    college: {
      name: "Uday Pratap College",
      tagline: "Excellence in Education",
      description: "Premier educational institution offering quality education.",
      established: "2010",
      location: "Varanasi, Uttar Pradesh",
      contact: {
        phone: "+91-12345-67890",
        email: "info@udaypratapcollege.com",
        address: "123 Education Street, Varanasi, UP 221001"
      },
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
        youtube: "#"
      }
    },
    stats: {
      students: 500,
      faculty: 15,
      placementRate: 95,
      programs: 3,
      alumni: 1200,
      yearsOfExcellence: 14
    },
    programs: [],
    faculty: [],
    events: [],
    notifications: [],
    features: [],
    gallery: {
      categories: []
    }
  };
}

// Helper functions to get specific data
export function getCollegeInfo(): CollegeInfo {
  return loadContent().college;
}

export function getCollegeStats(): CollegeStats {
  return loadContent().stats;
}

export function getPrograms(): Program[] {
  return loadContent().programs;
}

export function getProgramById(id: string): Program | undefined {
  return getPrograms().find(program => program.id === id);
}

export function getFaculty(): Faculty[] {
  return loadContent().faculty;
}

export function getFacultyById(id: string): Faculty | undefined {
  return getFaculty().find(faculty => faculty.id === id);
}

export function getEvents(): Event[] {
  return loadContent().events;
}

export function getFeaturedEvents(): Event[] {
  return getEvents().filter(event => event.featured);
}

export function getNotifications(): Notification[] {
  return loadContent().notifications.filter(notification => notification.active);
}

export function getFeatures(): Feature[] {
  return loadContent().features;
}

export function getGalleryCategories(): GalleryCategory[] {
  return loadContent().gallery.categories;
}

// Function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Function to get program color classes
export function getProgramColorClasses(color: string): {
  bg: string;
  text: string;
  border: string;
  hover: string;
} {
  const colorMap = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-600'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:bg-green-600'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:bg-purple-600'
    }
  };
  
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
}

// Function to get feature icon classes
export function getFeatureIconClasses(color: string): {
  bg: string;
  text: string;
} {
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' }
  };
  
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
}
