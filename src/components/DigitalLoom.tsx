import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, CheckCircle, GripHorizontal } from 'lucide-react';

interface DigitalLoomProps {
  onClose: () => void;
  patternName: string;
}

const DigitalLoom: React.FC<DigitalLoomProps> = ({ onClose, patternName }) => {
  const [warpColors, setWarpColors] = useState(['#FF9933', '#138808', '#FFFFFF', '#000080']); // Saffron, Green, White, Navy
  const [weftColor, setWeftColor] = useState('#FFD700'); // Gold
  const [grid, setGrid] = useState<string[][]>([]);
  const rows = 10;
  const cols = 10;

  useEffect(() => {
    // Initialize Grid
    const newGrid = Array(rows).fill(null).map(() => Array(cols).fill('transparent'));
    setGrid(newGrid);
  }, []);

  const handleWeave = (r: number, c: number) => {
    const newGrid = [...grid];
    // Toggle between Warp (Vertical thread) and Weft (Horizontal thread)
    // If cell is transparent, it shows vertical thread (warp). 
    // If we click, we place the horizontal thread (weft) on top.
    if (newGrid[r][c] === weftColor) {
       newGrid[r][c] = 'transparent';
    } else {
       newGrid[r][c] = weftColor;
    }
    setGrid(newGrid);
  };

  const resetLoom = () => {
     setGrid(Array(rows).fill(null).map(() => Array(cols).fill('transparent')));
  };

  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-[#2a1d12] border border-[#8B4513] rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden flex flex-col">
         
         <div className="p-6 bg-[#3e2b1b] border-b border-[#8B4513] flex justify-between items-center">
            <div>
               <h2 className="text-amber-200 font-serif text-xl">Digital Loom</h2>
               <p className="text-xs text-amber-500/80 uppercase tracking-widest">Weave a {patternName} Pattern</p>
            </div>
            <button onClick={onClose} className="text-amber-700 hover:text-amber-100">
               <X size={24} />
            </button>
         </div>

         <div className="p-8 flex flex-col items-center flex-1 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]">
            
            {/* The Loom Grid */}
            <div className="relative bg-black/20 p-2 rounded border border-[#8B4513]/50 shadow-inner">
               <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 30px)` }}>
                  {grid.map((row, r) => (
                     row.map((cellColor, c) => (
                        <div 
                           key={`${r}-${c}`}
                           onClick={() => handleWeave(r, c)}
                           className="w-[30px] h-[30px] border-[0.5px] border-white/5 cursor-pointer relative flex items-center justify-center group"
                        >
                           {/* Warp Thread (Vertical) - Always visible in background */}
                           <div 
                              className="absolute inset-y-0 w-1 bg-current opacity-80 pointer-events-none"
                              style={{ color: warpColors[c % warpColors.length] }}
                           ></div>

                           {/* Weft Thread (Horizontal) - Visible if weaved */}
                           {cellColor !== 'transparent' && (
                              <div 
                                 className="absolute inset-x-0 h-1.5 bg-current shadow-sm z-10"
                                 style={{ color: cellColor }}
                              ></div>
                           )}
                           
                           {/* Hover hint */}
                           <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                     ))
                  ))}
               </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex gap-4 items-center">
               <div className="flex flex-col items-center">
                  <span className="text-[10px] text-amber-500 uppercase font-bold mb-1">Thread Color</span>
                  <div className="flex gap-2">
                     {['#FFD700', '#FF4500', '#C0C0C0', '#4B0082'].map(color => (
                        <button 
                           key={color}
                           onClick={() => setWeftColor(color)}
                           className={`w-6 h-6 rounded-full border-2 ${weftColor === color ? 'border-white scale-110' : 'border-transparent opacity-70'}`}
                           style={{ backgroundColor: color }}
                        ></button>
                     ))}
                  </div>
               </div>
               
               <div className="h-8 w-px bg-[#8B4513]/50"></div>

               <button 
                  onClick={resetLoom}
                  className="p-2 bg-[#3e2b1b] rounded text-amber-500 hover:text-amber-200 transition-colors"
                  title="Reset Loom"
               >
                  <RefreshCw size={18} />
               </button>
            </div>

            <p className="mt-6 text-xs text-amber-700/60 text-center max-w-xs italic">
               "Click grid cells to pass the weft thread over the warp. Create your own motif."
            </p>

         </div>
      </div>
    </div>
  );
};

export default DigitalLoom;