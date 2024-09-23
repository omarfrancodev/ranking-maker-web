import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { useNotification } from "../../context/NotificationContext";
import Notification from "../atoms/Notification";

const NotificationContainer = ({ notifications }) => {
  const { removeNotification } = useNotification(); // Obtener la función para eliminar notificaciones

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration} // Pasar la duración
          onClose={() => removeNotification(notification.id)} // Eliminar notificación por ID
        />
      ))}
      <ToastPrimitive.Viewport className="fixed top-0 right-0 flex flex-col p-4 gap-4 w-full max-w-md m-0 list-none z-[2147483647] outline-none" />
    </ToastPrimitive.Provider>
  );
};

export default NotificationContainer;
