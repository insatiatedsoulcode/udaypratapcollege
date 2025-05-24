/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If you have a pages directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // For the app router
    // Add other paths if necessary
  ],
  theme: {
    extend: {
      // Your theme extensions
    },
  },
  plugins: [],
}