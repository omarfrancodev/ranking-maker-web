import React, { useState, useRef, useEffect } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  value,
  onChange, // onChange ahora manejará el valor directamente
  options,
  placeholder = "Seleccione una opción",
}) => {
  const [search, setSearch] = useState("");
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const triggerRef = useRef(null);

  // Filtrar las opciones de acuerdo al input de búsqueda
  const filteredOptions = options.filter((option) =>
    typeof option === "string"
      ? option.toLowerCase().includes(search.toLowerCase())
      : option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (triggerRef.current) {
      setDropdownWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <SelectPrimitive.Root value={value} onValueChange={onChange}>
        <SelectPrimitive.Trigger
          ref={triggerRef}
          className="w-full border border-gray-300 rounded-md py-2 px-3 flex justify-between items-center"
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDown className="w-4 h-4" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="bg-white border border-gray-300 rounded-md z-50"
            style={{ width: dropdownWidth }}
            position="popper"
          >
            {/* Campo de búsqueda */}
            <div className="px-3 py-2 border-b">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Esto maneja el evento de input
                placeholder="Buscar..."
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <SelectPrimitive.Item
                  key={index} // Generamos una clave única para cada elemento
                  value={typeof option === "string" ? option : option.value}
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                >
                  <SelectPrimitive.ItemText>
                    {typeof option === "string" ? option : option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))
            ) : (
              <div className="py-2 px-4 text-gray-500">
                No se encontraron opciones
              </div>
            )}
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
};

export default Select;
