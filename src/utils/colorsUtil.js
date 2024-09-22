export const generateRandomBackgroundColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Función para determinar si un color es claro u oscuro y devolver un color de texto adecuado
export const getTextColorForBackground = (bgColor) => {
  const color = bgColor.substring(1); // Remove the '#'
  const rgb = parseInt(color, 16); // Convert to a number
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = (rgb >> 0) & 0xff; // Extract blue

  const luma = 0.299 * r + 0.587 * g + 0.114 * b; // Luminance formula
  return luma > 186 ? "#000000" : "#FFFFFF"; // Return black or white text based on luminance
};

export const tailwindColors = [
  {
    bg: "bg-slate-500",
    text: "text-slate-100",
    bgButton: "bg-slate-200",
    bgSecondary: "bg-slate-700",
  },
  {
    bg: "bg-gray-500",
    text: "text-gray-100",
    bgButton: "bg-gray-200",
    bgSecondary: "bg-gray-700",
  },
  {
    bg: "bg-zinc-500",
    text: "text-zinc-100",
    bgButton: "bg-zinc-200",
    bgSecondary: "bg-zinc-700",
  },
  {
    bg: "bg-neutral-500",
    text: "text-neutral-100",
    bgButton: "bg-neutral-200",
    bgSecondary: "bg-neutral-700",
  },
  {
    bg: "bg-stone-500",
    text: "text-stone-100",
    bgButton: "bg-stone-200",
    bgSecondary: "bg-stone-700",
  },
  {
    bg: "bg-red-500",
    text: "text-red-100",
    bgButton: "bg-red-200",
    bgSecondary: "bg-red-700",
  },
  {
    bg: "bg-orange-500",
    text: "text-orange-100",
    bgButton: "bg-orange-200",
    bgSecondary: "bg-orange-700",
  },
  {
    bg: "bg-amber-500",
    text: "text-amber-100",
    bgButton: "bg-amber-200",
    bgSecondary: "bg-amber-700",
  },
  {
    bg: "bg-yellow-500",
    text: "text-yellow-100",
    bgButton: "bg-yellow-200",
    bgSecondary: "bg-yellow-700",
  },
  {
    bg: "bg-lime-500",
    text: "text-lime-100",
    bgButton: "bg-lime-200",
    bgSecondary: "bg-lime-700",
  },
  {
    bg: "bg-green-500",
    text: "text-green-100",
    bgButton: "bg-green-200",
    bgSecondary: "bg-green-700",
  },
  {
    bg: "bg-emerald-500",
    text: "text-emerald-100",
    bgButton: "bg-emerald-200",
    bgSecondary: "bg-emerald-700",
  },
  {
    bg: "bg-teal-500",
    text: "text-teal-100",
    bgButton: "bg-teal-200",
    bgSecondary: "bg-teal-700",
  },
  {
    bg: "bg-cyan-500",
    text: "text-cyan-100",
    bgButton: "bg-cyan-200",
    bgSecondary: "bg-cyan-700",
  },
  {
    bg: "bg-sky-500",
    text: "text-sky-100",
    bgButton: "bg-sky-200",
    bgSecondary: "bg-sky-700",
  },
  {
    bg: "bg-blue-500",
    text: "text-blue-100",
    bgButton: "bg-blue-200",
    bgSecondary: "bg-blue-700",
  },
  {
    bg: "bg-indigo-500",
    text: "text-indigo-100",
    bgButton: "bg-indigo-200",
    bgSecondary: "bg-indigo-700",
  },
  {
    bg: "bg-violet-500",
    text: "text-violet-100",
    bgButton: "bg-violet-200",
    bgSecondary: "bg-violet-700",
  },
  {
    bg: "bg-purple-500",
    text: "text-purple-100",
    bgButton: "bg-purple-200",
    bgSecondary: "bg-purple-700",
  },
  {
    bg: "bg-fuchsia-500",
    text: "text-fuchsia-100",
    bgButton: "bg-fuchsia-200",
    bgSecondary: "bg-fuchsia-700",
  },
  {
    bg: "bg-pink-500",
    text: "text-pink-100",
    bgButton: "bg-pink-200",
    bgSecondary: "bg-pink-700",
  },
  {
    bg: "bg-rose-500",
    text: "text-rose-100",
    bgButton: "bg-rose-200",
    bgSecondary: "bg-rose-700",
  },
];
