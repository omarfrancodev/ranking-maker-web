import React, { useState, useEffect, useCallback } from "react";
import ContentList from "../organisms/ContentList";
import AddContentDialog from "../molecules/AddContentDialog";
import ConfirmDialog from "../molecules/ConfirmDialog"; // Importamos ConfirmDialog
import { Plus } from "lucide-react";
import {
  fetchCategoriesWithSubcategories,
  filterContents,
  deleteContent,
} from "../../services/api";
import Button from "../atoms/Button";
import Select from "../atoms/Select";
import LoadingModal from "../atoms/LoadingModal";
import { useNotification } from "../../context/NotificationContext";

const ContentPanel = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [shows, setShows] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingShows, setIsLoadingShows] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editShow, setEditShow] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    showId: null,
  });
  const { addNotification } = useNotification();

  const loadShows = useCallback(async () => {
    if (!selectedCategory) return;
    setIsLoadingShows(true);
    const filters = {};
    if (selectedCategory && selectedCategory !== "all") {
      filters.category = selectedCategory;
    }
    if (selectedSubcategory && selectedSubcategory !== "all") {
      filters.subcategory = selectedSubcategory;
    }
    try {
      const response = await filterContents(filters);
      setShows(response);
    } catch (error) {
      console.error("Error al cargar shows:", error);
    }
    setIsLoadingShows(false);
  }, [selectedCategory, selectedSubcategory]);

  useEffect(() => {
    if (selectedCategory) {
      loadShows();
    }
  }, [loadShows, selectedCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetchCategoriesWithSubcategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
      setIsLoadingCategories(false);
    };
    loadCategories();
  }, []);

  // Funciones de manejo de contenido
  const handleEditShow = (show) => {
    setEditShow(show);
    setIsDialogOpen(true);
  };

  const handleSaveShow = async (updatedShow) => {
    addNotification(
      "success",
      `Contenido "${updatedShow.name}" actualizado exitosamente.`
    );
    setIsDialogOpen(false);
    loadShows();
  };

  const handleDeleteShow = async (showId) => {
    try {
      await deleteContent(showId);
      addNotification("info", "Contenido eliminado.");
      loadShows();
    } catch (error) {
      addNotification(
        "error",
        `Error al eliminar el contenido: ${error.message}`
      );
    }
  };

  const openDeleteConfirmation = (showId, showName) => {
    setConfirmDialog({
      isOpen: true,
      showId,
      showName, // Pasar también el nombre del contenido
    });
  };

  const confirmDelete = () => {
    handleDeleteShow(confirmDialog.showId);
    setConfirmDialog({ isOpen: false, showId: null });
  };

  return (
    <div>
      <p className="text-lg mb-2">
        Seleccione una categoría para mostrar el contenido disponible
      </p>

      {/* Mostrar loading de categorías o los selectores cuando estén cargadas */}
      <div className="flex justify-between items-center space-x-2 mb-4">
        <div className="flex space-x-4">
          {isLoadingCategories ? (
            <LoadingModal
              isLoading={isLoadingCategories}
              message="Cargando datos necesarios..."
              overlay={false}
            />
          ) : (
            <>
              <Select
                label="Categoría"
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value);
                  setSelectedSubcategory("");
                }}
                options={[
                  { label: "Todos", value: "all" },
                  ...categories.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                  })),
                ]}
              />

              {selectedCategory && selectedCategory !== "all" && (
                <Select
                  label="Subcategoría"
                  value={selectedSubcategory}
                  onChange={(value) => setSelectedSubcategory(value)}
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
            </>
          )}
        </div>
        <Button
          className="flex items-center mb-4 bg-success space-x-2 text-white"
          onClick={() => setIsDialogOpen(true)}
          disabled={isLoadingCategories || categories.length === 0}
        >
          <span className="hidden md:inline">Agregar contenido</span>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative min-h-[200px]">
        {isLoadingShows ? (
          <LoadingModal
            isLoading={isLoadingShows}
            message="Cargando contenido..."
            overlay={false}
          />
        ) : (
          <ContentList
            shows={shows}
            onEdit={handleEditShow}
            onDelete={(showId, showName) =>
              openDeleteConfirmation(showId, showName)
            } // Pasar id y nombre
          />
        )}
      </div>

      {/* ConfirmDialog para eliminar */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, showId: null, showName: null })
        }
        onConfirm={confirmDelete}
        message={`¿Estás seguro de que deseas eliminar el contenido "${confirmDialog.showName}"?`} // Mostrar el nombre
      />

      {/* Modal para añadir o editar show */}
      <AddContentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categories={categories}
        editShow={editShow}
        onSaveShow={handleSaveShow} // Cambiar "onSave" a "onSaveShow"
        onAddShow={loadShows} // Añadir "onAddShow" para recargar contenidos después de añadir uno nuevo
      />
    </div>
  );
};

export default ContentPanel;
