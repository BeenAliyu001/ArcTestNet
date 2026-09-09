/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Institutional Dark Theme Palette
        arc: {
          bg: "#0B0E14",         // Main app background
          card: "#121721",       // Component card background
          border: "#1E2638",     // Subtle border line
          hover: "#1A2232",      // Hover state fill
          accent: "#0052FF",     // Coinbase/Arc Primary Blue
          textMuted: "#8A94A6",  // Secondary text color
          textBright: "#E2E8F0", // Primary text color
          green: "#00D395",      // Positive green (FX gain/settled)
          red: "#FF4D4D",        // Negative red / error
        },
      },
      fontFamily: {
        // Tabular/mono spacing for financial numbers and addresses
        mono: ['"JetBrains Mono"', "monospace"],
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};