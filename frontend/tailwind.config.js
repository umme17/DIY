/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF', // Purple
        secondary: '#FFFFFF', // White
        accent: '#F59E0B', // Optional Accent (Yellow)
        dark: '#1F2937', // Dark Mode Background
        light: '#F9FAFB', // Light Mode Background
      },
    },
  },
  plugins: [],
}