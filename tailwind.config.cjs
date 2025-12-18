/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corporate: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', // Bright accent blue
          800: '#075985', // Deep professional blue
          900: '#0c4a6e', // Navy (Footer/Header)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Standard professional font
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#075985", // Corporate Blue
          "secondary": "#0ea5e9", // Lighter Blue accent
          "accent": "#f59e0b", // Amber for "Call to Actions" like Import buttons
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "night"
    ],
  },
}