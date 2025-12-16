// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Dækker ALLE Svelte, JS, TS, HTML-filer i og under den nuværende mappe
    "./**/*.{html,js,ts,svelte}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-scrollbar')
  ],
}
