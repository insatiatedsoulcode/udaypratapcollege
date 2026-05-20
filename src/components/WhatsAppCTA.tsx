// src/components/WhatsAppCTA.tsx
'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { getCollegeInfo } from '@/lib/content';
import { motion } from 'framer-motion';

const WhatsAppCTA = () => {
    const { social } = getCollegeInfo();

    if (!social.whatsapp || social.whatsapp === '#') return null;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Inquire on WhatsApp"
            >
                <FaWhatsapp size="2em" />

                {/* Tooltip */}
                <span className="absolute right-16 bg-white text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-100">
                    Inquire on WhatsApp
                    {/* Arrow */}
                    <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 border-8 border-transparent border-l-white"></span>
                </span>
            </a>
        </motion.div>
    );
};

export default WhatsAppCTA;
