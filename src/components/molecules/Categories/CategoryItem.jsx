import React from "react";
import { Edit, Trash, Save, X } from "lucide-react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import SubcategoryItem from "./SubcategoryItem";
import Tooltip from "../../atoms/ToolTip";
import Disclosure from "../../atoms/Disclosure";

const CategoryItem = ({
  category,
  editCategory,
  editSubcategory,
  handleEditCategory,
  handleSaveCategory,
  cancelEdit,
  cancelEditSubcategory,
  handleDeleteCategory,
  handleDeleteSubcategory,
  handleEditSubcategory,
  handleSaveSubcategory,
  newCategoryName,
  setNewCategoryName,
  newSubcategoryName,
  setNewSubcategoryName,
}) => {
  const isEditing = editCategory?.id === category.id;

  const triggerContent = (
    <div
      className={`flex justify-between p-2 items-center align-middle cursor-pointer ${
        isEditing
          ? "bg-blue-200 bg-opacity-75 rounded-t-lg"
          : "hover:bg-blue-200 hover:bg-opacity-50"
      }`}
    >
      {isEditing ? (
        <Input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="mr-4"
          placeholder={newCategoryName}
        />
      ) : (
        <div className="flex items-center">
          <span className="font-semibold">{category.name}</span>
        </div>
      )}

      <div className="flex space-x-0 md:space-x-2 align-middle items-center">
        <Tooltip content={isEditing ? "Guardar" : "Editar"}>
          <Button
            className="bg-transparent hover:bg-blue-400 text-blue-700 hover:text-white rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              if (isEditing) {
                handleSaveCategory(category.name, category.id);
              } else {
                handleEditCategory(category);
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
        <Tooltip content={isEditing ? "Cancelar" : "Eliminar"}>
          <Button
            className="bg-transparent hover:bg-red-500 text-red-800 hover:text-white rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              if (isEditing) {
                cancelEdit();
              } else {
                handleDeleteCategory(category.id, category.name);
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
    </div>
  );

  const content = (
    <div className="mt-2">
      {category.subcategories.length > 0 && (
        <div className="grid grid-cols-1 gap-2 h-min max-h-60 overflow-auto">
          {category.subcategories.map((subcategory, index) => (
            <SubcategoryItem
              key={subcategory.subcategory_id}
              subcategory={subcategory}
              index={index}
              category={category}
              editSubcategory={editSubcategory}
              handleEditSubcategory={handleEditSubcategory}
              handleSaveSubcategory={handleSaveSubcategory}
              handleDeleteSubcategory={handleDeleteSubcategory}
              cancelEdit={cancelEditSubcategory}
              newSubcategoryName={newSubcategoryName}
              setNewSubcategoryName={setNewSubcategoryName}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div key={category.id} className="rounded-lg shadow max-h-min">
      <Disclosure triggerContent={triggerContent}>{content}</Disclosure>
    </div>
  );
};

export default React.memo(CategoryItem);
