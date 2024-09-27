import React, { useState, useEffect, useCallback } from "react";
import ContentList from "../organisms/ContentList";
import AddContentDialog from "../molecules/Contents/AddContentDialog";
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
import Combobox from "../atoms/Combobox";
import ErrorPage from "../../pages/ErrorPage";

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
  const [currentPage, setCurrentPage] = useState(1); // Nuevo estado para controlar la página actual
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    showId: null,
  });
  const [hasErrorCategories, setHasErrorCategories] = useState(false); // Estado para manejar errores de categorías
  const [hasErrorShows, setHasErrorShows] = useState(false); // Estado para manejar errores de shows
  const { addNotification } = useNotification();

  const loadShows = useCallback(async () => {
    if (!selectedCategory) return;
    setIsLoadingShows(true);
    setHasErrorShows(false);
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
      setHasErrorShows(true);
    }
    setIsLoadingShows(false);
  }, [selectedCategory, selectedSubcategory]);

  useEffect(() => {
    if (selectedCategory) {
      loadShows();
    }
  }, [loadShows, selectedCategory]);

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    setHasErrorCategories(false);
    try {
      const response = await fetchCategoriesWithSubcategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      setHasErrorCategories(true); // Si ocurre un error, establecer el estado de error en verdadero
      addNotification(
        "error",
        `Error al cargar los datos: ${error}. Inténtelo más tarde. `
      );
    }
    setIsLoadingCategories(false);
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si ocurre un error grave al cargar datos, mostrar la página de error
  if (hasErrorCategories) {
    return <ErrorPage onRetry={loadCategories} />;
  }

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones de manejo de contenido
  const handleEditShow = (show) => {
    setIsEditOption(true);
    setEditShow(show);
    setIsDialogOpen(true);
  };

  const handleSaveShow = async () => {
    setIsDialogOpen(false);
    setIsEditOption(false);
    setEditShow(null);
    loadShows();
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

      <p className="text-base md:text-lg mb-2">
        Seleccione una categoría para mostrar el contenido disponible. Una vez
        hayan contenidos a la vista, puede darle clic para ver detalles sobre
        los mismos.
      </p>

      {/* Mostrar loading de categorías o los selectores cuando estén cargadas */}
      {isLoadingCategories ? (
        <LoadingModal
          isLoading={isLoadingCategories}
          message="Cargando datos necesarios..."
          overlay={false}
        />
      ) : (
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-end gap-x-2">
          <div className="flex flex-wrap md:grid md:grid-cols-4 justify-center md:justify-between gap-x-2 md:gap-x-4 items-end">
            <>
              <Select
                className="w-full"
                label="Categoría"
                value={selectedCategory}
                onChange={(value) => {
                  const selectedCat = categories.find(
                    (category) => category.id === value
                  ); // Guardar la categoría seleccionada
                  if (selectedCat && selectedCat.subcategories) {
                    // Verificar si la categoría tiene subcategorías
                    const generalSubcategory = selectedCat.subcategories.find(
                      (subcategory) => subcategory.name === "General"
                    );
                    setSelectedSubcategory(
                      generalSubcategory
                        ? generalSubcategory.subcategory_id
                        : undefined
                    );
                  } else {
                    setSelectedSubcategory(undefined); // No hay subcategorías o categoría inválida
                  }
                  setSelectedCategory(value); // Actualizar la categoría seleccionada
                }}
                options={[
                  { value: "Todos", key: "all" },
                  ...categories.map((cat) => ({
                    value: cat.name,
                    key: cat.id,
                  })),
                ]}
              />

              {selectedCategory && selectedCategory !== "all" && (
                <Select
                  label="Subcategoría"
                  value={selectedSubcategory}
                  onChange={(value) => {
                    setSelectedSubcategory(value);
                    setCurrentPage(1);
                  }}
                  options={
                    categories
                      .find((cat) => cat.id === selectedCategory)
                      ?.subcategories.map((sub) => ({
                        value: sub.name,
                        key: sub.subcategory_id,
                      })) || []
                  }
                />
              )}
              {/* Combobox para buscar contenido */}
              {selectedCategory && (
                <div className="hidden md:block md:col-span-2">
                  <Combobox
                    label="Buscar contenido"
                    value={searchTerm}
                    onChange={(val) => {
                      setSearchTerm(val);
                      setCurrentPage(1); // Resetear a la primera página cuando cambie el término de búsqueda
                    }}
                    options={filteredShows.map((show) => ({
                      key: show.id,
                      value: show.name, // Usar el valor del nombre para las búsquedas
                    }))}
                    placeholder="Buscar por nombre..."
                    className="w-full md:w-auto mb-4"
                  />
                </div>
              )}
            </>
          </div>

          <Button
            className="flex justify-between gap-x-1 items-center mb-4 bg-success text-white"
            onClick={() => {
              setIsDialogOpen(true);
              setIsEditOption(false);
            }}
            disabled={
              isLoadingCategories ||
              categories.length === 0 ||
              hasErrorCategories
            }
          >
            <span>Agregar contenido</span>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      )}
      {/* Combobox debajo de los selectores en móvil */}
      {selectedCategory && (
        <div className="mb-4 md:mb-6 md:hidden">
          <Combobox
            label="Buscar contenido"
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1); // Resetear a la primera página cuando cambie el término de búsqueda
            }}
            options={filteredShows.map((show) => ({
              key: show.id,
              value: show.name, // Usar el valor del nombre para las búsquedas
            }))}
            placeholder="Buscar por nombre..."
            className="w-full"
          />
        </div>
      )}

      <div className="relative min-h-[200px] h-full">
        {isLoadingShows ? (
          <LoadingModal
            isLoading={isLoadingShows}
            message="Cargando contenido..."
            overlay={false}
          />
        ) : hasErrorShows ? (
          <ErrorPage onRetry={loadShows} />
        ) : (
          !isLoadingCategories &&
          !isLoadingShows &&
          !hasErrorShows &&
          selectedCategory !== "" && (
            <ContentList
              shows={filteredShows}
              onEdit={handleEditShow}
              onDelete={(showId, showName) =>
                openDeleteConfirmation(showId, showName)
              } // Pasar id y nombre
              currentPage={currentPage} // Pasar la página actual
              setCurrentPage={setCurrentPage} // Pasar la función para cambiar la página
            />
          )
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
        editShow={editShow}
        isEditShow={isEditOption}
        onSaveShow={handleSaveShow} // Cambiar "onSave" a "onSaveShow"
        onAddShow={loadShows} // Añadir "onAddShow" para recargar contenidos después de añadir uno nuevo
        setIsSaving={setIsSaving}
      />
    </div>
  );
};

export default ContentPanel;
