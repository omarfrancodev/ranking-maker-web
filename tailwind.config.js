/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye todos los archivos JSX
  ],
  theme: {
    extend: {
      colors: {
        customGreen: {
          DEFAULT: "#8cc682", // Color base
          50: "#dcfce7", // Versiones claras
        },
        success: "#4CAF50",
        info: "#2196F3",
        warning: "#FF9800",
        error: "#F44336",
        titleBlue: "#6b21a8",
        mainBG: "#f1e8ff",
      },
      transitionTimingFunction: {
        "in-out-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
