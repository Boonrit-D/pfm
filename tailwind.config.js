/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.transactionClassName': {
          '@apply w-full bg-gradient-to-r from-blue-50 rounded-sm border border-gray-300 px-4 py-2 text-sm': {},
        },
        '.submitButton': {
          '@apply bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded': {},
        },
        '.updateFormInEdit': {
          '@apply w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500': {},
        }
      })
    },
  ],
}

