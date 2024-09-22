// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import CategoryPanel from "../components/templates/CategoryPanel";
import PersonPanel from "../components/templates/PersonPanel";
import TabsComponent from "../components/molecules/TabsComponent";
import PageTemplate from "../components/atoms/PageTemplate";

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
    <PageTemplate
      titleBg="bg-gray-700"
      title="Configuración"
      subtitle="Gestionar categorías y personas"
    >
      <TabsComponent
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </PageTemplate>
  );
};

export default SettingsPage;
