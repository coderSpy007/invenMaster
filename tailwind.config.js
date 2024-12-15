/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#869EFF',
        'fadeblue': '#C3D6FF',
        'lightgrey': '#E8E8E8',
        'lightgrey-2': '#EFEFEF'
      },
    },
  },
  plugins: [],
}

