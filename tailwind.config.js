/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    './.storybook/**/*.{js,jsx}',
    './src/stories/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
