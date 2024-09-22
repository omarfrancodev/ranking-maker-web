import React from "react";
import { Loader } from "lucide-react";

const LoadingModal = ({
  isLoading,
  message = "Cargando...",
  overlay = true,
}) => {
  if (!isLoading) return null;

  return (
    <div
      className={`${
        overlay
          ? "fixed inset-0 z-50 bg-gray-900 bg-opacity-50 "
          : "absolute w-full h-full"
      } flex justify-center items-center`}
    >
      <div
        className={`${overlay ? "bg-white" : "bg-transparent"} p-4 rounded flex items-center space-x-2`}
      >
        <Loader className="animate-spin w-6 h-6 text-blue-500" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default LoadingModal;
