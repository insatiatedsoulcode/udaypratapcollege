// app/about/page.tsx
import { Metadata } from 'next';

// SEO Metadata
export const metadata: Metadata = {
  title: 'About Us - Uday Pratap College',
  description: 'Learn about Uday Pratap College - our history, mission, vision, and commitment to academic excellence. Discover our leadership, faculty, and educational philosophy.',
  keywords: [
    'about uday pratap college',
    'college history',
    'mission vision',
    'college leadership',
    'principal message',
    'founder message',
    'educational philosophy',
    'academic excellence',
    'college achievements',
    'institutional values'
  ],
  openGraph: {
    title: 'About Us - Uday Pratap College',
    description: 'Learn about our history, mission, vision, and commitment to academic excellence.',
    url: 'https://udaypratapcollege.com/about',
    type: 'website',
    images: ['https://udaypratapcollege.com/images/about/about-banner.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Uday Pratap College',
    description: 'Learn about our history, mission, vision, and commitment to academic excellence.'
  },
  alternates: {
    canonical: 'https://udaypratapcollege.com/about'
  }
};

// --- Data for this page (easy for you to edit) ---
const pageData = {
  hero: {
    title: "Our Story of Excellence and Vision",
    subtitle: "Rooted in tradition, committed to the future of education.",
    imageUrl: "/images/about/about-banner.jpg",
  },
  stats: [
    { value: 1200, label: "Students Enrolled", suffix: "+" },
    { value: 8, label: "UG & PG Programs", suffix: "" },
    { value: 95, label: "Placement Rate", suffix: "%" },
    { value: 50, label: "Expert Faculty", suffix: "+" },
  ],
  principalsMessage: {
    name: "Shri Yogendra Pratap Singh",
    title: "Principal, Uday Pratap College",
    message: "Welcome to Uday Pratap College! Our journey began with a commitment to providing accessible, high-quality education that empowers the next generation. We focus on a blend of academic rigor, research-driven learning, and holistic development to prepare our students not just for a career, but for life.",
    imageUrl: "/images/about/principal.jpg",
  },
  foundersMessage: {
    name: "Shri Surendra Pratap Singh",
    title: "Founder & Chairman",
    message: "From day one, our vision was to create an institution that would not only impart knowledge but also build character. We believe in nurturing talent from every corner of society and providing them with the platform to achieve greatness. Our commitment to research and innovation is unwavering, as we strive to contribute to the nation's progress.",
    imageUrl: "/images/about/founder.jpg",
  },
  historyMilestones: [
    { year: "2020", event: "Introduced Bachelor of Computer Applications (BCA) to meet growing tech demands." },
    { year: "2022", event: "First batch graduates with a record placement rate, establishing our academic excellence." },
    { year: "2024", event: "Inaugurated the new R&D lab to foster a culture of innovation and research among students." },
  ],
  whyChooseUs: [
    { icon: "FaBook", title: "Modern Curriculum", description: "Our courses are updated with a focus on R&D and industry relevance." },
    { icon: "FaUsers", title: "Expert Faculty", description: "Benefit from our partnerships for internships and placements." },
    { icon: "FaLightbulb", title: "Innovation Focus", description: "We encourage a culture of research, discovery, and entrepreneurship." },
    { icon: "FaIndustry", title: "Strong Industry Links", description: "Learn from experienced academics and researchers dedicated to mentorship." },
  ]
};
// --- End of Data ---

// Import the client component
import AboutUsClient from './AboutUsClient';

const AboutUsPage = () => {
  return <AboutUsClient pageData={pageData} />;
};

export default AboutUsPage;
