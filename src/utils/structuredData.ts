// src/utils/structuredData.ts

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Uday Pratap College",
  "alternateName": "UPC",
  "description": "Premier educational institution offering quality education in BA, BBA, and BCA programs",
  "url": "https://udaypratapcollege.com",
  "logo": "https://udaypratapcollege.com/images/logo.png",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "Admissions",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/udaypratapcollege",
    "https://www.linkedin.com/company/udaypratapcollege",
    "https://twitter.com/udaypratapcollege"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Academic Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Bachelor of Arts (BA)",
          "description": "Comprehensive liberal arts program covering various disciplines",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Uday Pratap College"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Bachelor of Business Administration (BBA)",
          "description": "Business management and administration program",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Uday Pratap College"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Bachelor of Computer Applications (BCA)",
          "description": "Computer science and applications program",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Uday Pratap College"
          }
        }
      }
    ]
  }
};

export const courseSchema = (courseName: string, description: string, programType: string) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": courseName,
  "description": description,
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Uday Pratap College",
    "url": "https://udaypratapcollege.com"
  },
  "courseMode": "OnSite",
  "educationalLevel": "Undergraduate",
  "inLanguage": "English",
  "teaches": programType,
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "OnSite",
    "instructor": {
      "@type": "Organization",
      "name": "Uday Pratap College Faculty"
    }
  }
});

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://udaypratapcollege.com${item.url}`
  }))
});

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const webPageSchema = (pageName: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": pageName,
  "description": description,
  "url": `https://udaypratapcollege.com${url}`,
  "isPartOf": {
    "@type": "WebSite",
    "name": "Uday Pratap College",
    "url": "https://udaypratapcollege.com"
  },
  "publisher": {
    "@type": "EducationalOrganization",
    "name": "Uday Pratap College"
  }
});
