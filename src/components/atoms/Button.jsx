import React from "react";
import classNames from "classnames";

// Utiliza forwardRef para que se pueda pasar un ref al botón
const Button = React.forwardRef(
  (
    {
      children,
      onClick,
      className = "bg-black text-white hover:bg-gray-700",
      disabled = false, // Añadir el soporte para la propiedad disabled
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref} // Asignamos el ref aquí
        onClick={onClick}
        className={classNames(
          "px-3 py-2 rounded",
          className,
          { "opacity-50 cursor-not-allowed": disabled } // Añadir estilos cuando está deshabilitado
        )}
        disabled={disabled} // Añadir la propiedad disabled al botón
        {...props} // Asegurarse de que otras props pasen correctamente
      >
        {children}
      </button>
    );
  }
);

export default Button;
