import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import MainLayout from "./layout/MainLayout";
import CosmicIntro from "./components/CosmicIntro";

import HomePage from "./pages/HomePage";
import MirrorPage from "./pages/MirrorPage";
import MapPage from "./pages/MapPage";
import DashboardPage from "./pages/DashboardPage";
import VocalForLocal from "./pages/VocalForLocal";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const [yatraItems, setYatraItems] = useState([]);
  const addToYatra = (item) => {
  setYatraItems(prev => [...prev, item]);
};
  
  if (!entered) {
    return <CosmicIntro onExplore={() => setEntered(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={
  <MainLayout
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    yatraItems={yatraItems}
    addToYatra={addToYatra}
  />
}>

          {/* Default landing */}
          <Route index element={<HomePage />} />

          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mirror" element={<MirrorPage />} />
         <Route path="/mirror/:slug" element={<MirrorPage />} />
          <Route path="/loom" element={<VocalForLocal />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
