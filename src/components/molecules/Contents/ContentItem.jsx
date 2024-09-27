import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import Button from "../../atoms/Button";
import { tailwindColors } from "../../../utils/colorsUtil";
import Tooltip from "../../atoms/ToolTip";
import { fetchContentDataByTitle } from "../../../services/contentApi";
import ContentInfoDialog from "./ContentInfoDialog";
import { useNotification } from "../../../context/NotificationContext";
import Popover from "../../atoms/Popover"; // Importar el nuevo componente genérico

const ContentItem = ({ show, onEdit, onDelete }) => {
  const [bgColor, setBgColor] = useState("");
  const [bgColorCategory, setBgColorCategory] = useState("");
  const [textColorCategory, setTextColorCategory] = useState("");
  const [buttonBgColor, setButtonBgColor] = useState("");
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [contentTitle, setContentTitle] = useState("");
  const [contentInfo, setContentInfo] = useState(null);
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

  // Función para abrir el diálogo de información del contenido
  const handleOpenInfoDialog = async () => {
    setIsLoading(true);
    setIsInfoDialogOpen(true);
    setContentTitle(show.name);
    try {
      const response = await fetchContentDataByTitle(
        show.name,
        show.release_year
      );
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

  const handleClickItem = () => {
    if (isInfoDialogOpen) return;
    handleOpenInfoDialog();
  };

  return (
    <div
      onClick={handleClickItem}
      className={`p-3 rounded-lg shadow-md ${bgColor} bg-opacity-80 text-white transition hover:bg-opacity-100 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-700 flex flex-col justify-between h-full cursor-pointer`}
    >
      {/* Título alineado arriba */}
      <h3 className="font-semibold text-lg mb-4">
        {show.name}
        {show.release_year !== null ? (
          <span className="text-base text-gray-200">
            {" "}
            ({show.release_year})
          </span>
        ) : (
          ""
        )}
      </h3>

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
              <Popover
                triggerContent={
                  <span className="px-2 py-1 rounded bg-indigo-200 text-gray-800 hover:bg-indigo-700 hover:text-white">
                    +{show.subcategories.length - 2} más
                  </span>
                }
                title={`Subcategorías de ${show.name}`}
                content={
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {show.subcategories.slice(2).map((sub) => (
                      <span
                        key={sub.id}
                        className="px-2 py-1 rounded bg-indigo-200 text-indigo-950"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                }
              />
            )}
          </div>
        </div>

        {/* Botones de acción con Tooltips */}
        <div className="flex space-x-1 md:space-x-2">
          <Tooltip content="Editar">
            <Button
              className={`${buttonBgColor} bg-opacity-75 hover:bg-blue-400  hover:ring-1 hover:ring-white text-white rounded-md`}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(show);
              }}
            >
              <Edit className="w-5 h-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Eliminar">
            <Button
              className={`${buttonBgColor} bg-opacity-75 hover:bg-red-500 hover:ring-1 hover:ring-white text-white rounded-md`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(show.id, show.name);
              }}
            >
              <Trash className="w-5 h-5" />
            </Button>
          </Tooltip>
        </div>
      </div>

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
