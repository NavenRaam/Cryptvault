/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures all files in src are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}