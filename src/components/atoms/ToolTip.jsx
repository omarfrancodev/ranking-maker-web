import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const Tooltip = ({ children, content }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="bg-gray-800 text-white p-2 rounded shadow-lg text-xs"
            side="top"
            align="center"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-current text-gray-800" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
