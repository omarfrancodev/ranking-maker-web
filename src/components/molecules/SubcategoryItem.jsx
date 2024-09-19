import React from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { Edit, Trash, Save, X } from "lucide-react";

const SubcategoryItem = ({
  subcategory, // subcategory es un objeto con {subcategory_id, name}
  index,
  editSubcategory,
  handleEditSubcategory,
  handleSaveSubcategory,
  handleDeleteSubcategory,
  cancelEditSubcategory,
  category,
  newSubcategoryName,
  setNewSubcategoryName,
}) => {
  return (
    <li
      className={`flex justify-between px-4 py-2 align-middle items-center ${
        index % 2 === 0 ? "bg-transparent" : "bg-customGreen-50"
      }`}
    >
      {editSubcategory?.subcategory === subcategory.name ? ( // Aquí usamos `subcategory.name`
        <Input
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          className="mr-4"
        />
      ) : (
        <span>{subcategory.name}</span> // Asegúrate de que estamos renderizando `subcategory.name`
      )}

      <div className="flex space-x-1">
        <Button
          className="bg-transparent hover:bg-blue-300 text-blue-600 hover:text-white p-2 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            if (editSubcategory?.subcategory === subcategory.name) {
              handleSaveSubcategory(
                category.name,
                subcategory.name,
                subcategory.subcategory_id
              );
            } else {
              handleEditSubcategory(category.name, subcategory.name);
            }
          }}
        >
          {editSubcategory?.subcategory === subcategory.name ? (
            <Save className="w-5 h-5" />
          ) : (
            <Edit className="w-5 h-5" />
          )}
        </Button>
        <Button
          className="bg-transparent hover:bg-red-400 text-red-700 hover:text-white p-2 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            if (editSubcategory?.subcategory === subcategory.name) {
              cancelEditSubcategory();
            } else {
              handleDeleteSubcategory(
                subcategory.subcategory_id,
                subcategory.name
              );
            }
          }}
        >
          {editSubcategory?.subcategory === subcategory.name ? (
            <X className="w-5 h-5" />
          ) : (
            <Trash className="w-5 h-5" />
          )}
        </Button>
      </div>
    </li>
  );
};

export default SubcategoryItem;
