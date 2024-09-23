import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NotificationContainer from "../components/molecules/NotificationsContainer";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Agregar una notificación con un ID único
  const addNotification = (type, message, duration = 4000) => {
    const id = uuidv4(); // Generar un ID único usando uuid
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
  };

  // Eliminar notificación basada en su ID
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      <NotificationContainer notifications={notifications} />
      {children}
    </NotificationContext.Provider>
  );
};
