import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RankingsPage from "../pages/RankingsPage";
import ChartsPage from "../pages/ChartsPage";
import ViewsPage from "../pages/ViewsPage";
import SettingsPage from "../pages/SettingsPage";
import MainTemplate from "../components/templates/MainTemplate";
import TabsLink from "../components/molecules/TabsLink";
import { Tv, List, PieChart, Eye, Settings } from "lucide-react"; // Importamos los íconos

const AppRoutes = () => {
  const tabs = [
    { path: "/", label: "Content", icon: Tv },
    { path: "/rankings", label: "Rankings", icon: List },
    { path: "/charts", label: "Gráficas", icon: PieChart },
    { path: "/views", label: "Vistas", icon: Eye },
    { path: "/settings", label: "Configuración", icon: Settings },
  ];

  return (
    <Router>
      <MainTemplate title={"Ranking Maker"} className={"bg-mainBG"}>
        <TabsLink tabs={tabs} />
        <Routes>
          <Route
            path={tabs.find((t) => t.label === "Content").path}
            element={<HomePage />}
          />
          <Route
            path={tabs.find((t) => t.label === "Rankings").path}
            element={<RankingsPage />}
          />
          <Route
            path={tabs.find((t) => t.label === "Gráficas").path}
            element={<ChartsPage />}
          />
          <Route
            path={tabs.find((t) => t.label === "Vistas").path}
            element={<ViewsPage />}
          />
          <Route
            path={tabs.find((t) => t.label === "Configuración").path}
            element={<SettingsPage />}
          />
        </Routes>
      </MainTemplate>
    </Router>
  );
};

export default AppRoutes;
