import CosmicBackground from "../components/CosmicBackground";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Cosmic animated background */}
      <CosmicBackground />

      {/* Page content above background */}
      <div className="relative z-20 flex items-center justify-center h-screen text-white text-2xl">
        Welcome to Prakruteh Garbhah
      </div>

    </div>
  );
}
