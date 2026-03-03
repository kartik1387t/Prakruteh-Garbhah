import React, { useState } from 'react';
import { Volume2, VolumeX, CloudSun, CloudRain, Snowflake, Music } from 'lucide-react';

interface SwarRangPlayerProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onTintChange: (tint: 'summer' | 'monsoon' | 'winter' | 'none') => void;
  primaryColor: string;
}

const SwarRangPlayer: React.FC<SwarRangPlayerProps> = ({ isMuted, onToggleMute, onTintChange, primaryColor }) => {
  const [activeTint, setActiveTint] = useState<'summer' | 'monsoon' | 'winter' | 'none'>('none');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTint = (tint: 'summer' | 'monsoon' | 'winter' | 'none') => {
    setActiveTint(tint);
    onTintChange(tint);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 ${isExpanded ? 'h-24 bg-cosmos/90 border-t border-saffron/30 backdrop-blur-xl' : 'h-1.5 hover:h-4 bg-gradient-to-r from-transparent via-saffron/50 to-transparent cursor-pointer'}`}
         onMouseEnter={() => !isExpanded && setIsExpanded(true)}
         onMouseLeave={() => isExpanded && setIsExpanded(false)}
    >
       {/* Collapsed State Visual */}
       {!isExpanded && (
          <div className="w-full h-full relative overflow-hidden">
             <div className="absolute inset-0 bg-saffron/20 animate-pulse"></div>
          </div>
       )}

       {/* Expanded Controls */}
       {isExpanded && (
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
             
             {/* Left: Atmosphere Controls */}
             <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest text-saffron font-bold flex items-center gap-2">
                   <Music size={12} /> Swar & Rang
                </span>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="flex gap-2">
                   <button 
                     onClick={() => handleTint('summer')}
                     className={`p-2 rounded-full border transition-colors ${activeTint === 'summer' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'border-transparent text-gray-500 hover:text-yellow-400'}`}
                     title="Summer Gold"
                   >
                      <CloudSun size={16} />
                   </button>
                   <button 
                     onClick={() => handleTint('monsoon')}
                     className={`p-2 rounded-full border transition-colors ${activeTint === 'monsoon' ? 'bg-teal-500/20 border-teal-500 text-teal-400' : 'border-transparent text-gray-500 hover:text-teal-400'}`}
                     title="Monsoon Emerald"
                   >
                      <CloudRain size={16} />
                   </button>
                   <button 
                     onClick={() => handleTint('winter')}
                     className={`p-2 rounded-full border transition-colors ${activeTint === 'winter' ? 'bg-blue-200/20 border-blue-200 text-blue-200' : 'border-transparent text-gray-500 hover:text-blue-200'}`}
                     title="Winter Pearl"
                   >
                      <Snowflake size={16} />
                   </button>
                </div>
             </div>

             {/* Center: Visualizer */}
             <div className="flex-1 max-w-md mx-8 flex items-end justify-center gap-1 h-12 pb-2">
                {!isMuted ? [...Array(20)].map((_, i) => (
                   <div 
                      key={i}
                      className="w-1 bg-saffron rounded-t-full animate-pulse"
                      style={{ 
                         height: `${Math.random() * 100}%`,
                         animationDuration: `${0.2 + Math.random() * 0.5}s`,
                         opacity: 0.6 + Math.random() * 0.4
                      }}
                   ></div>
                )) : (
                   <div className="text-xs text-gray-600 font-mono tracking-widest">SILENCE OF THE VOID</div>
                )}
             </div>

             {/* Right: Volume & AUM */}
             <div className="flex items-center gap-4">
                <button 
                   onClick={onToggleMute}
                   className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-saffron transition-colors"
                >
                   {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                   <span className="hidden md:inline">{isMuted ? 'Unmute' : 'Cosmic AUM'}</span>
                </button>
             </div>

          </div>
       )}
    </div>
  );
};

export default SwarRangPlayer;