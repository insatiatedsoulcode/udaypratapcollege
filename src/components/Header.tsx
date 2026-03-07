// src/components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


const quoteCategories = {
  all: [
    { text: "Be the change you wish to see.", author: "Mahatma Gandhi", category: "indian" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs", category: "global" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", category: "global" },
    { text: "Vision without execution is just hallucination.", author: "Henry Ford", category: "global" },
    { text: "Learn from yesterday, live for today.", author: "Albert Einstein", category: "global" },
    { text: "Nothing will work unless you do.", author: "Maya Angelou", category: "global" },
    { text: "Never, never, never give up.", author: "Winston Churchill", category: "global" },
    { text: "Strength is Life, Weakness is Death.", author: "Swami Vivekananda", category: "indian" },
    { text: "Dream, dream, dream.", author: "Dr. A.P.J. Abdul Kalam", category: "indian" },
    { text: "Know thyself.", author: "Socrates", category: "global" }
  ],
  indian: [
    { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "Strength is Life, Weakness is Death.", author: "Swami Vivekananda" },
    { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "Dr. A.P.J. Abdul Kalam" },
    { text: "In a day, when you don't come across any problems, you can be sure that you are travelling in a wrong path.", author: "Swami Vivekananda" },
    { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
    { text: "Take up one idea. Make that one idea your life. Think of it, dream of it, live on that idea.", author: "Swami Vivekananda" },
    { text: "Learning gives creativity, Creativity leads to thinking, Thinking provides knowledge, Knowledge makes you great.", author: "Dr. A.P.J. Abdul Kalam" },
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "Arise, awake and stop not until the goal is reached.", author: "Swami Vivekananda" },
    { text: "Excellence is a continuous process and not an accident.", author: "Dr. A.P.J. Abdul Kalam" }
  ],
  hindiWriters: [
    { text: "कर्म करो, फल की इच्छा मत करो।", author: "भगवद गीता" },
    { text: "जो बीत गई सो बात गई।", author: "हरिवंश राय बच्चन" },
    { text: "मन के हारे हार है, मन के जीते जीत।", author: "रहीम दास" },
    { text: "कोशिश करने वालों की कभी हार नहीं होती।", author: "हरिवंश राय बच्चन" },
    { text: "विद्या ददाति विनयं, विनयाद् याति पात्रताम्।", author: "संस्कृत सुभाषित" },
    { text: "अपने सपनों को पूरा करने का सबसे अच्छा तरीका है जागना।", author: "प्रेमचंद" },
    { text: "जीवन में सफलता का रहस्य है - निरंतर प्रयास।", author: "सुभाष चंद्र बोस" },
    { text: "शिक्षा सबसे शक्तिशाली हथियार है।", author: "डॉ. भीमराव अंबेडकर" },
    { text: "कर्म ही पूजा है।", author: "तुलसीदास" },
    { text: "ज्ञान ही सच्ची संपत्ति है।", author: "कबीर दास" }
  ]
};

