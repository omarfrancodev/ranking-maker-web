import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import Button from "../../atoms/Button";
import Dialog from "../../atoms/Dialog";
import { tailwindColors } from "../../../utils/colorsUtil";
import Tooltip from "../../atoms/ToolTip";
import { fetchContentDataByTitle } from "../../../services/contentApi"; // Importar la función de la API
import ContentInfoDialog from "./ContentInfoDialog"; // Importar el nuevo diálogo para mostrar la información del contenido
import { useNotification } from "../../../context/NotificationContext";

const ContentItem = ({ show, onEdit, onDelete }) => {
  const [bgColor, setBgColor] = useState("");
  const [bgColorCategory, setBgColorCategory] = useState("");
  const [textColorCategory, setTextColorCategory] = useState("");
  const [buttonBgColor, setButtonBgColor] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false); // Estado para el diálogo de información del contenido
  const [contentTitle, setContentTitle] = useState(""); // Corregido nombre del estado
  const [contentInfo, setContentInfo] = useState(null); // Estado para almacenar la información de la API
  const [isLoading, setIsLoading] = useState(false);

  const { addNotification } = useNotification();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    const { bg, text, bgButton, bgSecondary } = tailwindColors[randomIndex];

    setBgColor(bg);
    setButtonBgColor(bgButton);
    setBgColorCategory(bgSecondary);
    setTextColorCategory(text);
  }, []);

  // Función para abrir el diálogo de subcategorías
  const handleOpenDialog = (e) => {
    e.stopPropagation(); // Prevenir propagación de clics
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Función para abrir el diálogo de información del contenido
  const handleOpenInfoDialog = async () => {
    setIsLoading(true);
    setIsInfoDialogOpen(true);
    setContentTitle(show.name);
    try {
      const response = await fetchContentDataByTitle(show.name);
      setContentInfo(response.data); // Almacenar la información obtenida
    } catch (error) {
      console.error("Error al obtener la información del contenido:", error);
      addNotification(
        "error",
        `Error al obtener la información del contenido: ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseInfoDialog = () => {
    setIsInfoDialogOpen(false);
    setContentInfo(null); // Limpiar la información al cerrar el diálogo
  };

  // Función para manejar clics en el ContentItem sin propagar a los botones
  const handleClickItem = (e) => {
    // Evita abrir el diálogo si ya hay un diálogo abierto
    if (isDialogOpen || isInfoDialogOpen) return;
    handleOpenInfoDialog();
  };
  return (
    <div
      onClick={handleClickItem}
      className={`p-4 rounded-lg shadow-md ${bgColor} text-white transition hover:bg-opacity-75 flex flex-col justify-between h-full cursor-pointer`}
    >
      {/* Título alineado arriba */}
      <h3 className="font-semibold text-lg mb-4">{show.name}</h3>

      {/* Categoría y subcategorías alineadas abajo */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <p className="text-base underline underline-offset-1">
            {show.category.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {show.subcategories.slice(0, 2).map((sub) => (
              <span
                key={sub.id}
                className={`px-2 py-1 rounded ${bgColorCategory} ${textColorCategory}`}
              >
                {sub.name}
              </span>
            ))}
            {show.subcategories.length > 2 && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Detener propagación del clic al botón de subcategorías
                  handleOpenDialog(e);
                }}
                className={`px-2 py-1 rounded bg-indigo-200 text-gray-600 hover:bg-indigo-700 hover:text-white`}
              >
                +{show.subcategories.length - 2} más
              </button>
            )}
          </div>
        </div>

        {/* Botones de acción con Tooltips */}
        <div className="flex space-x-1 md:space-x-2">
          <Tooltip content="Editar">
            <Button
              className={`${buttonBgColor} bg-opacity-75 hover:bg-blue-300 text-blue-700 hover:text-white rounded-md`}
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el clic se propague al abrir el modal de información
                onEdit(show);
              }}
            >
              <Edit className="w-5 h-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Eliminar">
            <Button
              className={`${buttonBgColor} bg-opacity-75 hover:bg-red-500 text-red-800 hover:text-white rounded-md`}
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el clic se propague al abrir el modal de información
                onDelete(show.id, show.name);
              }}
            >
              <Trash className="w-5 h-5" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Dialog para mostrar todas las subcategorías */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title={`Clasificación (Ranking Maker) de: ${show.name}`}
      >
        <div className="p-4">
          <p className="text-lg mb-4">Categoría:</p>
          <span className="px-2 py-1 rounded bg-indigo-200 text-indigo-950">
            {show.category.name}
          </span>
        </div>
        <div className="p-4">
          <p className="text-lg mb-4">Subcategorías:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {show.subcategories.map((sub) => (
              <span
                key={sub.id}
                className="px-2 py-1 rounded bg-indigo-200 text-indigo-950"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      </Dialog>

      {/* Dialog para mostrar la información del contenido */}
      <ContentInfoDialog
        isOpen={isInfoDialogOpen}
        onClose={handleCloseInfoDialog}
        contentTitle={contentTitle}
        contentInfo={contentInfo}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ContentItem;
