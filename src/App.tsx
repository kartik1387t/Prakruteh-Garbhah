import { BrowserRouter, Routes, Route } from "react-router-dom";
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

          <Route path="/" element={<HomePage />} />
          <Route path="/mirror" element={<MirrorPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
