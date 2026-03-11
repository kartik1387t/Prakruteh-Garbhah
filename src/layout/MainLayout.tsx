import CosmicBackground from "../components/CosmicBackground";
import SmartSearchBar from "../components/SmartSearchBar";
import UniversalNavOrb from "../components/UniversalNavOrb";
import YatraPlanner from "../components/YatraPlanner";
import { Outlet } from "react-router-dom";

export default function MainLayout({
  searchTerm,
  setSearchTerm,
  yatraItems
}: any)
  
  return (
    <div className="relative min-h-screen text-white">

      {/* Cosmic universe background */}
      <CosmicBackground />

      {/* Search bar */}
      <SmartSearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

      {/* Orb navigation */}
      <UniversalNavOrb />

      {/* Page content */}
      <main className="relative z-20">
         <Outlet context={{ searchTerm }} />
      </main>
      <YatraPlanner
  items={yatraItems}
  onRemove={(id)=>{}}
  onScenicHover={()=>{}}
/>

    </div>
  );
}
