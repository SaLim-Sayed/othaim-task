import type { Config } from 'tailwindcss';

const { heroui } = require('@heroui/react');

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {

      backgroundImage: {
        mainOverlay: 'linear-gradient(180deg, rgba(0, 107, 158, 0) 0%, #002638 100%)',
        secondaryOverlay:
          'linear-gradient(180deg, rgba(0, 38, 56, 0.18) 0%, rgba(0, 107, 158, 0) 73.01%)',
      },
    },
  },
  plugins: [heroui()],
};
export default config;
