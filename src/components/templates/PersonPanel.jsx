import React, { useState, useEffect, useCallback } from "react";
import Button from "../atoms/Button";
import ConfirmDialog from "../molecules/ConfirmDialog";
import { useNotification } from "../../context/NotificationContext";
import PeopleList from "../organisms/PeopleList";
import LoadingModal from "../atoms/LoadingModal";
import AddPersonDialog from "../molecules/AddPersonDialog";
import { Plus } from "lucide-react";
import {
  fetchPersons,
  createPerson,
  updatePerson,
  deletePerson,
} from "../../services/api"; // Importar las funciones API

const PersonPanel = () => {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    message: "",
  });
  const [newPersonName, setNewPersonName] = useState("");
  const [editPerson, setEditPerson] = useState(null);

  // Acceder a las funciones de notificación
  const { addNotification } = useNotification();

  const loadPersons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchPersons();
      setPersons(response.data);
    } catch (error) {
      addNotification("error", "Error al cargar a las personas");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPersons();
  }, [loadPersons]);

  const handleAddNew = async () => {
    setIsSubmitting(true);

    if (!newPersonName) {
      addNotification(
        "warning",
        "El nombre de la persona no puede estar vacío"
      );
      setIsSubmitting(false);
      return;
    }
    try {
      await createPerson(newPersonName);
      addNotification("success", `Persona "${newPersonName}" agregada`);
      loadPersons();
    } catch (error) {
      addNotification("error", `Error al agregar a la persona: ${error}`);
    }

    setIsSubmitting(false);
    setIsDialogOpen(false);
    setNewPersonName("");
  };

  // Función para editar categorías
  const handleEditPerson = (personName) => {
    setEditPerson(personName);
    setNewPersonName(personName);
  };

  const handleSavePerson = async (oldName, personId) => {
    setIsSubmitting(true);
    if (!newPersonName) {
      addNotification(
        "warning",
        "El nombre de la persona no puede estar vacío"
      );
      setIsSubmitting(false);
      return;
    }
    try {
      await updatePerson(personId, newPersonName); // Actualizar categoría
      addNotification(
        "success",
        `Persona "${oldName}" actualizada a "${newPersonName}"`
      );
      loadPersons();
    } catch (error) {
      addNotification("error", `Error al actualizar a la persona: ${error}`);
    }
    setEditPerson(null);
    setIsSubmitting(false);
  };

  // Función para eliminar categoría
  const handleDeletePerson = (personId, personName) => {
    setConfirmDialog({
      isOpen: true,
      message: `¿Estás seguro de que quieres eliminar a la persona "${personName}"?`,
      action: async () => {
        setIsSubmitting(true);
        try {
          await deletePerson(personId); // Eliminar categoría de la API
          addNotification("info", `Persona "${personName}" eliminada`);
          loadPersons();
        } catch (error) {
          addNotification("error", `Error al eliminar a la persona: ${error}`);
        }
        setIsSubmitting(false);
        setConfirmDialog({ isOpen: false, action: null, message: "" });
      },
    });
  };

  const cancelEditPerson = () => {
    setEditPerson(null);
    setNewPersonName("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Administrar Personas</h2>
      <Button
        className="flex justify-between items-center bg-success text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="w-5 h-5" />
        Agregar Nuevo
      </Button>

      {/* Diálogo para agregar categorías o subcategorías */}
      <AddPersonDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        handleAddNew={handleAddNew}
        newPersonName={newPersonName}
        setNewPersonName={setNewPersonName}
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

      {/* Cargar lista de categorías */}
      {isLoading ? (
        <LoadingModal isLoading={isLoading} />
      ) : (
        <PeopleList
          persons={persons}
          editPerson={editPerson}
          handleEditPerson={handleEditPerson}
          handleSavePerson={handleSavePerson}
          cancelEditPerson={cancelEditPerson}
          handleDeletePerson={handleDeletePerson}
          newPersonName={newPersonName}
          setNewPersonName={setNewPersonName}
        />
      )}

      {/* Modal de carga */}
      <LoadingModal isLoading={isSubmitting} />
    </div>
  );
};

export default PersonPanel;
