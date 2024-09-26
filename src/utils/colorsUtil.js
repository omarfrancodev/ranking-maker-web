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
    text: "text-slate-50",
    bgButton: "bg-slate-300",
    bgSecondary: "bg-slate-700",
  },
  {
    bg: "bg-gray-500",
    text: "text-gray-50",
    bgButton: "bg-gray-300",
    bgSecondary: "bg-gray-700",
  },
  {
    bg: "bg-zinc-500",
    text: "text-zinc-50",
    bgButton: "bg-zinc-300",
    bgSecondary: "bg-zinc-700",
  },
  {
    bg: "bg-neutral-500",
    text: "text-neutral-50",
    bgButton: "bg-neutral-300",
    bgSecondary: "bg-neutral-700",
  },
  {
    bg: "bg-stone-500",
    text: "text-stone-50",
    bgButton: "bg-stone-300",
    bgSecondary: "bg-stone-700",
  },
  {
    bg: "bg-red-500",
    text: "text-red-50",
    bgButton: "bg-red-300",
    bgSecondary: "bg-red-700",
  },
  {
    bg: "bg-orange-500",
    text: "text-orange-50",
    bgButton: "bg-orange-300",
    bgSecondary: "bg-orange-700",
  },
  {
    bg: "bg-amber-500",
    text: "text-amber-50",
    bgButton: "bg-amber-300",
    bgSecondary: "bg-amber-700",
  },
  {
    bg: "bg-yellow-500",
    text: "text-yellow-50",
    bgButton: "bg-yellow-300",
    bgSecondary: "bg-yellow-700",
  },
  {
    bg: "bg-lime-500",
    text: "text-lime-50",
    bgButton: "bg-lime-300",
    bgSecondary: "bg-lime-700",
  },
  {
    bg: "bg-green-500",
    text: "text-green-50",
    bgButton: "bg-green-300",
    bgSecondary: "bg-green-700",
  },
  {
    bg: "bg-emerald-500",
    text: "text-emerald-50",
    bgButton: "bg-emerald-300",
    bgSecondary: "bg-emerald-700",
  },
  {
    bg: "bg-teal-500",
    text: "text-teal-50",
    bgButton: "bg-teal-300",
    bgSecondary: "bg-teal-700",
  },
  {
    bg: "bg-cyan-500",
    text: "text-cyan-50",
    bgButton: "bg-cyan-300",
    bgSecondary: "bg-cyan-700",
  },
  {
    bg: "bg-sky-500",
    text: "text-sky-50",
    bgButton: "bg-sky-300",
    bgSecondary: "bg-sky-700",
  },
  {
    bg: "bg-blue-500",
    text: "text-blue-50",
    bgButton: "bg-blue-300",
    bgSecondary: "bg-blue-700",
  },
  {
    bg: "bg-indigo-500",
    text: "text-indigo-50",
    bgButton: "bg-indigo-300",
    bgSecondary: "bg-indigo-700",
  },
  {
    bg: "bg-violet-500",
    text: "text-violet-50",
    bgButton: "bg-violet-300",
    bgSecondary: "bg-violet-700",
  },
  {
    bg: "bg-purple-500",
    text: "text-purple-50",
    bgButton: "bg-purple-300",
    bgSecondary: "bg-purple-700",
  },
  {
    bg: "bg-fuchsia-500",
    text: "text-fuchsia-50",
    bgButton: "bg-fuchsia-300",
    bgSecondary: "bg-fuchsia-700",
  },
  {
    bg: "bg-pink-500",
    text: "text-pink-50",
    bgButton: "bg-pink-300",
    bgSecondary: "bg-pink-700",
  },
  {
    bg: "bg-rose-500",
    text: "text-rose-50",
    bgButton: "bg-rose-300",
    bgSecondary: "bg-rose-700",
  },
];
