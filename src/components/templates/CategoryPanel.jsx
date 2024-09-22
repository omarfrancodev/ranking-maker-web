import React, { useState, useEffect, useCallback } from "react";
import Button from "../atoms/Button";
import ConfirmDialog from "../molecules/ConfirmDialog";
import CategoryList from "../organisms/CategoryList";
import LoadingModal from "../atoms/LoadingModal";
import { useNotification } from "../../context/NotificationContext";
import AddCategoryDialog from "../molecules/AddCategoryDialog"; // Importar el nuevo diálogo
import { Plus } from "lucide-react";
import {
  fetchCategoriesWithSubcategories,
  createCategory,
  createSubcategory,
  updateCategory,
  updateSubcategory,
  deleteCategory,
  deleteSubcategory,
} from "../../services/api"; // Importar las funciones API

const CategoryPanel = () => {
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
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isToggleDisabled, setIsToggleDisabled] = useState(false);

  // Acceder a las funciones de notificación
  const { addNotification } = useNotification();

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
        // Crear la categoría
        const newCategoryResponse = await createCategory(newCategoryName);
        addNotification("success", `Categoría "${newCategoryName}" agregada`);

        // Crear la subcategoría 'General' para la nueva categoría
        const newCategoryId = newCategoryResponse.data.id;
        await createSubcategory("General", newCategoryId);

        addNotification(
          "success",
          `Subcategoría "General" agregada a "${newCategoryName}"`
        );

        // Recargar categorías
        loadCategories();
      } catch (error) {
        addNotification(
          "error",
          `Error al agregar categoría o subcategoría: ${error}`
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
        addNotification(
          "success",
          `Subcategoría "${newSubcategoryName}" agregada a "${res.data.category.name}"`
        );
        loadCategories();
      } catch (error) {
        addNotification("error", `Error al agregar subcategoría: ${error}`);
      }
    }

    setIsSubmitting(false);
    setIsDialogOpen(false);
    setNewCategoryName("");
    setNewSubcategoryName("");
  };

  // Función para editar categorías
  const handleEditCategory = (categoryName) => {
    setEditCategory(categoryName);
    setNewCategoryName(categoryName);
    setIsToggleDisabled(true);
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
      await updateCategory(categoryId, newCategoryName); // Actualizar categoría
      addNotification(
        "success",
        `Categoría "${oldName}" actualizada a "${newCategoryName}"`
      );
      loadCategories();
    } catch (error) {
      addNotification("error", `Error al actualizar la categoría: ${error}`);
    }
    setEditCategory(null);
    setIsToggleDisabled(false);
    setIsSubmitting(false);
  };

  // Función para editar subcategorías
  const handleEditSubcategory = (categoryName, subcategoryName) => {
    setEditSubcategory({
      category: categoryName,
      subcategory: subcategoryName,
    });
    setNewSubcategoryName(subcategoryName);
    setIsToggleDisabled(true);
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
      await updateSubcategory(subcategoryId, newSubcategoryName); // Actualizar subcategoría
      addNotification(
        "success",
        `Subcategoría "${oldSubcategoryName}" actualizada`
      );
      loadCategories();
    } catch (error) {
      addNotification("error", `Error al actualizar la subcategoría: ${error}`);
    }
    setEditSubcategory(null);
    setIsToggleDisabled(false);
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
          await deleteCategory(categoryId); // Eliminar categoría de la API
          addNotification("info", `Categoría "${categoryName}" eliminada`);
          loadCategories();
        } catch (error) {
          addNotification("error", `Error al eliminar la categoría: ${error}`);
        }
        setIsSubmitting(false);
        setConfirmDialog({ isOpen: false, action: null, message: "" });
      },
    });
  };

  // Función para eliminar categoría
  const handleDeleteSubcategory = (subcategoryId, subcategoryName) => {
    setConfirmDialog({
      isOpen: true,
      message: `¿Estás seguro de que quieres eliminar la subcategoría "${subcategoryName}"?`,
      action: async () => {
        setIsSubmitting(true);
        try {
          await deleteSubcategory(subcategoryId); // Eliminar categoría de la API
          addNotification(
            "info",
            `Subcategoría "${subcategoryName}" eliminada`
          );
          loadCategories();
        } catch (error) {
          addNotification(
            "error",
            `Error al eliminar la subcategoría: ${error}`
          );
        }
        setIsSubmitting(false);
        setConfirmDialog({ isOpen: false, action: null, message: "" });
      },
    });
  };

  const cancelEditCategory = () => {
    setEditCategory(null);
    setNewCategoryName("");
    setIsToggleDisabled(false);
  };

  const cancelEditSubcategory = () => {
    setEditSubcategory(null);
    setNewSubcategoryName("");
    setIsToggleDisabled(false);
  };

  // Función para colapsar/expandir categorías
  const toggleCategoryCollapse = (categoryName) => {
    if (!isToggleDisabled) {
      setExpandedCategory(
        expandedCategory === categoryName ? null : categoryName
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Administrar Categorias</h2>
      <Button
        className="flex justify-between items-center bg-success text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="w-5 h-5" />
        Agregar Nuevo
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
        {" "}
        {/* Ajusta la altura mínima para hacer visible el loading */}
        {isLoading ? (
          <LoadingModal
            isLoading={isLoading}
            message="Cargando categorías..."
            overlay={false} // Aquí especificamos que no debe cubrir toda la pantalla
          />
        ) : (
          <CategoryList
            categories={categories}
            editCategory={editCategory}
            expandedCategory={expandedCategory}
            toggleCategoryCollapse={toggleCategoryCollapse}
            handleEditCategory={handleEditCategory}
            handleSaveCategory={handleSaveCategory}
            cancelEditCategory={cancelEditCategory}
            handleDeleteCategory={handleDeleteCategory}
            handleDeleteSubcategory={handleDeleteSubcategory}
            editSubcategory={editSubcategory}
            handleEditSubcategory={handleEditSubcategory}
            handleSaveSubcategory={handleSaveSubcategory}
            cancelEditSubcategory={cancelEditSubcategory}
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
        overlay={true} // Loading global superpuesto
      />
    </div>
  );
};

export default CategoryPanel;
