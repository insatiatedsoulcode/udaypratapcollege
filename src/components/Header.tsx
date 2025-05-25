// src/components/Header.tsx
'use client';

import React from 'react'; // Keep React import

// Remove or comment out all other imports like Link, usePathname, icons for this test
// Remove or comment out vivekanandaQuotes, mainNavLinks, type definitions
// Remove or comment out NavLinkItem function

function Header() {
  console.log("Rendering minimal Header for Vercel test"); // Add a log

  return (
    <header style={{ backgroundColor: 'lime', padding: '20px', border: '5px solid red' }}>
      <p style={{color: 'black'}}>Bare Minimum Header - Vercel Test</p>
    </header>
  );
}

export default Header;