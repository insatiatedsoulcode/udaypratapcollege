// src/components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const famousQuotes = [
  { text: "Be the change you wish to see.", author: "Mahatma Gandhi" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Vision without execution is just hallucination.", author: "Henry Ford" },
  { text: "Learn from yesterday, live for today.", author: "Albert Einstein" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou" },
  { text: "Never, never, never give up.", author: "Winston Churchill" },
  { text: "Strength is Life, Weakness is Death.", author: "Swami Vivekananda" },
  { text: "Dream, dream, dream.", author: "Dr. A.P.J. Abdul Kalam" },
  { text: "Know thyself.", author: "Socrates" }
];

const mainNavLinks = [
  { href: "/", label: "Home", exact: true },
  {
    href: "/about",
    label: "About Us",
    hasDropdown: true,
    dropdownLinks: [ { href: "/about/mission-vision", label: "Mission and Vision" } ]
  },
  {
    href: "/academics",
    label: "Academics",
    hasDropdown: true,
    dropdownLinks: [
      { href: "/academics/programs", label: "Programs Offered"},
      { href: "/academics/faculty", label: "Our Faculty" }
    ]
  },
  {
    href: "/admissions",
    label: "Admissions",
    hasDropdown: true,
    dropdownLinks: [
      { href: "/admissions/how-to-apply", label: "How to Apply"},
      { href: "/admissions/fee-structure", label: "Fee Structure" }
    ]
  },
  {
    href: "/student-life",
    label: "Student Life",
    hasDropdown: true,
    dropdownLinks: [ { href: "/student-life/facilities", label: "Facilities" } ]
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact-us", label: "Contact Us" },
];

type DropdownLink = { href: string; label: string; };
type MainNavLink = { href: string; label: string; exact?: boolean; hasDropdown?: boolean; dropdownLinks?: DropdownLink[]; };

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setOpenMobileSubmenus({});
    }
  };

  const toggleMobileSubmenu = (href: string) => {
    setOpenMobileSubmenus(prevState => ({ ...prevState, [href]: !prevState[href] }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % famousQuotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setOpenMobileSubmenus({});
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- NavLinkItem component updated to remove unused prop ---
  const NavLinkItem = ({ href, label, exact, hasDropdown, isMobile = false }: MainNavLink & { isMobile?: boolean }) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href) && (href !== "/" || pathname === "/");
    const isSubmenuOpenForThisItem = isMobile && hasDropdown && !!openMobileSubmenus[href];

    const handleClick = (e: React.MouseEvent) => {
      if (isMobile && hasDropdown) {
        e.preventDefault();
        toggleMobileSubmenu(href);
      } else if (isMobile) {
        setIsMobileMenuOpen(false);
        setOpenMobileSubmenus({});
      }
    };

    // For mobile links that have a dropdown, we render a special layout
    if (isMobile && hasDropdown) {
      return (
        <div className="flex justify-between items-center w-full px-2 py-2">
          <Link
            href={href}
            onClick={() => { setIsMobileMenuOpen(false); setOpenMobileSubmenus({}); }}
            className={`text-sm font-medium transition-colors ${isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-500'}`}
          >
            {label}
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMobileSubmenu(href); }}
            className="p-2 -mr-2"
            aria-label={`Toggle ${label} submenu`}
          >
            <FaChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${isSubmenuOpenForThisItem ? 'rotate-180' : ''}`} />
          </button>
        </div>
      );
    }

    // Original logic for desktop links and simple mobile links
    return (
      <Link
        href={href}
        onClick={() => { if (isMobile) setIsMobileMenuOpen(false); }}
        className={`px-2 py-2 text-sm font-medium transition-all duration-150 ease-in-out relative flex items-center ${isMobile ? 'justify-between w-full' : 'group'} ${isActive ? 'text-orange-700' : 'text-gray-700 hover:text-orange-600'} focus:outline-none focus:ring-1 focus:ring-orange-400 rounded-sm`}
        aria-current={isActive ? 'page' : undefined}
      >
        <span>{label}</span>
        {hasDropdown && (
          <FaChevronDown className={`ml-1.5 h-3 w-3 transition-transform duration-200 group-hover:rotate-180 ${isActive ? 'text-orange-600' : 'text-gray-500 group-hover:text-orange-500'}`} />
        )}
        {!isMobile && (
          <span className={`absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left ${isActive ? 'scale-x-100 bg-orange-600' : 'bg-orange-500'}`}></span>
        )}
      </Link>
    );
  };

  const currentQuote = famousQuotes[currentQuoteIndex];

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-40 relative">
      <div className="container mx-auto px-4 flex justify-between items-center py-3 min-h-[70px]">
        {showSearch ? (
          <motion.div
            key="search-bar"
            initial={{ opacity: 0, width: '50%' }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
              <FaSearch className="h-4 w-4 text-gray-400 mr-3" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the site and press Enter..."
                className="flex-grow bg-transparent border-none text-sm focus:outline-none focus:ring-0"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                aria-label="Close Search"
                className="text-gray-500 hover:text-gray-800 p-1 rounded-full"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="default-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-between items-center"
          >
            <div className="quote-container flex-shrink-0 max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  {currentQuote && (
                    <blockquote className="text-xs">
                      <p className="text-sm font-bold text-black not-italic">&quot;{currentQuote.text}&quot;</p>
                      <cite className="block text-right italic text-gray-500 text-xs mt-1">- {currentQuote.author}</cite>
                    </blockquote>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <nav>
                <ul className="flex space-x-1 lg:space-x-2">
                  {mainNavLinks.map((linkItem) => (
                    <li key={linkItem.href} className="relative group">
                      <NavLinkItem {...linkItem} isMobile={false} />
                      {linkItem.hasDropdown && linkItem.dropdownLinks && (
                        <div className="absolute left-0 mt-1 w-60 origin-top-left bg-white border border-gray-200 rounded-md shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 ease-out z-50 group-hover:animate-fadeIn">
                          <div className="py-1 divide-y divide-gray-100">
                            {linkItem.dropdownLinks.map((subLink) => (
                              <Link key={subLink.href} href={subLink.href} className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 w-full text-left transition-colors duration-150">
                                {subLink.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <button onClick={() => setShowSearch(true)} aria-label="Open Search" className="text-gray-600 hover:text-orange-500 p-1 rounded-md">
                <FaSearch className="h-4 w-4" />
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-orange-500 p-1 rounded-md"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-gray-200 bg-white shadow-lg absolute top-full left-0 right-0 z-30 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-3">
              <ul className="flex flex-col space-y-1">
                {mainNavLinks.map(linkItem => (
                  <li key={linkItem.href}>
                    <NavLinkItem {...linkItem} isMobile={true} />
                    {linkItem.hasDropdown && linkItem.dropdownLinks && openMobileSubmenus[linkItem.href] && (
                      <ul className="pl-5 mt-1 mb-2 space-y-1 border-l border-gray-200 ml-2 py-1">
                        {linkItem.dropdownLinks.map(subLink => (
                          <li key={subLink.href}>
                            <Link
                              href={subLink.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenMobileSubmenus({});
                              }}
                              className="block px-3 py-2 text-xs text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
                            >
                              {subLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
