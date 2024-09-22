import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import Button from "../atoms/Button";
import { tailwindColors } from "../../utils/colorsUtil"; // Importar los colores

const ContentItem = ({ show, onEdit, onDelete }) => {
  const [bgColor, setBgColor] = useState("");
  const [bgColorCategory, setBgColorCategory] = useState("");
  const [textColorCategory, setTextColorCategory] = useState("");
  const [buttonBgColor, setButtonBgColor] = useState("");

  useEffect(() => {
    // Elegir un color aleatorio de la lista de colores Tailwind
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    const { bg, text, bgButton, bgSecondary } = tailwindColors[randomIndex];

    // Asignar colores a los estados correspondientes
    setBgColor(bg);
    setButtonBgColor(bgButton); // Generar la clase hover:bg-X
    setBgColorCategory(bgSecondary); // Usar el nuevo bgSecondary
    setTextColorCategory(text); // Asignar color de texto a la categoría
  }, []); // Solo se ejecuta una vez para establecer el color inicial

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${bgColor} text-white transition hover:bg-opacity-75`} // Aplicar hover con opacidad
    >
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{show.name}</h3>
          <p className="text-base underline underline-offset-1">
            {show.category.name}
          </p>
          <div className="flex flex-wrap space-x-2">
            {show.subcategories.map((sub) => (
              <span
                key={sub.id}
                className={`px-2 py-1 rounded ${bgColorCategory} ${textColorCategory}`}
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            className={`${buttonBgColor} hover:bg-blue-400 text-blue-700 hover:text-white rounded-md`}
            onClick={() => onEdit(show)}
          >
            <Edit className="w-5 h-5" />
          </Button>
          <Button
            className={`${buttonBgColor} hover:bg-red-500 text-red-800 hover:text-white rounded-md`}
            onClick={() => onDelete(show.id, show.name)}
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
