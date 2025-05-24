// components/Footer.tsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const collegeName = "Uday Pratap College";
  return (
    <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-auto text-sm"> {/* Example Tailwind classes */}
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} {collegeName}, Varanasi. All Rights Reserved.</p>
        {/* Add other footer content/links here */}
      </div>
    </footer>
  );
}

export default Footer;
