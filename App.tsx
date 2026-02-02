import React, { useState } from 'react';
import CosmicIntro from './components/CosmicIntro';
import MirrorSearch from './components/MirrorSearch';
import LivingMap from './components/LivingMap';
import YatraDashboard from './components/YatraDashboard';
import Footer from './components/Footer';
import CosmicBackground from './components/CosmicBackground';
import Reveal from './components/Reveal'; // Keeping for internal animations within slides
import { Compass, User, Globe, X, Menu, Home } from 'lucide-react';

type SlideType = 'home' | 'mirror' | 'map' | 'dashboard' | 'vocal';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSlide, setActiveSlide] = useState<SlideType | null>(null);

  const toggleSlide = (slide: SlideType) => {
    setActiveSlide(activeSlide === slide ? null : slide);
  };

  const closeSlide = () => setActiveSlide(null);

  return (
    <div className="h-screen w-screen overflow-hidden text-white font-sans relative">
      
      {/* 1. Global Background (Always Visible/Active) */}
      {!showIntro && <CosmicBackground />}

      {/* 2. Intro Overlay */}
      {showIntro ? (
        <div className="absolute inset-0 z-50">
          <CosmicIntro onExplore={() => setShowIntro(false)} />
        </div>
      ) : (
        <>
          {/* 3. Main Navigation Dock (Bottom) */}
          <header className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
             <div className="glass-card rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_0_30px_rgba(255,153,51,0.3)] border border-saffron/30">
                <button 
                  onClick={closeSlide}
                  className={`flex flex-col items-center gap-1 transition-all hover:text-saffron ${!activeSlide ? 'text-saffron scale-110' : 'text-gray-400'}`}
                >
                   <Home size={20} />
                   <span className="text-[10px] uppercase tracking-wider">Home</span>
                </button>
                <div className="w-px h-8 bg-white/20"></div>
                
                <button 
                  onClick={() => toggleSlide('mirror')}
                  className={`flex flex-col items-center gap-1 transition-all hover:text-saffron ${activeSlide === 'mirror' ? 'text-saffron scale-110' : 'text-gray-400'}`}
                >
                   <Globe size={20} />
                   <span className="text-[10px] uppercase tracking-wider">Mirror</span>
                </button>

                <button 
                  onClick={() => toggleSlide('map')}
                  className={`flex flex-col items-center gap-1 transition-all hover:text-saffron ${activeSlide === 'map' ? 'text-saffron scale-110' : 'text-gray-400'}`}
                >
                   <Compass size={20} />
                   <span className="text-[10px] uppercase tracking-wider">Map</span>
                </button>

                <button 
                  onClick={() => toggleSlide('dashboard')}
                  className={`flex flex-col items-center gap-1 transition-all hover:text-saffron ${activeSlide === 'dashboard' ? 'text-saffron scale-110' : 'text-gray-400'}`}
                >
                   <User size={20} />
                   <span className="text-[10px] uppercase tracking-wider">Yatra</span>
                </button>
             </div>
          </header>

          {/* 4. Branding (Top Left) */}
          <div className="fixed top-6 left-6 z-40 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border border-saffron flex items-center justify-center bg-black/50 backdrop-blur-md">
                <div className="w-5 h-5 bg-gradient-to-tr from-saffron to-indigo rounded-full animate-pulse"></div>
             </div>
             <div>
               <h1 className="font-serif font-bold text-xl text-white tracking-wide">Prakruteh Garbhah</h1>
               <p className="text-[10px] text-saffron uppercase tracking-[0.2em]">Womb of Nature</p>
             </div>
          </div>

          {/* 5. Slide Panels (Overlays) */}
          <main className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-4 md:p-10">
             
             {/* Mirror Search Slide */}
             <div className={`absolute inset-4 md:inset-10 bg-cosmos/90 glass-card rounded-3xl overflow-y-auto pointer-events-auto slide-panel flex flex-col ${activeSlide === 'mirror' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                 <button onClick={closeSlide} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-50">
                    <X size={24} />
                 </button>
                 <div className="flex-1">
                   <MirrorSearch />
                 </div>
             </div>

             {/* Living Map Slide */}
             <div className={`absolute inset-4 md:inset-10 bg-cosmos/90 glass-card rounded-3xl overflow-y-auto pointer-events-auto slide-panel flex flex-col ${activeSlide === 'map' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                 <button onClick={closeSlide} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-50 text-white">
                    <X size={24} />
                 </button>
                 <div className="flex-1">
                    <LivingMap />
                 </div>
             </div>

             {/* Dashboard Slide (Includes Vocal for Local) */}
             <div className={`absolute inset-4 md:inset-10 bg-cosmos/90 glass-card rounded-3xl overflow-y-auto pointer-events-auto slide-panel flex flex-col ${activeSlide === 'dashboard' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                 <button onClick={closeSlide} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-50">
                    <X size={24} />
                 </button>
                 <div className="flex-1">
                    {/* Quick Vocal for Local embedded here */}
                    <section className="py-10 px-4 text-center border-b border-white/10">
                       <h2 className="font-serif text-3xl mb-8">Vocal for Local</h2>
                       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                         {['Kanchipuram Silk', 'Blue Pottery', 'Pashmina'].map((craft, i) => (
                           <div key={i} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer border border-white/20">
                             <img src={`https://picsum.photos/400?random=${i+10}`} alt={craft} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <span className="text-white font-display border border-white px-4 py-2">{craft}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                    </section>
                    <YatraDashboard />
                    <Footer />
                 </div>
             </div>

          </main>
          
          {/* Hint text when no slide is active */}
          {!activeSlide && (
            <div className="fixed bottom-32 w-full text-center z-20 pointer-events-none animate-pulse">
               <p className="text-saffron/80 font-display tracking-widest text-sm">Scroll to move the Cosmos. Select menu to Explore.</p>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default App;