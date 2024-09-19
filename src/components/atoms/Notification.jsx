import React, { useEffect, useState } from "react";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";

const Notification = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  offset,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) =>
        Math.max(oldProgress - 100 / (duration / 50), 0)
      );
    }, 50);

    const timeout = setTimeout(() => {
      onClose(); // Llamar a onClose cuando la notificación expire
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  const getNotificationStyle = () => {
    switch (type) {
      case "success":
        return "bg-success text-white";
      case "info":
        return "bg-info text-white";
      case "warning":
        return "bg-warning text-white";
      case "error":
        return "bg-error text-white";
      default:
        return "bg-info text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6" />;
      case "info":
        return <Info className="w-6 h-6" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6" />;
      case "error":
        return <XCircle className="w-6 h-6" />;
      default:
        return <Info className="w-6 h-6" />;
    }
  };

  return (
    <div
      className={`relative text-sm overflow-hidden border border-b-2 p-4 rounded-md shadow-lg flex items-center ${getNotificationStyle()}`}
      style={{
        marginTop: `${offset}px`, // Desplaza la notificación según el offset
      }}
    >
      <div>{getIcon()}</div>
      <div className="flex-1 pl-2">{message}</div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white">
        <div
          className={`h-full ${getNotificationStyle()} opacity-25 transition-all duration-100`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Notification;
