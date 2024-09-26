import * as Ariakit from "@ariakit/react";
import useMedia from "../../hooks/use-media"; // Hook para el manejo de media queries

const Popover = ({ triggerContent, content, title, modal, backdrop }) => {
  const popover = Ariakit.usePopoverStore();
  const isLarge = useMedia("(min-width: 640px)", true); // Detectar si la pantalla es grande

  return (
    <Ariakit.PopoverProvider store={popover}>
      {/* Popover Trigger */}
      <Ariakit.PopoverDisclosure
        onClick={(e) => e.stopPropagation()} // Prevenir propagación del clic
        className="inline-block" // Asegura que el trigger tenga un display adecuado
      >
        {triggerContent}
      </Ariakit.PopoverDisclosure>

      {/* Popover Content */}
      <Ariakit.Popover
        onClick={(e) => e.stopPropagation()} // Prevenir propagación en el popover
        modal={modal !== undefined ? modal : !isLarge} // Modal en pantallas pequeñas
        backdrop={
          backdrop !== undefined ? (
            backdrop
          ) : isLarge ? (
            false
          ) : (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={(e) => {
                e.stopPropagation(); // Prevenir propagación al elemento padre
                popover.hide(); // Cerrar popover al hacer clic en el backdrop
              }}
            />
          )
        }
        portal={!isLarge} // Usar portal solo en móviles para posicionamiento fijo
        placement={isLarge ? "bottom" : undefined} // Usar placement automático en grandes
        className={`popover rounded-md shadow-lg p-4 bg-white max-w-md w-full ${
          isLarge ? "relative z-50" : "fixed bottom-0 z-50"
        }`} // Estilos condicionales
      >
        {isLarge && <Ariakit.PopoverArrow className="arrow" />}
        {title && (
          <Ariakit.PopoverHeading className="text-lg font-semibold mb-2 text-black">
            {title}
          </Ariakit.PopoverHeading>
        )}
        <div>{content}</div>
      </Ariakit.Popover>
    </Ariakit.PopoverProvider>
  );
};

export default Popover;
