// tailwind.config.js or tailwind.config.ts

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add or merge these keyframes and animations
      keyframes: {
        fadeIn: { // General purpose fade-in
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        // Keep your existing 'fadeIn' if you have one from previous suggestions for header dropdowns,
        // or merge/rename if necessary. This 'fadeIn' is a generic one.
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeInUp: 'fadeInUp 0.7s ease-out forwards',
        slideInFromLeft: 'slideInFromLeft 0.7s ease-out forwards',
        slideInFromRight: 'slideInFromRight 0.7s ease-out forwards',
      },
      // ... any other theme extensions you have
    },
  },
  plugins: [],
}