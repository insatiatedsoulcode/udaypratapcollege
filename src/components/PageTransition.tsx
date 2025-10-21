// src/components/PageTransition.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const variants = {
    hidden: { opacity: 0, y: 15 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname} // The key is crucial for AnimatePresence to detect page changes
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
