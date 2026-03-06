import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aperture, Globe, Map as MapIcon, PieChart, Sparkles } from "lucide-react";

const UniversalNavOrb: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-32 left-8 z-50">

      {/* Radial Menu */}
      <div
        className={`absolute bottom-2 left-2 transition-all duration-300 ${
          navOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >

        {/* Mirror */}
        <button
          onClick={() => navigate("/mirror")}
          className={`absolute transition-all duration-300 w-12 h-12 rounded-full bg-cosmos-light border border-white/20 flex items-center justify-center hover:bg-saffron hover:text-black hover:scale-110 shadow-lg ${
            navOpen ? "-translate-y-32 translate-x-0" : "translate-y-0 translate-x-0"
          }`}
        >
          <Globe size={20} />
        </button>

        {/* Map */}
        <button
          onClick={() => navigate("/map")}
          className={`absolute transition-all duration-300 w-12 h-12 rounded-full bg-cosmos-light border border-white/20 flex items-center justify-center hover:bg-saffron hover:text-black hover:scale-110 shadow-lg ${
            navOpen ? "-translate-y-24 translate-x-24" : "translate-y-0 translate-x-0"
          }`}
        >
          <MapIcon size={20} />
        </button>

        {/* Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className={`absolute transition-all duration-300 w-12 h-12 rounded-full bg-cosmos-light border border-white/20 flex items-center justify-center hover:bg-saffron hover:text-black hover:scale-110 shadow-lg ${
            navOpen ? "translate-y-0 translate-x-32" : "translate-y-0 translate-x-0"
          }`}
        >
          <PieChart size={20} />
        </button>

        {/* Coming Soon */}
        <button
          className={`absolute transition-all duration-300 w-10 h-10 rounded-full bg-cosmos-light border border-white/20 flex items-center justify-center text-gray-500 hover:text-white shadow-lg ${
            navOpen ? "-translate-y-10 translate-x-[7.5rem]" : "translate-y-0 translate-x-0"
          }`}
        >
          <Sparkles size={16} />
        </button>
      </div>

      {/* Orb Button */}
      <button
        onClick={() => setNavOpen(!navOpen)}
        className={`relative w-16 h-16 rounded-full bg-gradient-to-tr from-cosmos to-black border-2 border-saffron/50 shadow-[0_0_30px_rgba(255,153,51,0.4)] flex items-center justify-center transition-transform duration-500 ${
          navOpen ? "rotate-180 scale-110" : "hover:scale-105"
        }`}
      >
        <Aperture className="text-saffron" size={32} />
      </button>

      <div
        className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-saffron transition-opacity duration-300 ${
          navOpen ? "opacity-0" : "opacity-80"
        }`}
      >
        Menu
      </div>

    </div>
  );
};

export default UniversalNavOrb;
