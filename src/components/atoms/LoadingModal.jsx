import { Loader } from "lucide-react";

// Modificar el componente LoadingModal para permitir una versión inline
const LoadingModal = ({
  isLoading,
  message = "Cargando...",
  overlay = true,
}) => {
  if (!isLoading) return null;

  // Si overlay es falso, hacer que ocupe el espacio como un div normal.
  if (!overlay) {
    return (
      <div className="flex items-center justify-center w-full py-2 m-4">
        <div className="text-gray-700 flex items-center space-x-2">
          <Loader className="animate-spin w-6 h-6 text-blue-500" />
          <p>{message}</p>
        </div>
      </div>
    );
  }

  // Si es con overlay (posición fija sobre toda la pantalla)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg text-center flex items-center space-x-2">
        <Loader className="animate-spin w-6 h-6 text-blue-500" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
