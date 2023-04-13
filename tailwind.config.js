/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/ui/**/*.vue"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ]
};
