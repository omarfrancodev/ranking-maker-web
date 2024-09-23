import React from "react";

const TagSelect = ({
  label,
  value,
  onChange,
  options,
  nonRemovableIds = [],
}) => {
  const handleCheckboxChange = (optionValue) => {
    if (value.includes(optionValue)) {
      // Si ya está seleccionado y no es removible, no lo elimina
      if (!nonRemovableIds.includes(optionValue)) {
        onChange(value.filter((val) => val !== optionValue)); // Eliminar subcategoría deseleccionada
      }
    } else {
      onChange([...value, optionValue]); // Añadir subcategoría seleccionada
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 h-min max-h-32 overflow-auto">
        {options.map((option) => {
          const isSelected = value.includes(option.value);
          const isDisabled = nonRemovableIds.includes(option.value);

          return (
            <span
              key={option.value}
              className={`flex text-center items-center justify-center cursor-pointer text-sm font-medium rounded-full px-2 py-1 transition-all
                ${isDisabled && isSelected ? "bg-gray-800 text-white opacity-50" : ""} 
                ${isDisabled && !isSelected ? "bg-gray-400 text-white opacity-75" : ""}
                ${!isDisabled && isSelected ? "bg-indigo-500 text-white" : ""}
                ${!isDisabled && !isSelected ? "bg-indigo-200 text-indigo-900 md:hover:bg-indigo-500 md:hover:text-white" : ""}
                ${isDisabled ? "cursor-not-allowed" : ""}
              `}
              onClick={() => !isDisabled && handleCheckboxChange(option.value)}
            >
              <span>{option.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelect;
