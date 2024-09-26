import React from "react";

const PageTemplate = ({
  mainBg = "bg-stone-50",
  titleBg = "bg-black",
  titleColor = "text-white",
  subtileColor = "text-gray-300",
  title = "",
  subtitle = "",
  children,
}) => {
  return (
    <div className={`${mainBg} md:rounded-lg overflow-auto md:shadow-md`}>
      <div className={`${titleBg} md:space-y-3 p-3 md:p-4 max-h-32`}>
        <h2 className={`${titleColor} text-2xl font-bold`}>{title}</h2>
        <div className="max-h-20 overflow-y-auto py-2">
          <p className={`${subtileColor}`}>{subtitle}</p>
        </div>
      </div>
      <div className="overflow-visible min-h-screen md:min-h-full md:max-h-max p-3 md:p-4">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
