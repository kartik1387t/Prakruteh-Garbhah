import React, { useState } from "react";

import CosmicIntro from "./CosmicIntro";
import MirrorSearch from "./MirrorSearch";
import LivingMap from "./LivingMap";
import YatraDashboard from "./YatraDashboard";
import Footer from "./Footer";
import Reveal from "./Reveal";

import { Compass, User, Globe } from "lucide-react";

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-cosmos text-white font-sans">
      
      {/* Intro Overlay */}
      {showIntro ? (
        <CosmicIntro onExplore={() => setShowIntro(false)} />
      ) : (
        <>
          {/* Universal Navigation Orb (Sticky Header) */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-cosmos/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                <div className="w-8 h-8 rounded-full border border-saffron flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-tr from-saffron to-indigo rounded-full"></div>
                </div>
                <span className="font-serif font-bold text-lg hidden md:block">Bharat Mirror</span>
              </div>

              <nav className="flex gap-6">
                 <button className="flex items-center gap-2 text-sm hover:text-saffron transition-colors" onClick={() => document.getElementById('mirror-search')?.scrollIntoView({behavior: 'smooth'})}>
                   <Globe size={18} /> <span className="hidden md:inline">Mirror Search</span>
                 </button>
                 <button className="flex items-center gap-2 text-sm hover:text-saffron transition-colors" onClick={() => document.getElementById('living-map')?.scrollIntoView({behavior: 'smooth'})}>
                   <Compass size={18} /> <span className="hidden md:inline">Map</span>
                 </button>
                 <button className="flex items-center gap-2 text-sm hover:text-saffron transition-colors" onClick={() => document.getElementById('dashboard')?.scrollIntoView({behavior: 'smooth'})}>
                   <User size={18} /> <span className="hidden md:inline">My Yatra</span>
                 </button>
              </nav>
            </div>
          </header>

          <main className="pt-16">
            <MirrorSearch />
            <LivingMap />
            
            {/* Quick Vocal for Local Section (Mini) */}
            <section className="py-20 px-4 bg-cosmos text-center">
               <Reveal>
                  <h2 className="font-serif text-3xl mb-8">Vocal for Local</h2>
               </Reveal>
               <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                 {['Kanchipuram Silk', 'Blue Pottery', 'Pashmina'].map((craft, i) => (
                   <Reveal key={i} delay={i * 0.2}>
                      <div className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer">
                        <img src={`https://picsum.photos/400?random=${i+10}`} alt={craft} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-display border border-white px-4 py-2">{craft}</span>
                        </div>
                      </div>
                   </Reveal>
                 ))}
               </div>
            </section>

            <YatraDashboard />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
