import React, { useState } from 'react';
import { Sun, CloudRain, CloudSnow, Wind, Flower2 } from 'lucide-react';
import { Season } from '../types';
import { SEASONS as SEASON_DATA } from '../constants';
import Reveal from './Reveal';

const LivingMap: React.FC = () => {
  const [currentSeason, setCurrentSeason] = useState<Season>('spring');

  // Helper to get season styles
  const activeStyle = SEASON_DATA[currentSeason];

  return (
    <section className={`py-20 relative transition-colors duration-1000 bg-gradient-to-b ${activeStyle.bg}`} id="living-map">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <Reveal width="fit-content">
            <div>
              <h2 className="font-serif text-4xl text-white mb-2">The Living Map</h2>
              <p className="text-gray-300">See how Bharat changes with the seasons.</p>
            </div>
          </Reveal>
          
          {/* Season Shifter Controls */}
          <Reveal width="fit-content" delay={0.2}>
            <div className="flex gap-2 bg-black/30 p-2 rounded-full mt-4 md:mt-0 backdrop-blur-sm">
              {(Object.keys(SEASON_DATA) as Season[]).map((season) => (
                <button
                  key={season}
                  onClick={() => setCurrentSeason(season)}
                  className={`p-3 rounded-full transition-all duration-300 ${currentSeason === season ? 'bg-white/20 scale-110 shadow-lg' : 'hover:bg-white/10 opacity-70'}`}
                  title={season}
                >
                  <span className="text-xl">{SEASON_DATA[season].icon}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Abstract Map Visualization */}
        <Reveal delay={0.4}>
          <div className="relative w-full h-[500px] flex items-center justify-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Abstract Shape Representing India */}
            <svg viewBox="0 0 400 500" className="w-full h-full max-w-md drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {/* This is a simplified artistic path for India for demo purposes */}
                <path 
                  d="M 150 50 L 250 50 L 280 150 L 350 180 L 300 250 L 200 450 L 100 250 L 50 180 L 120 150 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className={`transition-colors duration-1000 ${activeStyle.color}`}
                />
                
                {/* Internal Animations based on season */}
                {currentSeason === 'monsoon' && (
                  <g className="animate-pulse">
                      {[...Array(20)].map((_, i) => (
                        <circle key={i} cx={50 + Math.random() * 300} cy={50 + Math.random() * 400} r="2" fill="#60A5FA" className="opacity-60" />
                      ))}
                  </g>
                )}
                {currentSeason === 'winter' && (
                  <g>
                      <path d="M 150 50 L 250 50 L 200 150 Z" fill="white" className="opacity-80" /> {/* Snow on Himalayas */}
                  </g>
                )}
                {currentSeason === 'summer' && (
                  <circle cx="50" cy="50" r="30" fill="#FBBF24" className="opacity-20 animate-pulse" />
                )}
            </svg>

            {/* Dynamic Overlay Text */}
            <div className="absolute bottom-10 left-10">
                <h3 className={`text-5xl font-display capitalize ${activeStyle.color} opacity-90`}>{currentSeason}</h3>
                <p className="text-white mt-2 max-w-xs text-sm">
                  {currentSeason === 'monsoon' && "The Western Ghats come alive with lush greenery and waterfalls."}
                  {currentSeason === 'winter' && "Snow in the North, pleasant sun in the desert states."}
                  {currentSeason === 'summer' && "Escape to the hills of Himachal or the cool forests of the North East."}
                  {currentSeason === 'spring' && "Valley of Flowers blooms. Perfect for wildlife safaris."}
                  {currentSeason === 'autumn' && "The festive season begins. Golden skies over Punjab."}
                </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LivingMap;