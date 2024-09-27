import React, { useEffect, useState, useRef } from "react";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import * as ToastPrimitive from "@radix-ui/react-toast";

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false); // Estado para controlar el hover
  const progressRef = useRef(progress);
  const intervalRef = useRef(null); // Para almacenar el intervalo de progreso
  const timeoutRef = useRef(null); // Para almacenar el timeout del cierre

  // Reducir el progreso de manera manual con un intervalo
  const startProgress = (time) => {
    intervalRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.max(oldProgress - 100 / (time / 50), 0);
        progressRef.current = newProgress;
        return newProgress;
      });
    }, 50);
  };

  const pauseProgress = () => {
    clearInterval(intervalRef.current); // Pausar el progreso
    clearTimeout(timeoutRef.current); // Cancelar el cierre automático
  };

  const resumeProgress = (newDuration) => {
    startProgress(newDuration);
    timeoutRef.current = setTimeout(() => {
      onClose(); // Cerrar la notificación
    }, newDuration);
  };

  useEffect(() => {
    startProgress(duration);

    timeoutRef.current = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [duration, onClose]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    pauseProgress();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const remainingTime = (progressRef.current / 100) * duration;
    resumeProgress(Math.max(remainingTime, 1000)); // Reanudar el progreso con al menos 1 segundo de duración
  };

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: isHovered ? getNotificationStyle() : undefined,
        opacity: isHovered ? "100%" : "90%",
      }}
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
