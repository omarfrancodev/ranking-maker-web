import React from "react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { Edit, Trash, Save, X } from "lucide-react";
import Tooltip from "../../atoms/ToolTip";

const SubcategoryItem = ({
  subcategory, // {subcategory_id, name}
  index,
  editSubcategory,
  handleEditSubcategory,
  handleSaveSubcategory,
  handleDeleteSubcategory,
  cancelEdit, // Usamos 'cancelEdit' en lugar de 'cancelEditSubcategory'
  category,
  newSubcategoryName,
  setNewSubcategoryName,
}) => {
  // Verificamos si esta subcategoría está en modo de edición
  const isEditing =
    editSubcategory?.subcategory_id === subcategory.subcategory_id;

  return (
    <div
      className={`flex justify-between px-4 py-2 align-middle items-center ${
        index % 2 === 0 ? "bg-transparent" : "bg-customGreen-50"
      }`}
    >
      {isEditing ? (
        <Input
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          className="mr-4 flex-grow"
          placeholder={newSubcategoryName}
        />
      ) : (
        <span className="flex-grow">{subcategory.name}</span>
      )}
      {subcategory.name !== "General" && (
        <div className="flex space-x-1">
          {/* Botón Editar/Guardar */}
          <Tooltip content={isEditing ? "Guardar" : "Editar"}>
            <Button
              className="bg-transparent hover:bg-blue-300 text-blue-600 hover:text-white p-2 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                if (isEditing) {
                  handleSaveSubcategory(
                    category.name,
                    subcategory.name,
                    subcategory.subcategory_id
                  );
                } else {
                  handleEditSubcategory(subcategory); // Pasamos el objeto completo
                }
              }}
            >
              {isEditing ? (
                <Save className="w-5 h-5" />
              ) : (
                <Edit className="w-5 h-5" />
              )}
            </Button>
          </Tooltip>

          {/* Botón Eliminar/Cancelar */}
          <Tooltip content={isEditing ? "Cancelar" : "Eliminar"}>
            <Button
              className="bg-transparent hover:bg-red-400 text-red-700 hover:text-white p-2 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                if (isEditing) {
                  cancelEdit(); // Llamamos a la función de cancelación general
                } else {
                  handleDeleteSubcategory(
                    subcategory.subcategory_id,
                    subcategory.name
                  );
                }
              }}
            >
              {isEditing ? (
                <X className="w-5 h-5" />
              ) : (
                <Trash className="w-5 h-5" />
              )}
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default React.memo(SubcategoryItem);
