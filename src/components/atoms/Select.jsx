import * as Ariakit from "@ariakit/react";
import { useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import { ChevronDown, ChevronUp, Check } from "lucide-react"; // Importa el icono Check

const Select = ({
  label,
  value, // Este es el UUID o el key
  onChange,
  options = [], // { key: uuid, value: "Nombre de la categoría" }
  placeholder = "Seleccione una opción",
  searchable = false, // Controlar si el select es searchable o no
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el select está abierto o cerrado
  const [hoveredItem, setHoveredItem] = useState(null); // Estado para rastrear el elemento hovered

  // Filtrado de opciones basado en la búsqueda (si es searchable)
  const filteredOptions = useMemo(() => {
    return searchable
      ? matchSorter(options, searchValue, { keys: ["value"] }) // Búsqueda basada en "value" (ej: nombre)
      : options;
  }, [searchValue, options, searchable]);

  // Obtener el value (nombre) de la opción seleccionada o mostrar el placeholder
  const selectedLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.key === value); // Buscar por key (uuid)
    return selectedOption ? selectedOption.value : placeholder; // Mostrar el value (nombre legible) o placeholder
  }, [options, value, placeholder]);

  return (
    <div className="mb-4 relative">
      {/* Provider para el Combobox (buscador) */}
      <Ariakit.ComboboxProvider
        value={searchValue}
        setValue={(val) => setSearchValue(val)}
        resetValueOnHide
      >
        {label && (
          <Ariakit.ComboboxLabel className="block text-sm font-medium mb-1">
            {label}:
          </Ariakit.ComboboxLabel>
        )}
        {/* Provider para el Select (desplegable) */}
        <Ariakit.SelectProvider
          value={value}
          setValue={(key) => {
            const selectedOption = options.find((option) => option.key === key);
            if (selectedOption) {
              onChange(selectedOption.key); // Actualizar usando el key (uuid)
            }
          }}
        >
          {/* Select Trigger con flecha hacia abajo o arriba */}
          <Ariakit.Select
            className="min-w-32 md:min-w-40 w-full max-w-full border border-gray-300 rounded-md p-2 md:py-2 md:px-3 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {
              setIsOpen(!isOpen);
              setHoveredItem(value);
            }}
          >
            {selectedLabel}
            {/* Flecha hacia abajo o hacia arriba con transición */}
            <span className="ml-2 transition-transform duration-300">
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </Ariakit.Select>

          {/* Popover (contenedor de opciones) */}
          <Ariakit.SelectPopover
            gutter={4}
            sameWidth
            className="popover p-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-50"
            onClose={() => {
              setHoveredItem(null); // Resetea hoveredItem al cerrar
            }}
          >
            {/* Si es searchable, se muestra el Combobox para buscar */}
            {searchable && (
              <Ariakit.Combobox
                autoSelect
                placeholder="Buscar..."
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
              />
            )}

            {/* Lista de opciones */}
            <Ariakit.ComboboxList>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = option.key === value;
                  const isHovered = option.key === hoveredItem;

                  return (
                    <Ariakit.SelectItem
                      key={option.key} // Usar el key (uuid) como identificador único
                      value={option.key} // Usar el key (uuid) para selección
                      className={`p-2 rounded-md cursor-pointer flex gap-x-1 justify-between items-center ${
                        isHovered
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-500 hover:text-white"
                      }`}
                      onMouseEnter={() => setHoveredItem(option.key)} // Establece hoveredItem al hacer hover
                      onMouseLeave={() =>
                        setHoveredItem(isSelected ? value : null)
                      } // Resetea hoveredItem al salir del hover
                    >
                      <span>{option.value}</span>
                      {isSelected && <Check className="w-4 h-4" />}{" "}
                      {/* Checkmark si está seleccionado */}
                    </Ariakit.SelectItem>
                  );
                })
              ) : (
                <div className="py-2 px-4 text-gray-500">
                  No se encontraron opciones
                </div>
              )}
            </Ariakit.ComboboxList>
          </Ariakit.SelectPopover>
        </Ariakit.SelectProvider>
      </Ariakit.ComboboxProvider>
    </div>
  );
};

export default Select;
