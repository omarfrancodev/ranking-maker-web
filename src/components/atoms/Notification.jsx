import React, { useEffect, useState } from "react";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import * as ToastPrimitive from "@radix-ui/react-toast";

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(100); // Controlamos el progreso de manera manual

  useEffect(() => {
    // Reducimos el progreso conforme pasa el tiempo
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
        return "bg-green-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white";
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
    <ToastPrimitive.Root
      className={`flex items-center p-4 rounded-md shadow-md ${getNotificationStyle()} gap-x-2 relative overflow-hidden`}
      duration={duration}
      onOpenChange={onClose}
    >
      <div>{getIcon()}</div>
      <ToastPrimitive.Description className="flex-1">
        {message}
      </ToastPrimitive.Description>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <div
          className={`h-full ${getNotificationStyle()} opacity-50`}
          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
        />
      </div>
    </ToastPrimitive.Root>
  );
};

export default Notification;
