import React, { useRef, useEffect, useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Seleccione una opción",
}) => {
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Ajustar el ancho del dropdown al ancho del Trigger
  useEffect(() => {
    if (triggerRef.current) {
      setDropdownWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, []);

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <SelectPrimitive.Root
        value={value}
        onValueChange={onChange}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectPrimitive.Trigger
          ref={triggerRef}
          className="w-full border border-gray-300 rounded-md p-2 md:py-2 md:px-3 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="ml-2 w-4 h-4" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="bg-white border border-gray-300 rounded-md z-50 shadow-lg min-h-min max-h-60"
            style={{ width: dropdownWidth }}
            position="popper"
          >
            <SelectPrimitive.ScrollUpButton className="flex justify-center p-2">
              <ChevronUp />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport>
              {options.length > 0 ? (
                options.map((option, index) => {
                  const optionValue =
                    typeof option === "string" ? option : option.value;

                  return (
                    <SelectItem
                      key={index}
                      value={optionValue}
                      label={typeof option === "string" ? option : option.label}
                    />
                  );
                })
              ) : (
                <div className="py-2 px-4 text-gray-500">
                  No se encontraron opciones
                </div>
              )}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className="flex justify-center p-2">
              <ChevronDown />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
};

const SelectItem = React.forwardRef(({ value, label }, ref) => (
  <SelectPrimitive.Item
    value={value}
    ref={ref}
    className="py-2 px-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
    onClick={(event) => {
      event.stopPropagation(); // Detiene la propagación del evento de clic
    }}
    onTouchStart={(event) => {
      event.stopPropagation(); // Detiene la propagación del evento táctil
    }}
    onTouchEnd={(event) => {
      event.stopPropagation(); // Detiene la propagación del evento táctil
    }}
  >
    <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="text-blue-500">
      <Check />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));

export default Select;
