/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-100": "#12121280",
        "background-200": "#0a0a0a",
        "background-accent": "#1dd75e1a",

        card: "#121212",
        "text-primary": "#EDEDED",
        "muted-foreground": "#B3B3B3",
        "text-accent": "#1dd75e",

        "border-color": "#262626",
      },
    },
  },
  plugins: [],
};
