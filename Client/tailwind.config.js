/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-deep': 'inset 2px 5px 10px rgb(5, 5, 5)',
      },
      colors: {
        'dark-gray': '#171717',
        'input-gray': '#252525',
        'blue-primary': '#1A1363',
        'gris-secundary': '#ECE9E9'
      },
      borderRadius: {
        'lg': '25px',
      }
    },
  },
  plugins: [],
}

