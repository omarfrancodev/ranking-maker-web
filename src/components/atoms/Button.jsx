import React from "react";
import classNames from "classnames";

// Utiliza forwardRef para que se pueda pasar un ref al botón
const Button = React.forwardRef(
  (
    { children, onClick, className = "bg-black text-white hover:bg-gray-700" },
    ref
  ) => {
    return (
      <button
        ref={ref} // Asignamos el ref aquí
        onClick={onClick}
        className={classNames("p-3 rounded", className)}
      >
        {children}
      </button>
    );
  }
);

export default Button;
