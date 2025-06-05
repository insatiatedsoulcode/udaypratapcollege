// tailwind.config.ts

/** @type {import('tailwindcss').Config} */
module.exports = {
  // --- CORRECTED CONTENT PATHS ---
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Scans files in the root 'app' directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Scans files in the 'src/components' directory
  ],
  // --- END OF CORRECTION ---

  theme: {
    extend: {
      // Your animation keyframes and other extensions remain here
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        fadeInUp: 'fadeInUp 0.7s ease-out forwards',
        slideInFromLeft: 'slideInFromLeft 0.7s ease-out forwards',
        slideInFromRight: 'slideInFromRight 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};