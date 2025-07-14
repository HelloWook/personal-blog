/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['synthwave', 'pastel'],
  },
  fontFamily: {
    suite: ['var(--font-suite)'],
  },
  plugins: [require('daisyui')],
};
