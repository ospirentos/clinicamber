const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/@nextui-org/theme/dist/components/navbar.js", 
            "./node_modules/@nextui-org/theme/dist/components/card.js",
            "./node_modules/@nextui-org/theme/dist/components/image.js",
            "./node_modules/@nextui-org/theme/dist/components/button.js",
            "./app/**/*.{js,jsx,ts,tsx}"
          ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

