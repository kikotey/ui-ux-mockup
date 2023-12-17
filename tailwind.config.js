/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          30: "var(--color-teal-30)",
          40: "var(--color-teal-40)",
          50: "var(--color-teal-50)",
          100: "var(--color-teal-100)",
          200: "var(--color-teal-200)",
          300: "var(--color-teal-300)",
        },
        gray: {
          50: "var(--color-gray-50)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
        },
        black: {
          50: "var(--color-black-50)",
          100: "var(--color-black-100)",
          200: "var(--color-black-200)",
          300: "var(--color-black-300)",
        },
        alert: {
          50: "var(--color-alert-50)",
          100: "var(--color-alert-100)",
        },
        yellow: {
          50: "var(--color-yellow-50)",
        },
        blue: {
          50: "var(--color-blue-50)",
        },
        green: {
          50: "var(--color-green-50)",
        },
      },
      fontFamily: {
        spMedium: "SPMedium",
        spSemiBold: "SPSemiBold",
        spBold: "SPBold",
      },
      spacing: {
        18: "72px",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
