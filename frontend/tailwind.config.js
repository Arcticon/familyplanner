module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: ["hover", "focus"],
      minHeight: {
        "1/2": "50%",
        "3/4": "75%",
        "7/8": "87.5%",
      },
      maxHeight: {
        "1/2": "50%",
        "3/4": "75%",
        "7/8": "87.5%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
