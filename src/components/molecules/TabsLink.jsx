import React from "react";
import { NavLink } from "react-router-dom";

const TabsLinks = ({ tabs }) => {
  return (
    <div className="flex justify-between space-x-1 bg-white p-2 md:rounded-lg md:mb-4 md:shadow-md">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `flex w-full align-middle justify-center items-center space-x-2 py-2 px-4 rounded-lg text-md font-medium ${
              isActive
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-500 hover:bg-indigo-300 hover:text-white hover:shadow-sm"
            }`
          }
        >
          {tab.icon && <tab.icon className="w-5 h-5" />}
          <span className="hidden md:inline">{tab.label}</span>{" "}
          {/* Ocultar el texto en pantallas pequeñas */}
        </NavLink>
      ))}
    </div>
  );
};

export default TabsLinks;
