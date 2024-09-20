import React from "react";
import Notification from "../atoms/Notification";
import { useNotification } from "../../context/NotificationContext";

const NotificationContainer = ({ notifications }) => {
  const { removeNotification } = useNotification(); // Obtener la función para eliminar notificaciones

  return (
    <div className="fixed top-0 right-0 z-50 w-full md:w-2/5 min-w-min max-w-max h-max p-2 md:p-1 space-y-2">
      {notifications.map((notification, index) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration} // Asegúrate de pasar la duración correcta
          onClose={() => removeNotification(notification.id)} // Eliminar notificación por ID
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
