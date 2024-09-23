import React, { useState, useEffect, useCallback } from "react";
import ContentList from "../organisms/ContentList";
import AddContentDialog from "../molecules/Categories/AddContentDialog";
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
import Input from "../atoms/Input";

const ContentPanel = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [shows, setShows] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingShows, setIsLoadingShows] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Estado para controlar el overlay de guardado
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOption, setIsEditOption] = useState(false);
  const [editShow, setEditShow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones de manejo de contenido
  const handleEditShow = (show) => {
    setIsEditOption(true);
    setEditShow(show);
    setIsDialogOpen(true);
  };

  const handleSaveShow = async (updatedShow) => {
    setIsSaving(true); // Mostrar el overlay de guardado
    try {
      // Simular la operación de guardado (puede ser una operación de API)
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulando operación asíncrona
      addNotification(
        "success",
        `Contenido "${updatedShow.name}" actualizado exitosamente.`
      );
      setIsDialogOpen(false);
      loadShows();
    } catch (error) {
      addNotification("error", "Error al actualizar el contenido.");
    } finally {
      setIsSaving(false); // Ocultar el overlay de guardado
    }
  };

  const handleDeleteShow = async (showId) => {
    setIsSaving(true); // Mostrar el overlay de guardado
    try {
      await deleteContent(showId);
      addNotification("info", "Contenido eliminado.");
      loadShows();
    } catch (error) {
      addNotification(
        "error",
        `Error al eliminar el contenido: ${error.message}`
      );
    } finally {
      setIsSaving(false); // Ocultar el overlay de guardado
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
      {/* Mostrar loading overlay cuando se está guardando */}
      {isSaving && (
        <LoadingModal
          isLoading={isSaving}
          message="Guardando cambios..."
          overlay={true} // Mostrar overlay
        />
      )}

      <p className="text-lg mb-2">
        Seleccione una categoría para mostrar el contenido disponible. Una vez
        hayan contenidos a la vista, puede darle clic para ver detalles sobre
        los mismos.
      </p>

      {/* Mostrar loading de categorías o los selectores cuando estén cargadas */}
      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-end gap-x-2">
        <div className="flex justify-center md:justify-between flex-wrap md:flex-nowrap gap-x-2 md:space-x-4 items-end">
          {isLoadingCategories ? (
            <LoadingModal
              isLoading={isLoadingCategories}
              message="Cargando datos necesarios..."
              overlay={false}
            />
          ) : (
            <>
              <Select
                className="w-full"
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
              {selectedCategory && (
                <div className="hidden md:inline-flex">
                  <Input
                    label="Buscar contenido"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nombre..."
                    className="w-full md:w-auto mb-4"
                  />
                </div>
              )}
            </>
          )}
        </div>
        <Button
          className="flex justify-between gap-x-1 items-center mb-4 bg-success text-white"
          onClick={() => {
            setIsDialogOpen(true);
            setIsEditOption(false);
          }}
          disabled={isLoadingCategories || categories.length === 0}
        >
          <span>Agregar contenido</span>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Buscador debajo de los selectores en móvil */}
      {selectedCategory && (
        <div className="mb-4 md:mb-6 md:hidden">
          <Input
            label="Buscar contenido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full"
          />
        </div>
      )}

      <div className="relative min-h-[200px]">
        {isLoadingShows ? (
          <LoadingModal
            isLoading={isLoadingShows}
            message="Cargando contenido..."
            overlay={false}
          />
        ) : (
          <ContentList
            shows={filteredShows}
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
        isEditShow={isEditOption}
        onSaveShow={handleSaveShow} // Cambiar "onSave" a "onSaveShow"
        onAddShow={loadShows} // Añadir "onAddShow" para recargar contenidos después de añadir uno nuevo
      />
    </div>
  );
};

export default ContentPanel;
