import * as Ariakit from "@ariakit/react";
import { matchSorter } from "match-sorter";
import { useMemo, useState } from "react";

const Combobox = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seleccione una opción",
}) => {
  const [searchValue, setSearchValue] = useState("");

  // Filtrar las opciones usando matchSorter
  const matches = useMemo(
    () => matchSorter(options, searchValue, { keys: ["value"] }),
    [searchValue, options]
  );

  return (
    <div className="mb-4 relative">
      <Ariakit.ComboboxProvider
        value={value}
        setValue={(val) => {
          setSearchValue(val); // Actualiza el término de búsqueda
          onChange(val); // Llama a la función onChange para actualizar el valor seleccionado
        }}
      >
        {label && (
          <Ariakit.ComboboxLabel className="block text-sm font-medium mb-1">
            {label}:
          </Ariakit.ComboboxLabel>
        )}
        {/* Input del combobox */}
        <Ariakit.Combobox
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md p-2 md:py-2 md:px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
        />

        {/* Popover para mostrar las opciones */}
        <Ariakit.ComboboxPopover
          gutter={8}
          sameWidth
          className="bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-50"
        >
          {matches.length ? (
            matches.map((option) => (
              <Ariakit.ComboboxItem
                key={option.key}
                value={option.value}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {option.value}
              </Ariakit.ComboboxItem>
            ))
          ) : (
            <div className="p-2 text-gray-500">
              No se encontraron resultados
            </div>
          )}
        </Ariakit.ComboboxPopover>
      </Ariakit.ComboboxProvider>
    </div>
  );
};

export default Combobox;
