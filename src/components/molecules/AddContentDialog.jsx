import React, { useState, useEffect } from "react";
import Dialog from "../atoms/Dialog";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import { createContent } from "../../services/api";
import TagSelect from "../atoms/TagSelect";
import { useNotification } from "../../context/NotificationContext";

const AddContentDialog = ({
  isOpen,
  onClose,
  categories,
  onAddShow,
  editShow,
  onSaveShow,
}) => {
  const [showName, setShowName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const { addNotification } = useNotification();

  useEffect(() => {
    if (editShow) {
      setShowName(editShow.name);
      setSelectedCategory(editShow.category.id);
      setSelectedSubcategories(editShow.subcategories.map((sub) => sub.id));
    }
    if (selectedCategory && selectedCategory !== "") {
      const category = categories.find((cat) => cat.id === selectedCategory);
      const generalSubcategory = category?.subcategories.find(
        (sub) => sub.name === "General"
      );

      if (generalSubcategory) {
        setSelectedSubcategories([generalSubcategory.name]); // Forzar que "General" esté seleccionada
      }
    }
  }, [selectedCategory, categories, editShow]);

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

    if (editShow) {
      // Modo edición
      onSaveShow({ ...editShow, ...payload });
    } else {
      // Modo creación
      try {
        await createContent(payload);
        addNotification(
          "success",
          `Contenido "${showName}" agregado exitosamente.`
        );
        onAddShow(); // Recargar shows
        onClose();
      } catch (error) {
        addNotification(
          "error",
          `Error al añadir contenido: ${error.response?.data?.message || error.message}`
        );
        console.error("Error al añadir contenido:", error);
      }
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
        />
      )}

      <div className="flex justify-center w-full">
        <Button
          className="bg-success text-white mt-4"
          onClick={handleAddOrUpdateShow}
        >
          {editShow ? "Editar contenido" : "Añadir nuevo contenido"}
        </Button>
      </div>
    </Dialog>
  );
};

export default AddContentDialog;
