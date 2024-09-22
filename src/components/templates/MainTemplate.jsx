import React from "react";

const MainTemplate = ({ title = "", className = "bg-white", children }) => {
  return (
    <div
      className={`mx-0 my-auto md:mx-auto w-full min-h-screen max-h-max px-0 md:p-4 shadow-md rounded-md" ${className}`}
    >
      {title !== "" && (
        <h1 className="text-3xl font-bold my-2 md:mb-4 text-center text-titleBlue">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default MainTemplate;
