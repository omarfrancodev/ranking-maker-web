// atoms/Disclosure.jsx
import * as Ariakit from "@ariakit/react";

const Disclosure = ({ triggerContent, children, ...props }) => {
  return (
    <Ariakit.DisclosureProvider>
      <Ariakit.Disclosure {...props} className="w-full">
        {triggerContent}
      </Ariakit.Disclosure>
      <Ariakit.DisclosureContent className="mt-2" {...props}>
        {children}
      </Ariakit.DisclosureContent>
    </Ariakit.DisclosureProvider>
  );
};

export default Disclosure;
