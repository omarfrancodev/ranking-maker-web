// src/components/atoms/Dialog.jsx
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react"; // Importamos el icono "X"

const Dialog = ({ isOpen, onClose, children, title, description }) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
        <DialogPrimitive.Content
          className="bg-white min-w-min max-h-max max-w-max p-6 rounded-md shadow-lg fixed inset-0 m-2 md:m-auto"
          style={{
            overflowY: "auto",
          }}
        >
          {/* Agregamos un DialogTitle */}
          {title && (
            <DialogPrimitive.Title className="text-xl font-bold mt-6 mb-4">
              {title}
            </DialogPrimitive.Title>
          )}

          {/* Agregamos una descripción opcional */}
          {description && (
            <DialogPrimitive.Description className="mb-4 text-gray-500">
              {description}
            </DialogPrimitive.Description>
          )}

          {children}

          {/* Botón para cerrar el dialog con el icono X */}
          <DialogPrimitive.Close asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X className="w-6 h-6" /> {/* Icono "X" en lugar de "Close" */}
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
