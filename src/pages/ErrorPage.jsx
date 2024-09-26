import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/atoms/Button"; // Usando el botón existente

const ErrorPage = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="inset-0 bg-white/30 backdrop-blur-md rounded-lg shadow-lg" />
      <div className="relative p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </motion.div>
            <motion.h1
              className="text-2xl font-semibold text-gray-800 mb-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Oops! Algo salió mal.
            </motion.h1>
            <motion.p
              className="text-gray-600 text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Lo sentimos, no pudimos procesar tu solicitud. Por favor,
              inténtalo de nuevo más tarde.
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                onClick={onRetry} // Acción de reintento
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reintentar
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ErrorPage;
