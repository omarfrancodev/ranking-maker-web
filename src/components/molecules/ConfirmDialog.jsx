import React from "react";
import Button from "../atoms/Button";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  // Maneja el cierre del modal cuando se hace clic fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick} // Llama a onClose si se hace clic en el fondo
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <p>{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button className="bg-red-500 text-white" onClick={onConfirm}>
            Confirmar
          </Button>
          <Button className="bg-gray-500 text-white" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
