import React from "react";
import PageTemplate from "../components/atoms/PageTemplate";
import ContentPanel from "../components/templates/ContentPanel";

const HomePage = () => {
  return (
    <PageTemplate
      titleBg="bg-indigo-700"
      title="Gestionar contenido"
      subtileColor="text-gray-200"
      subtitle="Añadir nuevos programas, peliculas y variedad de contenidos, y asignar espectadores"
    >
      <ContentPanel />
    </PageTemplate>
  );
};

export default HomePage;
