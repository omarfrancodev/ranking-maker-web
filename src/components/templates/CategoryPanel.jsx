import React, { useState, useEffect, useCallback } from "react";
import Button from "../atoms/Button";
import ConfirmDialog from "../molecules/ConfirmDialog";
import CategoryList from "../organisms/CategoryList";
import LoadingModal from "../atoms/LoadingModal";
import { useNotification } from "../../context/NotificationContext";
import AddCategoryDialog from "../molecules/Categories/AddCategoryDialog";
import { Plus } from "lucide-react";
import {
  fetchCategoriesWithSubcategories,
  createCategory,
  createSubcategory,
  updateCategory,
  updateSubcategory,
  deleteCategory,
  deleteSubcategory,
} from "../../services/api";

const CategoryPanel = () => {
  // Estado
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    message: "",
  });
  const [newItemType, setNewItemType] = useState("Categoría");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [editSubcategory, setEditSubcategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { addNotification } = useNotification();

  // Cargar categorías al iniciar
  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchCategoriesWithSubcategories();
      setCategories(response.data);
    } catch (error) {
      addNotification("error", "Error al cargar categorías");
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Función para agregar una nueva categoría o subcategoría
  const handleAddNew = async () => {
    setIsSubmitting(true);

    if (newItemType === "Categoría") {
      if (!newCategoryName) {
        addNotification(
          "warning",
          "El nombre de la categoría no puede estar vacío"
        );
        setIsSubmitting(false);
        return;
      }
      try {
        const newCategoryResponse = await createCategory(newCategoryName);

        // Crear la subcategoría 'General' para la nueva categoría
        const newCategoryId = newCategoryResponse.data.id;
        await createSubcategory("General", newCategoryId);

        addNotification(
          "success",
          `Subcategoría "General" agregada a "${newCategoryName}"`
        );

        addNotification("success", `Categoría "${newCategoryName}" agregada`);

        // Limpiar el estado
        setNewCategoryName("");
        setIsDialogOpen(false);
        // Recargar categorías
        loadCategories();
      } catch (error) {
        addNotification(
          "error",
          `Error al agregar categoría: ${error.message}`
        );
      }
    } else if (newItemType === "Subcategoría") {
      if (!selectedCategory) {
        addNotification("warning", "Debes seleccionar una categoría");
        setIsSubmitting(false);
        return;
      }
      if (!newSubcategoryName) {
        addNotification(
          "warning",
          "El nombre de la subcategoría no puede estar vacío"
        );
        setIsSubmitting(false);
        return;
      }
      try {
        const res = await createSubcategory(
          newSubcategoryName,
          selectedCategory
        );

        // Actualizar las subcategorías de la categoría seleccionada
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === selectedCategory
              ? {
                  ...category,
                  subcategories: [...category.subcategories, res.data],
                }
              : category
          )
        );

        addNotification(
          "success",
          `Subcategoría "${newSubcategoryName}" agregada`
        );

        // Limpiar el estado
        setNewSubcategoryName("");
        setIsDialogOpen(false);
      } catch (error) {
        addNotification(
          "error",
          `Error al agregar subcategoría: ${error.message}`
        );
      }
    }

    setIsSubmitting(false);
  };

  // Función para editar categoría
  const handleEditCategory = (category) => {
    setEditCategory(category);
    setNewCategoryName(category.name);
    setIsEditMode(true);
  };

  const handleSaveCategory = async (oldName, categoryId) => {
    setIsSubmitting(true);
    if (!newCategoryName) {
      addNotification(
        "warning",
        "El nombre de la categoría no puede estar vacío"
      );
      setIsSubmitting(false);
      return;
    }
    try {
      await updateCategory(categoryId, newCategoryName);

      // Actualizar la categoría sin recargar toda la lista
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, name: newCategoryName }
            : category
        )
      );

      addNotification("success", `Categoría "${oldName}" actualizada`);
      setEditCategory(null);
      setNewCategoryName("");
      setIsEditMode(false);
    } catch (error) {
      addNotification(
        "error",
        `Error al actualizar la categoría: ${error.message}`
      );
    }
    setIsSubmitting(false);
  };

  // Función para editar subcategoría
  const handleEditSubcategory = (subcategory) => {
    setEditSubcategory(subcategory);
    setNewSubcategoryName(subcategory.name);
    setIsEditMode(true);
  };

  const handleSaveSubcategory = async (
    categoryName,
    oldSubcategoryName,
    subcategoryId
  ) => {
    setIsSubmitting(true);
    if (!newSubcategoryName) {
      addNotification(
        "warning",
        "El nombre de la subcategoría no puede estar vacío"
      );
      setIsSubmitting(false);
      return;
    }
    try {
      await updateSubcategory(subcategoryId, newSubcategoryName);

      // Actualizar la subcategoría sin recargar toda la lista
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.subcategories.some((sub) => sub.id === subcategoryId)
            ? {
                ...category,
                subcategories: category.subcategories.map((sub) =>
                  sub.id === subcategoryId
                    ? { ...sub, name: newSubcategoryName }
                    : sub
                ),
              }
            : category
        )
      );

      addNotification(
        "success",
        `Subcategoría "${oldSubcategoryName}" actualizada`
      );
      setEditSubcategory(null);
      setNewSubcategoryName("");
      setIsEditMode(false);
    } catch (error) {
      addNotification(
        "error",
        `Error al actualizar la subcategoría: ${error.message}`
      );
    }
    setIsSubmitting(false);
  };

  // Función para eliminar categoría
  const handleDeleteCategory = (categoryId, categoryName) => {
    setConfirmDialog({
      isOpen: true,
      message: `¿Estás seguro de que quieres eliminar la categoría "${categoryName}"?`,
      action: async () => {
        setIsSubmitting(true);
        try {
          await deleteCategory(categoryId);

          // Eliminar la categoría sin recargar toda la lista
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
          );

          addNotification("info", `Categoría "${categoryName}" eliminada`);
        } catch (error) {
          addNotification(
            "error",
            `Error al eliminar la categoría: ${error.message}`
          );
        }
        setIsSubmitting(false);
        setConfirmDialog({ isOpen: false, action: null, message: "" });
      },
    });
  };

  // Función para eliminar subcategoría
  const handleDeleteSubcategory = (subcategoryId, subcategoryName) => {
    setConfirmDialog({
      isOpen: true,
      message: `¿Estás seguro de que quieres eliminar la subcategoría "${subcategoryName}"?`,
      action: async () => {
        setIsSubmitting(true);
        try {
          await deleteSubcategory(subcategoryId);

          // Eliminar la subcategoría sin recargar toda la lista
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.subcategories.some((sub) => sub.id === subcategoryId)
                ? {
                    ...category,
                    subcategories: category.subcategories.filter(
                      (sub) => sub.id !== subcategoryId
                    ),
                  }
                : category
            )
          );

          addNotification(
            "info",
            `Subcategoría "${subcategoryName}" eliminada`
          );
        } catch (error) {
          addNotification(
            "error",
            `Error al eliminar la subcategoría: ${error.message}`
          );
        }
        setIsSubmitting(false);
        setConfirmDialog({ isOpen: false, action: null, message: "" });
      },
    });
  };

  const cancelEditCategory = () => {
    setEditCategory(null);
    setIsEditMode(false);
    setNewCategoryName("");
  };

  const cancelEditSubcategory = () => {
    setEditSubcategory(null);
    setIsEditMode(false);
    setNewSubcategoryName("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Administrar Categorías</h2>
      <Button
        className="flex justify-between items-center gap-x-2 bg-success text-white"
        onClick={() => setIsDialogOpen(true)}
        disabled={isEditMode}
      >
        Agregar Nuevo
        <Plus className="w-5 h-5" />
      </Button>

      {/* Diálogo para agregar categorías o subcategorías */}
      <AddCategoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categories={categories}
        handleAddNew={handleAddNew}
        newItemType={newItemType}
        setNewItemType={setNewItemType}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        newSubcategoryName={newSubcategoryName}
        setNewSubcategoryName={setNewSubcategoryName}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, action: null, message: "" })
        }
        onConfirm={confirmDialog.action}
        message={confirmDialog.message}
      />

      {/* Contenedor de categorías */}
      <div className="relative min-h-52">
        {isLoading ? (
          <LoadingModal
            isLoading={isLoading}
            message="Cargando categorías..."
            overlay={false}
          />
        ) : (
          <CategoryList
            categories={categories}
            editCategory={editCategory}
            editSubcategory={editSubcategory}
            handleEditCategory={handleEditCategory}
            handleSaveCategory={handleSaveCategory}
            cancelEdit={cancelEditCategory}
            cancelEditSubcategory={cancelEditSubcategory}
            handleDeleteCategory={handleDeleteCategory}
            handleDeleteSubcategory={handleDeleteSubcategory}
            handleEditSubcategory={handleEditSubcategory}
            handleSaveSubcategory={handleSaveSubcategory}
            newCategoryName={newCategoryName}
            setNewCategoryName={setNewCategoryName}
            newSubcategoryName={newSubcategoryName}
            setNewSubcategoryName={setNewSubcategoryName}
          />
        )}
      </div>

      {/* Loading global superpuesto para acciones de envío */}
      <LoadingModal
        isLoading={isSubmitting}
        message="Guardando cambios..."
        overlay={true}
      />
    </div>
  );
};

export default CategoryPanel;
