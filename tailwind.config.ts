import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(select|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      colors: {
        dark: {
          background: '#1f2937', // Tailwind color for bg-gray-800
          border: '#6b7280', // Tailwind color for border-gray-500
          text: '#d1d5db', // Tailwind color for text-gray-300
          primary: '#3b82f6', // Tailwind color for blue-500
          secondary: '#10b981', // Tailwind color for green-500
        },
        light: {
          background: '#ffffff', // White background
          border: '#e5e7eb', // Tailwind color for border-gray-200
          text: '#374151', // Tailwind color for text-gray-700
          primary: '#3b82f6', // Tailwind color for blue-500
          secondary: '#10b981', // Tailwind color for green-500
        },
      },
    },
  },
  darkMode: "class", // Ensure dark mode is enabled
  plugins: [nextui()],
};

export default config;
