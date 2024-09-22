import React, { useState, useEffect } from "react";
import Dialog from "../atoms/Dialog";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import { createContent, updateContent } from "../../services/api";
import TagSelect from "../atoms/TagSelect";
import { useNotification } from "../../context/NotificationContext";

const AddContentDialog = ({
  isOpen,
  onClose,
  categories,
  onAddShow, // Función para recargar los contenidos
  editShow, // Contenido que se está editando
  onSaveShow, // Función para guardar los cambios al editar
}) => {
  const [showName, setShowName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [nonRemovableIds, setNonRemovableIds] = useState([]);

  const { addNotification } = useNotification();

  // Manejar la edición del contenido
  useEffect(() => {
    if (editShow) {
      setShowName(editShow.name);
      setSelectedCategory(editShow.category.id);
      setSelectedSubcategories(editShow.subcategories.map((sub) => sub.id));
    } else {
      setShowName("");
      setSelectedCategory("");
      setSelectedSubcategories([]);
    }
  }, [editShow]);

  // Controlar la selección de la subcategoría "General"
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "") {
      const category = categories.find((cat) => cat.id === selectedCategory);
      const generalSubcategory = category?.subcategories.find(
        (sub) => sub.name === "General"
      );

      if (generalSubcategory) {
        setSelectedSubcategories((prev) => {
          if (!prev.includes(generalSubcategory.subcategory_id)) {
            return [...prev, generalSubcategory.subcategory_id];
          }
          return prev;
        });
        setNonRemovableIds([generalSubcategory.subcategory_id]);
      } else {
        setNonRemovableIds([]);
      }
    }
  }, [selectedCategory, categories]);

  // Manejar la creación o actualización de contenido
  const handleAddOrUpdateShow = async () => {
    if (!showName || !selectedCategory) {
      addNotification(
        "warning",
        "El nombre del contenido y la categoría son obligatorios."
      );
      return;
    }

    const payload = {
      name: showName,
      category: selectedCategory,
      subcategories: selectedSubcategories,
    };

    try {
      if (editShow) {
        await updateContent(editShow.id, payload);
        onSaveShow(payload);
      } else {
        await createContent(payload);
        addNotification(
          "success",
          `Contenido "${showName}" agregado exitosamente.`
        );
        onAddShow(); // Recargar shows después de añadir uno nuevo
      }
      onClose();
    } catch (error) {
      addNotification(
        "error",
        `Error al ${editShow ? "actualizar" : "añadir"} contenido: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error("Error al añadir/actualizar contenido:", error);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={editShow ? "Editar contenido" : "Añadir nuevo contenido"}
      description="Escoja un nombre, una categoría y las subcategorías del contenido que quiera agregar"
    >
      <Input
        label="Nombre del contenido"
        value={showName}
        onChange={(e) => setShowName(e.target.value)}
      />

      <Select
        label="Categoría"
        value={selectedCategory}
        onChange={(value) => {
          setSelectedCategory(value);
          setSelectedSubcategories([]); // Limpiar subcategorías al cambiar categoría
        }}
        options={categories.map((cat) => ({ label: cat.name, value: cat.id }))}
      />

      {selectedCategory && selectedCategory !== "" && (
        <TagSelect
          label="Subcategorías"
          value={selectedSubcategories}
          onChange={setSelectedSubcategories}
          options={
            categories
              .find((cat) => cat.id === selectedCategory)
              ?.subcategories.map((sub) => ({
                label: sub.name,
                value: sub.subcategory_id,
              })) || []
          }
          nonRemovableIds={nonRemovableIds} // Pasar IDs que no se pueden deseleccionar
        />
      )}

      <div className="flex justify-center w-full">
        <Button
          className="bg-success text-white mt-4"
          onClick={handleAddOrUpdateShow}
        >
          {editShow ? "Guardar cambios" : "Añadir nuevo contenido"}
        </Button>
      </div>
    </Dialog>
  );
};

export default AddContentDialog;
