/** @type {import('tailwindcss').Config} */

const flowbite = require('flowbite-react/tailwind')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        'basic-white': '#FBFBFB',
        'basic-black': '#180A29',
        'basic-gray': '#9AACB5',
        'basic-purple': '#9969FF',
        'border-gray': '#9AACB5',
        chat: '#EDEBEF',
      },
    },
    screens: {
      tablet: '1133px',
      mobile: '431px',
    },
  },
  plugins: [flowbite.plugin()],
}
