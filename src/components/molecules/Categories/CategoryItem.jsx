import React from "react";
import { ChevronDown, ChevronUp, Edit, Trash, Save, X } from "lucide-react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import SubcategoryItem from "./SubcategoryItem";
import Tooltip from "../../atoms/ToolTip";

const CategoryItem = ({
  category,
  editCategory,
  expandedCategory,
  toggleCategoryCollapse,
  handleEditCategory,
  handleSaveCategory,
  cancelEditCategory,
  handleDeleteCategory,
  subcategories,
  ...subcategoryProps
}) => {
  return (
    <div key={category.id} className="rounded-lg shadow max-h-min">
      <div
        className={`flex justify-between p-2 items-center align-middle cursor-pointer  ${
          expandedCategory === category.name
            ? "bg-blue-200 bg-opacity-75 rounded-t-lg"
            : "hover:bg-blue-200 hover:bg-opacity-25"
        }`}
        onClick={() => toggleCategoryCollapse(category.name)}
      >
        {editCategory === category.name ? (
          <Input
            value={subcategoryProps.newCategoryName}
            onChange={(e) =>
              subcategoryProps.setNewCategoryName(e.target.value)
            }
            className="mr-4"
          />
        ) : (
          <div className="flex items-center">
            <span className="font-semibold">{category.name}</span>
          </div>
        )}

        <div className="flex space-x-0 md:space-x-2 align-middle items-center">
          <Tooltip
            content={editCategory === category.name ? "Guardar" : "Editar"}
          >
            <Button
              className="bg-transparent hover:bg-blue-400 text-blue-700 hover:text-white rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                if (editCategory === category.name) {
                  handleSaveCategory(category.name, category.id);
                } else {
                  handleEditCategory(category.name);
                }
              }}
            >
              {editCategory === category.name ? (
                <Save className="w-5 h-5" />
              ) : (
                <Edit className="w-5 h-5" />
              )}
            </Button>
          </Tooltip>
          <Tooltip
            content={editCategory === category.name ? "Cancelar" : "Eliminar"}
          >
            <Button
              className="bg-transparent hover:bg-red-500 text-red-800 hover:text-white rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                if (editCategory === category.name) {
                  cancelEditCategory();
                } else {
                  handleDeleteCategory(category.id, category.name);
                }
              }}
            >
              {editCategory === category.name ? (
                <X className="w-5 h-5" />
              ) : (
                <Trash className="w-5 h-5" />
              )}
            </Button>
          </Tooltip>
          {subcategories.length > 0 && (
            <span
              className={`transition-transform duration-300 ${
                expandedCategory === category.name ? "rotate-180" : ""
              }`}
              onClick={(e) => e.stopPropagation()} // Evitar la propagación cuando se hace clic en el ícono
            >
              {expandedCategory === category.name ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </span>
          )}
        </div>
      </div>

      {expandedCategory === category.name && subcategories.length > 0 && (
        <div className="grid grid-cols-1 gap-2 h-min max-h-60 overflow-auto">
          {subcategories.map((subcategory, index) => (
            <SubcategoryItem
              key={subcategory.subcategory_id} // Asegúrate de usar el `subcategory_id` como clave
              index={index}
              subcategory={subcategory} // Pasamos el objeto completo, pero lo manejamos correctamente en el `SubcategoryItem`
              category={category}
              {...subcategoryProps}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
