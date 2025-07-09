/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
  content: [
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#2A2A2A',
        'zucker-blue': '#1877F2',
        'zucker-gray': '#65676B'
      },
      fontFamily: {
        fantasy: ['fantasy', 'serif'],
        didact: ['Didact Gothic', 'sans-serif']
      },
      boxShadow: {
        post: '8px 8px 30px rgba(0, 0, 0, 0.1)',
        activity: '20px 20px 100px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}
