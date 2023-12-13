/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      backgroundColor: ['responsive', 'dark', 'hover', 'focus'],
      borderColor: ['responsive', 'dark', 'hover', 'focus'],
      textColor: ['responsive', 'dark', 'hover', 'focus'],
      // Other variants...
    },
  },
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d0c0c',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

