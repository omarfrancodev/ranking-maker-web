// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import CategoryPanel from "../components/templates/CategoryPanel";
import PersonPanel from "../components/templates/PersonPanel";
import TabsComponent from "../components/molecules/TabsComponent";

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState("categorias");

  const tabs = [
    { value: "categorias", label: "Categorías", content: <CategoryPanel /> },
    {
      value: "personas",
      label: "Personas",
      content: <PersonPanel />,
    },
  ];

  return (
    <div className="bg-stone-50 rounded-lg overflow-auto">
      <div className="bg-gray-700 space-y-3 text-white p-6">
        <h2 className="text-2xl font-bold">Configuración</h2>
        <p className="text-gray-300">Gestionar categorías y personas</p>
      </div>
      <div className="overflow-auto max-h-md p-6">
        <TabsComponent
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
