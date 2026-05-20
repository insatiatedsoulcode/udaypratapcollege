// src/components/PageTransition.tsx
// CSS-only fade — replaces framer-motion AnimatePresence (saves ~140KB bundle)
'use client';

import React from 'react';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-enter">
      {children}
    </div>
  );
};

export default PageTransition;
