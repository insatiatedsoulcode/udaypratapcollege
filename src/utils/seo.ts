// src/utils/seo.ts

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export const generateSEOTags = (config: SEOConfig) => {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage = '/images/og-image.jpg',
    ogType = 'website',
    noindex = false,
    nofollow = false,
  } = config;

  const fullTitle = title.includes('Uday Pratap College') 
    ? title 
    : `${title} | Uday Pratap College`;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    canonical: canonical || 'https://udaypratapcollege.com',
    ogImage,
    ogType,
    robots: robotsContent,
  };
};

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: 'Uday Pratap College - Premier Educational Institution',
    description: 'Join Uday Pratap College for quality education in BA, BBA, and BCA programs. Modern facilities, experienced faculty, and excellent placement opportunities.',
    keywords: [
      'college',
      'education',
      'BA program',
      'BBA program',
      'BCA program',
      'admissions',
      'Uday Pratap College',
      'higher education',
      'academic excellence',
      'college application'
    ],
  },
  
  academics: {
    title: 'Academic Programs - BA, BBA, BCA Courses',
    description: 'Explore our comprehensive academic programs including Bachelor of Arts (BA), Bachelor of Business Administration (BBA), and Bachelor of Computer Applications (BCA).',
    keywords: [
      'academic programs',
      'BA course',
      'BBA course',
      'BCA course',
      'undergraduate programs',
      'college courses',
      'higher education',
      'curriculum'
    ],
  },
  
  admissions: {
    title: 'Admissions - Apply to Uday Pratap College',
    description: 'Apply to Uday Pratap College for BA, BBA, and BCA programs. Learn about admission requirements, application process, and fee structure.',
    keywords: [
      'college admissions',
      'apply online',
      'BA admission',
      'BBA admission',
      'BCA admission',
      'college application',
      'admission requirements',
      'fee structure'
    ],
  },
  
  about: {
    title: 'About Us - Uday Pratap College',
    description: 'Learn about Uday Pratap College\'s mission, vision, and commitment to providing quality education and academic excellence.',
    keywords: [
      'about college',
      'mission vision',
      'college history',
      'educational institution',
      'academic excellence',
      'college values'
    ],
  },
  
  contact: {
    title: 'Contact Us - Uday Pratap College',
    description: 'Get in touch with Uday Pratap College. Contact information, location, and inquiry form for admissions and general queries.',
    keywords: [
      'contact college',
      'college contact',
      'admission inquiry',
      'college location',
      'phone number',
      'email contact'
    ],
  },
};

// Function to get SEO config by page type
export const getSEOConfig = (pageType: keyof typeof seoConfigs, customTitle?: string, customDescription?: string) => {
  const baseConfig = seoConfigs[pageType];
  
  return {
    ...baseConfig,
    title: customTitle || baseConfig.title,
    description: customDescription || baseConfig.description,
  };
};
