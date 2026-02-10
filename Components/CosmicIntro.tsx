import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface CosmicIntroProps {
  onExplore: () => void;
}

const CosmicIntro: React.FC<CosmicIntroProps> = ({ onExplore }) => {
  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    // Simulating the "Zoom" effect from Cosmos to Earth
    const timer = setTimeout(() => setZoomLevel(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-cosmos">
      {/* Background Starfield Effect */}
      <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center transition-transform duration-[3000ms] ease-out ${zoomLevel === 1 ? 'scale-110 opacity-60' : 'scale-100 opacity-100'}`}></div>

      {/* Cosmic Shiva Concept - Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-[500px] h-[500px] rounded-full border border-saffron/20 animate-pulse-slow"></div>
         <div className="absolute w-[300px] h-[300px] rounded-full border border-indigo/30 animate-spin-slow"></div>
      </div>

      {/* Main Content */}
      <div className={`z-10 text-center transition-all duration-1000 ${zoomLevel === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="font-display text-saffron text-xl md:text-3xl tracking-[0.5em] mb-4">ATITHI DEVO BHAVA</p>
        <h1 className="font-serif text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-indigo mb-6">
          Prakruteh Garbhah
        </h1>
        <p className="font-sans text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          "The World in a Single Soul." <br/>
          Why cross oceans when the universe is reflected here?
        </p>
        
        <button 
          onClick={onExplore}
          className="group relative px-8 py-4 bg-transparent border border-saffron text-saffron font-display uppercase tracking-widest hover:bg-saffron hover:text-cosmos transition-all duration-300 rounded-sm"
        >
          Enter the Womb
          <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-saffron transition-all group-hover:w-full group-hover:left-0 duration-300"></span>
        </button>
      </div>

      <div className="absolute bottom-8 text-white/30 text-xs uppercase tracking-widest">
         Initialized: Cosmic AUM Frequency
      </div>
    </div>
  );
};

export default CosmicIntro;