/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twitter: "#00ADED",
        like: "#F91800",
        retweet: "#00BA7C",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
