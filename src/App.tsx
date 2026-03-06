import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import CosmicIntro from "./components/CosmicIntro";

import HomePage from "./pages/HomePage";
import MirrorPage from "./pages/MirrorPage";
import MapPage from "./pages/MapPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Intro Page */}
        <Route path="/" element={<CosmicIntro />} />

        {/* Main Platform */}
        <Route element={<MainLayout />}>

          <Route path="/home" element={<HomePage />} />
          <Route path="/mirror" element={<MirrorPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
