/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",     // Blue
        secondary: "#F59E0B",   // Amber
        accent: "#10B981",      // Emerald
        "base-content": "#1F2937", // Dark gray
        "base-100": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2563EB",
          secondary: "#F59E0B",
          accent: "#10B981",
          neutral: "#F3F4F6",
          "base-100": "#FFFFFF",
          "base-200": "#F9FAFB",
          "base-300": "#F3F4F6",
          "base-content": "#1F2937",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      {
        night: {
          primary: "#3B82F6",
          secondary: "#FBBF24",
          accent: "#34D399",
          neutral: "#1F2937",
          "base-100": "#0F172A",
          "base-200": "#1E293B",
          "base-300": "#334155",
          "base-content": "#E2E8F0",
          info: "#60A5FA",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
    ],
  },
};
