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
        "vista-1": {
          50: "#f0f7fa" /* tono más claro */,
          100: "#e1eff5",
          200: "#cfe2f3" /* Color base */,
          300: "#b4d4e6",
          400: "#94bfd7",
          500: "#75a7c3",
          600: "#567f9b",
          700: "#405e75",
          800: "#2b3d4f",
          900: "#16202a" /* tono más oscuro */,
        },
        "vista-2": {
          50: "#f5f0f9" /* tono más claro */,
          100: "#ebe1f2",
          200: "#d4c6e5",
          300: "#b4a7d6" /* Color base */,
          400: "#997dbf",
          500: "#7d56a3",
          600: "#5e3f7a",
          700: "#402a54",
          800: "#271934",
          900: "#12091a" /* tono más oscuro */,
        },
        "vista-3": {
          50: "#ede7f3" /* tono más claro */,
          100: "#d9cfe6",
          200: "#b7a6cc",
          300: "#8f7ab3",
          400: "#674ea7" /* Color base */,
          500: "#503e85",
          600: "#3a2f63",
          700: "#291f4c",
          800: "#191236",
          900: "#0d081c" /* tono más oscuro */,
        },
        "vista-4": {
          50: "#e5dced" /* tono más claro */,
          100: "#ccc0db",
          200: "#b19bc8",
          300: "#9374b3",
          400: "#754d9f",
          500: "#593581",
          600: "#46296a",
          700: "#351c75" /* Color base */,
          800: "#240f4d",
          900: "#130829" /* tono más oscuro */,
        },
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
