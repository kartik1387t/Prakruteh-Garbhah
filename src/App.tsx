import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import MainLayout from "./layout/MainLayout";
import CosmicIntro from "./components/CosmicIntro";

import HomePage from "./pages/HomePage";
import MirrorPage from "./pages/MirrorPage";
import MapPage from "./pages/MapPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <CosmicIntro onExplore={() => setEntered(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          {/* Default landing */}
          <Route index element={<HomePage />} />

          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mirror/:slug" element={<MirrorPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
