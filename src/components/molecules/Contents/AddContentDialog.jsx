import React, { useState, useEffect } from "react";
import Dialog from "../../atoms/Dialog";
import Input from "../../atoms/Input";
import Select from "../../atoms/Select";
import Button from "../../atoms/Button";
import {
  createContent,
  updateContent,
  fetchCategoriesWithSubcategories,
} from "../../../services/api"; // Importamos la función para obtener categorías
import TagSelect from "../../atoms/TagSelect";
import { useNotification } from "../../../context/NotificationContext";

const AddContentDialog = ({
  isOpen,
  onClose,
  onAddShow, // Función para recargar los contenidos
  editShow, // Contenido que se está editando
  isEditShow,
  onSaveShow, // Función para guardar los cambios al editar
}) => {
  const [showName, setShowName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [nonRemovableIds, setNonRemovableIds] = useState([]);

  const { addNotification } = useNotification();

  // Obtener categorías cuando se abre el diálogo
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategoriesWithSubcategories();
        setCategories(response.data); // Actualizar las categorías
      } catch (error) {
        addNotification("error", "Error al cargar las categorías.");
      }
    };

    if (isOpen) {
      loadCategories(); // Cargar las categorías al abrir el diálogo
    }
  }, [isOpen, addNotification]);

  // Manejar la edición del contenido
  useEffect(() => {
    if (editShow && categories.length > 0 && isEditShow) {
      // Buscar y eliminar categorías o subcategorías que ya no existen
      const validCategory = categories.find(
        (cat) => cat.id === editShow.category.id
      );

      if (validCategory) {
        setShowName(editShow.name);
        setSelectedCategory(editShow.category.id);

        const validSubcategories = editShow.subcategories
          .map((sub) => sub.id)
          .filter((subId) =>
            validCategory.subcategories.some(
              (sub) => sub.subcategory_id === subId
            )
          );
        setSelectedSubcategories(validSubcategories);
      } else {
        addNotification(
          "warning",
          "La categoría seleccionada ya no existe. Selecciona una nueva categoría."
        );
        setSelectedCategory("");
        setSelectedSubcategories([]);
      }
    } else if (!isEditShow) {
      // Restablecer campos si es nuevo contenido
      setShowName("");
      setSelectedCategory("");
      setSelectedSubcategories([]);
    }
  }, [editShow, categories, addNotification, isEditShow]);

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
      onClose={() => {
        onClose();
        setShowName("");
        setCategories([]);
        setSelectedCategory("");
        setSelectedSubcategories([]);
        setNonRemovableIds([]);
        editShow = null;
      }}
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
          className="bg-success text-white"
          onClick={handleAddOrUpdateShow}
        >
          Guardar
        </Button>
      </div>
    </Dialog>
  );
};

export default AddContentDialog;
