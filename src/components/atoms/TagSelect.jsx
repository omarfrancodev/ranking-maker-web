import React from "react";

const TagSelect = ({ label, value, onChange, options, lockedValues = [] }) => {
  const handleCheckboxChange = (e) => {
    const selectedValue = e.target.value;
    if (e.target.checked) {
      onChange([...value, selectedValue]); // Añadir subcategoría seleccionada
    } else {
      onChange(value.filter((val) => val !== selectedValue)); // Eliminar subcategoría deseleccionada
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option.value}
              checked={value.includes(option.value)}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-indigo-600"
              disabled={lockedValues.includes(option.value)} // Deshabilitar si está en lockedValues
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagSelect;
