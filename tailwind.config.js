/** @type {import('tailwindcss').Config} */

const flowbite = require('flowbite-react/tailwind')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        'basic-white': '#FBFBFB',
        'basic-black': '#180A29',
        'basic-gray': '#F2F1F4',
        'basic-purple': '#9969FF',
      },
    },
  },
  plugins: [flowbite.plugin()],
}
