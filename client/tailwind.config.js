/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#fd2e2e",
        "brand-secondary": "#cf1b1b",
        "brand-third": "#fffbcc",
        "brand-shade": "#fc5a36",
        "background-shade": "#fff799",
      },
      fontFamily: {
        brandFont: ['"Poppins"', " sans-serif"],
      },
    },
  },
  plugins: [],
};
