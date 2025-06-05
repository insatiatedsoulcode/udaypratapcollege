// src/components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'; // Icons

const vivekanandaQuotes = [
  "Arise, awake, and stop not till the goal is reached.",
  "The world is the great gymnasium where we come to make ourselves strong.",
  "Take up one idea. Make that one idea your life – think of it, dream of it, live on that idea.",
  "All power is within you; you can do anything and everything.",
  "Anything that makes you weak physically, intellectually and spiritually, reject as poison.",
  "Stand up, be bold, be strong. Take the whole responsibility on your own shoulders.",
  "The greatest religion is to be true to your own nature. Have faith in yourselves.",
  "Believe in yourself and the world will be at your feet.",
  "Strength is Life, Weakness is Death.",
  "Purity, patience, and perseverance are the three essentials to success and above all love."
];

const mainNavLinks = [
  { href: "/", label: "Home", exact: true },
  {
    href: "/about",
    label: "About Us",
    hasDropdown: true,
    dropdownLinks: [
      { href: "/about/mission-vision", label: "Mission and Vision" },
      { href: "/about/why-choose-us", label: "Why Choose Us" },
      { href: "/about/awards-recognition", label: "Awards & Recognition" },
      { href: "/about/principals-message", label: "Principal's Message" },
      { href: "/about/mandatory-disclosure", label: "Mandatory Disclosure" },
    ]
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
    dropdownLinks: [
      { href: "/student-life/facilities", label: "Facilities" }
    ]
  },
  { href: "/contact-us", label: "Contact Us" },
];

type DropdownLink = {
  href: string;
  label: string;
};

type MainNavLink = {
  href: string;
  label: string;
  exact?: boolean;
  hasDropdown?: boolean;
  dropdownLinks?: DropdownLink[];
};


function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setOpenMobileSubmenus({});
    }
  };

  const toggleMobileSubmenu = (href: string) => {
    setOpenMobileSubmenus(prevState => ({
      ...prevState,
      [href]: !prevState[href]
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % vivekanandaQuotes.length);
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

  const NavLinkItem = ({ href, label, exact, hasDropdown, dropdownLinks, isMobile = false }: MainNavLink & { isMobile?: boolean }) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href) && (href !== "/" || pathname === "/");
    const isSubmenuOpenForThisItem = isMobile && hasDropdown && !!openMobileSubmenus[href];

    const handleClick = (e: React.MouseEvent) => {
      if (isMobile && hasDropdown && dropdownLinks && dropdownLinks.length > 0) {
        e.preventDefault();
        toggleMobileSubmenu(href);
      } else if (isMobile) {
        setIsMobileMenuOpen(false);
        setOpenMobileSubmenus({});
      }
    };

    return (
      <Link
        href={href}
        onClick={handleClick}
        className={`
          px-2 py-2 text-sm font-medium transition-all duration-150 ease-in-out
          relative flex items-center
          ${isMobile ? 'justify-between w-full' : 'group'}
          ${isActive && !isSubmenuOpenForThisItem
            ? 'text-orange-600'
            : 'text-gray-700 hover:text-orange-500 focus:text-orange-500'
          }
          focus:outline-none focus:ring-1 focus:ring-orange-300 rounded-sm
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        <span>{label}</span>
        {hasDropdown && (
          <FaChevronDown
            className={`
              ml-1.5 h-3 w-3 transition-transform duration-200
              ${isMobile ? (isSubmenuOpenForThisItem ? 'rotate-180' : '') : 'group-hover:rotate-180'}
              ${isActive && !isSubmenuOpenForThisItem ? 'text-orange-500' : 'text-gray-500 group-hover:text-orange-400'}
            `}
          />
        )}
        {!isMobile && (
          <span
            className={`
              absolute bottom-0 left-0 w-full h-[2px]
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out
              origin-left
              ${isActive ? 'scale-x-100 bg-orange-500' : 'bg-orange-500'}
            `}
          ></span>
        )}
      </Link>
    );
  };

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center py-3 min-h-[70px]">

        <div className="quote-container flex-shrink-0 max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg">
          <blockquote className="text-xs">
            <p className="text-sm font-bold text-black not-italic transition-opacity duration-500 ease-in-out">
              &quot;{vivekanandaQuotes[currentQuoteIndex]}&quot;
            </p>
            <cite className="block text-right italic text-gray-500 text-xs mt-1">- Swami Vivekananda</cite>
          </blockquote>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <nav>
            <ul className="flex space-x-1 lg:space-x-2">
              {mainNavLinks.map((linkItem) => (
                <li key={linkItem.href} className="relative group">
                  <NavLinkItem
                    {...linkItem}
                    isMobile={false}
                  />
                  {linkItem.hasDropdown && linkItem.dropdownLinks && (
                    <div className="absolute left-0 mt-1 w-60 origin-top-left bg-white border border-gray-200 rounded-md shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 ease-out z-50 group-hover:animate-fadeIn">
                      <div className="py-1 divide-y divide-gray-100" role="menu" aria-orientation="vertical">
                        {linkItem.dropdownLinks.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 w-full text-left transition-colors duration-150"
                            role="menuitem"
                          >
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
          <button aria-label="Search" className="text-gray-600 hover:text-orange-500 focus:text-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-300 p-1 rounded-md">
            <FaSearch className="h-4 w-4" />
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 p-1 rounded-md"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg absolute top-full left-0 right-0 z-30 animate-fadeIn">
          <nav className="container mx-auto px-4 py-3">
            <ul className="flex flex-col space-y-1">
              {mainNavLinks.map(linkItem => (
                <li key={linkItem.href}>
                  <NavLinkItem
                    {...linkItem}
                    isMobile={true}
                  />
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
        </div>
      )}
    </header>
  );
}

export default Header; // <--- MAKE SURE THIS LINE IS PRESENT AND CORRECT AT THE VERY END