import React from "react";
import { Loader } from "lucide-react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg flex items-center space-x-2">
        <Loader className="animate-spin w-6 h-6 text-blue-500" />
        <span>Cargando...</span>
      </div>
    </div>
  );
};

export default LoadingModal;
