import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./src/pages/HomePage";
import MirrorPage from "./src/pages/MirrorPage";
import MapPage from "./src/pages/MapPage";
import DashboardPage from "./src/pages/DashboardPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mirror" element={<MirrorPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
