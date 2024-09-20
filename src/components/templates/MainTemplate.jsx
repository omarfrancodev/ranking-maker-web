import React from "react";

const MainTemplate = ({ title = "", className = "bg-white", children }) => {
  return (
    <div
      className={`container mx-auto h-full p-4 shadow-md rounded-md" ${className}`}
    >
      {title !== "" && (
        <h1 className="text-3xl font-bold mb-4 text-center text-titleBlue">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default MainTemplate;
