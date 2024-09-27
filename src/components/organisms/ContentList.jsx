import React, { useState } from "react";
import ContentItem from "../molecules/Contents/ContentItem";
import Pagination from "../atoms/Pagination";
import Select from "../atoms/Select"; // Importar tu Select atom
import { motion } from "framer-motion";

const ContentList = ({
  shows,
  onEdit,
  onDelete,
  currentPage,
  setCurrentPage,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(8); // Por defecto, 8 elementos por página

  const totalPages = Math.ceil(shows.length / itemsPerPage);

  // Control de cambio de página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Control de cambio de elementos por página
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value)); // Convertir el valor a número
    setCurrentPage(1); // Resetear a la primera página cuando cambie el número de elementos
  };

  // Calcular los elementos que se deben mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShows = shows.slice(indexOfFirstItem, indexOfLastItem);

  // Animaciones de framer-motion
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return shows.length > 0 ? (
    <div className="space-y-4">
      {/* Select para cambiar el número de elementos por página */}
      {shows.length > 0 && (
        <div className="flex justify-between mb-4">
          <Select
            label="Contenidos por página"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange} // Usar el manejador de cambio
            options={[
              { value: 8, key: 8 },
              { value: 16, key: 16 },
              { value: 32, key: 32 },
              { value: 64, key: 64 },
            ]}
          />
          <label className="text-base font-semibold w-32 text-end">
            Total de contenidos: {shows.length}
          </label>
        </div>
      )}

      {/* Mostrar los elementos paginados con animaciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {currentShows.map((show, index) => (
          <motion.div
            key={show.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.075 }} // Delay incremental por cada item
          >
            <ContentItem show={show} onEdit={onEdit} onDelete={onDelete} />
          </motion.div>
        ))}
      </div>

      {/* Componente de paginación */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  ) : (
    <div className="flex w-full h-full justify-center items-center align-middle">
      <motion.h1
        className="text-2xl h-full font-semibold text-gray-800 mb-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        No se encontraron contenidos.
      </motion.h1>
    </div>
  );
};

export default ContentList;
