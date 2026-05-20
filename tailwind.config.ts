// tailwind.config.ts

/** @type {import('tailwindcss').Config} */
module.exports = {
  // --- CORRECTED CONTENT PATHS ---
  // These paths now correctly point to your root 'app' folder
  // and your 'src/components' folder.
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // --- END OF CORRECTION ---

  theme: {
    extend: {
      colors: {
        "primary-fixed": "#d7e2ff",
        "on-secondary-container": "#745c00",
        "surface-dim": "#d8dadd",
        "background": "#f7f9fc",
        "on-tertiary-container": "#af8d5b",
        "outline-variant": "#c5c6ce",
        "tertiary-fixed": "#ffddaf",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f7",
        "on-tertiary-fixed": "#281800",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed-variant": "#5c4217",
        "tertiary-container": "#3d2700",
        "tertiary": "#221400",
        "surface-container": "#eceef1",
        "error": "#ba1a1a",
        "on-secondary-fixed-variant": "#574500",
        "tertiary-fixed-dim": "#e7c18a",
        "error-container": "#ffdad6",
        "secondary-container": "#fed65b",
        "inverse-primary": "#b6c7ec",
        "on-secondary": "#ffffff",
        "on-primary": "#ffffff",
        "surface-container-high": "#e6e8eb",
        "surface": "#f7f9fc",
        "primary-fixed-dim": "#b6c7ec",
        "on-secondary-fixed": "#241a00",
        "inverse-on-surface": "#eff1f4",
        "surface-variant": "#e0e3e6",
        "primary": "#031633",
        "secondary-fixed": "#ffe088",
        "outline": "#75777e",
        "surface-bright": "#f7f9fc",
        "secondary": "#735c00",
        "secondary-fixed-dim": "#e9c349",
        "inverse-surface": "#2d3133",
        "surface-tint": "#4e5e7f",
        "on-background": "#191c1e",
        "on-surface": "#191c1e",
        "on-surface-variant": "#44474e",
        "on-error-container": "#93000a",
        "on-primary-fixed": "#081b38",
        "on-error": "#ffffff",
        "on-primary-container": "#8293b6",
        "surface-container-highest": "#e0e3e6",
        "primary-container": "#1a2b49",
        "on-primary-fixed-variant": "#364766"
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
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
