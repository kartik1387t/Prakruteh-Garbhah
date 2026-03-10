import CosmicBackground from "../components/CosmicBackground";
import SmartSearchBar from "../components/SmartSearchBar";
import UniversalNavOrb from "../components/UniversalNavOrb";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* Cosmic universe background */}
      <CosmicBackground />

      {/* Search bar */}
      <SmartSearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

<Outlet context={{ searchTerm }} />

      {/* Orb navigation */}
      <UniversalNavOrb />

      {/* Page content */}
      <main className="relative z-20">
        <Outlet />
      </main>

    </div>
  );
}
