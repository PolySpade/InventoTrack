/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Adjust the paths based on your project structure
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    prefix: "daisy-",
    themes: [
      {
        mytheme: {
          primary: "#1A111D",

          secondary: "#8D8598",

          accent: "#8F9BFF",

          neutral: "#261E35",

          "base-100": "#3C354A",

          info: "#5D5FEF",

          success: "#00C287",

          warning: "#BFA33D",

          error: "#E72D04",

          "base-200": "#6237A0"
        },
      },
    ],
  },
};
