import CosmicBackground from "../components/CosmicBackground";
import SmartSearchBar from "../components/SmartSearchBar";
import UniversalNavOrb from "../components/UniversalNavOrb";
import SwarRangPlayer from "../components/SwarRangPlayer";
import YatraPlanner from "../components/YatraPlanner";
import SafetyDashboard from "../components/SafetyDashboard";
import BharatAIGuide from "../components/BharatAIGuide";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen text-white relative">

      {/* Background */}
      <CosmicBackground />

      {/* Global Navigation */}
      <SmartSearchBar />

      {/* Orb Navigation */}
      <UniversalNavOrb />

      {/* Global Platform Systems */}
      <YatraPlanner />
      <SafetyDashboard />
      <BharatAIGuide />
      <SwarRangPlayer />

      {/* Page Content */}
      <main className="relative z-10">
        <Outlet />
      </main>

    </div>
  );
}
