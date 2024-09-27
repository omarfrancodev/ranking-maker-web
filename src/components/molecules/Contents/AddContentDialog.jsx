import React, { useState, useEffect } from "react";
import Dialog from "../../atoms/Dialog";
import Input from "../../atoms/Input";
import Select from "../../atoms/Select";
import Button from "../../atoms/Button";
import LoadingModal from "../../atoms/LoadingModal"; // Importamos el LoadingModal
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
  editShow, // Contenido que se está editando
  isEditShow,
  onSaveShow, // Función para guardar los cambios al editar
  onAddShow, // Función para recargar los contenidos
  setIsSaving,
}) => {
  const [showName, setShowName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [nonRemovableIds, setNonRemovableIds] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [releaseYear, setReleaseYear] = useState("");

  const { addNotification } = useNotification();

  // Obtener categorías cuando se abre el diálogo
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetchCategoriesWithSubcategories();
        setCategories(response.data); // Actualizar las categorías
      } catch (error) {
        addNotification("error", "Error al cargar las categorías.");
      } finally {
        setIsLoadingCategories(false);
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
        setReleaseYear(editShow.release_year || "");

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
      setReleaseYear("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editShow, categories, isEditShow]);

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
      release_year: releaseYear || null,
    };

    console.log(payload);

    try {
      if (editShow) {
        setIsSaving(true);
        await updateContent(editShow.id, payload);
        addNotification(
          "success",
          `Contenido "${payload.name}" actualizado exitosamente.`
        );
        setIsSaving(false);
        onSaveShow();
      } else {
        setIsSaving(true);
        await createContent(payload);
        addNotification(
          "success",
          `Contenido "${showName}" agregado exitosamente.`
        );
        setIsSaving(false);
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
        setReleaseYear("");
        editShow = null;
      }}
      title={editShow ? "Editar contenido" : "Añadir nuevo contenido"}
      description="Escoja un nombre, una categoría, subcategorías y el año de lanzamiento del contenido."
    >
      {/* Mostrar LoadingModal mientras se cargan las categorías */}
      {isLoadingCategories ? (
        <div className="flex justify-center items-center h-48">
          <LoadingModal
            isLoading={true}
            message="Cargando datos..."
            overlay={false}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap md:grid md:grid-cols-3 gap-x-2">
            <Input
              label="Nombre del contenido"
              value={showName}
              onChange={(e) => setShowName(e.target.value)}
              placeholder="ej. El Origen"
              classNames="w-full md:col-span-2"
            />

            <Input
              label="Año de lanzamiento" // Nuevo campo de año de lanzamiento
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="ej. 2010"
              type="number" // Especificar que solo se pueden ingresar números
              classNames="w-full md:col-span-1"
            />
          </div>
          <Select
            label="Categoría"
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
              setSelectedSubcategories([]); // Limpiar subcategorías al cambiar categoría
            }}
            options={categories.map((cat) => ({
              value: cat.name,
              key: cat.id,
            }))}
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
        </>
      )}
    </Dialog>
  );
};

export default AddContentDialog;
