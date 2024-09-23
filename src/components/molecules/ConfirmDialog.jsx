import React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import Button from "../atoms/Button";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  // Maneja el cierre del modal cuando se hace clic fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          className="bg-black bg-opacity-50 fixed inset-0"
          onClick={handleOverlayClick}
        />
        <AlertDialogPrimitive.Content className="bg-white p-6 rounded-md shadow-lg fixed inset-0 m-2 md:m-auto max-w-max max-h-min w-full z-50">
          <AlertDialogPrimitive.Title className="text-lg font-bold">
            Confirmación
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="mt-2 mb-4 text-gray-500">
            {message}
          </AlertDialogPrimitive.Description>
          <div className="flex justify-end space-x-2">
            <AlertDialogPrimitive.Cancel asChild>
              <Button className="bg-gray-500 text-white">Cancelar</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button className="bg-red-500 text-white" onClick={onConfirm}>
                Confirmar
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default ConfirmDialog;