const mainNavLinks = [
  { href: "/", label: "Home", exact: true },
  {
    href: "/about",
    label: "About",
    hasDropdown: true,
    dropdownLinks: [{ href: "/about/mission-vision", label: "Mission & Vision" }]
  },
  {
    href: "/academics",
    label: "Academics",
    hasDropdown: true,
    dropdownLinks: [
      { href: "/academics/programs", label: "Programs" },
      { href: "/academics/faculty", label: "Faculty" },
      { href: "/academics/calendar", label: "Calendar" }
    ]
  },
  {
    href: "/admissions",
    label: "Admissions",
    hasDropdown: true,
    dropdownLinks: [
      { href: "/admissions/how-to-apply", label: "How to Apply" },
      { href: "/admissions/fee-structure", label: "Fee Structure" },
      { href: "/admissions/online", label: "Apply Online" }
    ]
  },
  {
    href: "/student-life",
    label: "Student Life",
    hasDropdown: true,
    dropdownLinks: [
      { href: "/student-life/facilities", label: "Facilities" }
    ]
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/alumni/portal", label: "Alumni" },
  { href: "/contact-us", label: "Contact" },
];

type DropdownLink = { href: string; label: string; };
type MainNavLink = { href: string; label: string; exact?: boolean; hasDropdown?: boolean; dropdownLinks?: DropdownLink[]; };

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMounted, setHasMounted] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState<'all' | 'indian' | 'hindiWriters'>('all');

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
    setHasMounted(true);
    const currentQuotes = quoteCategories[quoteCategory];
    const timer = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % currentQuotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [quoteCategory]);

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

  const NavLinkItem = ({ href, label, exact, hasDropdown, isMobile = false }: MainNavLink & { isMobile?: boolean }) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href) && (href !== "/" || pathname === "/");
    const isSubmenuOpenForThisItem = isMobile && hasDropdown && !!openMobileSubmenus[href];

    if (isMobile && hasDropdown) {
      return (
        <div className="flex justify-between items-center w-full px-3 py-3">
          <Link
            href={href}
            onClick={() => { setIsMobileMenuOpen(false); setOpenMobileSubmenus({}); }}
            className={`text-sm font-semibold transition-all duration-200 ${isActive ? 'text-blue-300' : 'text-white hover:text-blue-200'}`}
          >
            {label}
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMobileSubmenu(href); }}
            className="p-2 -mr-2 text-white/70 hover:text-blue-300 transition-colors"
            aria-label={`Toggle ${label} submenu`}
          >
            <FaChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSubmenuOpenForThisItem ? 'rotate-180' : ''}`} />
          </button>
        </div>
      );
    }

    return (
      <Link
        href={href}
        onClick={() => { if (isMobile) setIsMobileMenuOpen(false); }}
        className={`px-3 py-2.5 text-xs font-semibold transition-all duration-200 ease-in-out relative flex items-center ${isMobile ? 'justify-between w-full' : 'group'} ${isActive ? 'text-blue-300 bg-white/10' : 'text-white/90 hover:text-blue-200 hover:bg-white/5'} focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-lg backdrop-blur-sm`}
        aria-current={isActive ? 'page' : undefined}
      >
        <span>{label}</span>
        {hasDropdown && (
          <FaChevronDown className={`ml-1.5 h-2.5 w-2.5 transition-transform duration-200 group-hover:rotate-180 ${isActive ? 'text-blue-300' : 'text-white/70 group-hover:text-blue-200'}`} />
        )}
        {!isMobile && (
          <span className={`absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full ${isActive ? 'scale-x-100 bg-blue-300' : 'bg-blue-200'}`}></span>
        )}
      </Link>
    );
  };

  const currentQuotes = quoteCategories[quoteCategory];
  const currentQuote = currentQuotes[currentQuoteIndex];

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl sticky top-0 z-40 relative border-b-4 border-blue-400">
      {/* Top Navigation Bar */}
      <div className="container mx-auto px-6 flex justify-between items-center py-4 min-h-[80px]">
        {showSearch ? (
          <motion.div
            key="search-bar"
            initial={{ opacity: 0, width: '50%' }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <FaSearch className="h-5 w-5 text-blue-300 mr-3" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the site and press Enter..."
                className="flex-grow bg-transparent border-none text-white placeholder-white/70 text-sm focus:outline-none focus:ring-0"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                aria-label="Close Search"
                className="text-white/70 hover:text-white p-1 rounded-full transition-colors"
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
            {/* College Logo/Name */}
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg overflow-hidden bg-white">
                <Image
                  src="/icon.png"
                  alt="UPC Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Uday Pratap College</h1>
                <p className="text-xs text-blue-100 font-medium">Excellence in Education</p>
              </div>
            </div>

            {/* --- DESKTOP NAV --- */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <nav>
                <ul className="flex items-center space-x-1">
                  {mainNavLinks.map((linkItem) => (
                    <li key={linkItem.href} className="relative group">
                      <NavLinkItem {...linkItem} isMobile={false} />
                      {linkItem.hasDropdown && linkItem.dropdownLinks && (
                        <div className="absolute left-0 mt-2 w-56 origin-top-left bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 ease-out z-50 group-hover:animate-fadeIn">
                          <div className="py-2">
                            {linkItem.dropdownLinks.map((subLink) => (
                              <Link key={subLink.href} href={subLink.href} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-slate-900 w-full text-left transition-all duration-200 rounded-lg mx-2">
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
              <div className="flex items-center space-x-1.5 border-l border-white/20 pl-3">
                <button
                  onClick={() => setShowSearch(true)}
                  aria-label="Open Search"
                  className="text-white/80 hover:text-blue-300 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* --- MOBILE NAV BUTTON --- */}
            <div className="lg:hidden flex-shrink-0">
              <button
                onClick={toggleMobileMenu}
                className="text-white/80 hover:text-blue-300 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quotes Section - Below Navigation */}
      {!showSearch && hasMounted && (
        <div className="bg-gradient-to-r from-slate-800/50 via-blue-800/50 to-indigo-800/50 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-6 py-4">
            {/* Category Selector */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3">
              <button
                onClick={() => { setQuoteCategory('all'); setCurrentQuoteIndex(0); }}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-200 ${quoteCategory === 'all'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
              >
                <span className="hidden sm:inline">All Quotes</span>
                <span className="sm:hidden">All</span>
              </button>
              <button
                onClick={() => { setQuoteCategory('indian'); setCurrentQuoteIndex(0); }}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-200 ${quoteCategory === 'indian'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
              >
                <span className="hidden sm:inline">🇮🇳 Indian Personalities</span>
                <span className="sm:hidden">🇮🇳 Indian</span>
              </button>
              <button
                onClick={() => { setQuoteCategory('hindiWriters'); setCurrentQuoteIndex(0); }}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-200 ${quoteCategory === 'hindiWriters'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
              >
                <span className="hidden sm:inline">📖 Hindi Writers</span>
                <span className="sm:hidden">📖 Hindi</span>
              </button>
            </div>

            {/* Quote Display */}
            <div className="max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${quoteCategory}-${currentQuoteIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  {currentQuote && (
                    <blockquote className="text-base">
                      <p className={`font-medium italic leading-relaxed drop-shadow-lg ${quoteCategory === 'hindiWriters' ? 'text-yellow-200 text-lg' : 'text-white'
                        }`}>
                        &quot;{currentQuote.text}&quot;
                      </p>
                      <cite className="block mt-3 text-blue-200 text-sm font-semibold tracking-wide">
                        - {currentQuote.author}
                      </cite>
                    </blockquote>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden border-t border-white/10 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-md shadow-2xl absolute top-full left-0 right-0 z-30 overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-4">
              <ul className="flex flex-col space-y-2">
                {mainNavLinks.map(linkItem => (
                  <li key={linkItem.href}>
                    <NavLinkItem {...linkItem} isMobile={true} />
                    {linkItem.hasDropdown && linkItem.dropdownLinks && openMobileSubmenus[linkItem.href] && (
                      <ul className="pl-6 mt-2 mb-3 space-y-2 border-l-2 border-blue-300/30 ml-4 py-2">
                        {linkItem.dropdownLinks.map(subLink => (
                          <li key={subLink.href}>
                            <Link
                              href={subLink.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenMobileSubmenus({});
                              }}
                              className="block px-4 py-3 text-sm text-white/80 hover:bg-blue-300/20 hover:text-blue-200 rounded-lg transition-all duration-200 font-medium"
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
