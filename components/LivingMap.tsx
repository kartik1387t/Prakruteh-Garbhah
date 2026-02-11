import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, CloudSnow, Wind, Flower2, Music, Mountain, Waves, Volume2, VolumeX, Moon, Stars, History, Gem, Sparkles, PawPrint, Anchor, CloudFog, Tent, Bell, Ship, Calendar, Flame, PartyPopper, MessageCircle } from 'lucide-react';
import { Season, VibeType } from '../types';
import { SEASONS as SEASON_DATA, HISTORICAL_SITES, HIDDEN_GEMS, STATE_DATA } from '../constants';
import Reveal from './Reveal';

interface LivingMapProps {
  currentSeason: Season;
  setSeason: (s: Season) => void;
  currentVibe: VibeType;
  setVibe: (v: VibeType) => void;
  isMuted: boolean;
  toggleSound: () => void;
}

const LivingMap: React.FC<LivingMapProps> = ({ 
  currentSeason, 
  setSeason, 
  currentVibe, 
  setVibe,
  isMuted,
  toggleSound
}) => {
  // Day-Night State (0-24)
  const [timeOfDay, setTimeOfDay] = useState<number>(new Date().getHours());
  const [autoTime, setAutoTime] = useState(true);

  // Feature Modes
  const [historyYear, setHistoryYear] = useState<number>(2025);
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isUtsavMode, setIsUtsavMode] = useState(false);
  
  // Live Tips Bubble State
  const [activeTipIndex, setActiveTipIndex] = useState<number>(0);

  // Derived states for visuals
  const isNight = timeOfDay < 6 || timeOfDay > 18;
  const sunPosition = ((timeOfDay - 6) / 12) * 100; // 0 to 100% across sky (roughly)

  // Helper to get season styles
  const activeStyle = SEASON_DATA[currentSeason];

  // Rotate Tips
  useEffect(() => {
     const interval = setInterval(() => {
        setActiveTipIndex(prev => (prev + 1) % 5); // Cycle through 5 simulated active tips
     }, 5000);
     return () => clearInterval(interval);
  }, []);

  // Smart Context Message Logic
  const getSmartMessage = () => {
    if (isUtsavMode) return "Bharat is celebrating! Hover over icons to join the festivities.";
    if (isSecretMode) return "Shh... revealing Bharat's hidden jewels.";
    if (showHistory) {
      if (historyYear < -1000) return "The dawn of civilization. Indus Valley thrives.";
      if (historyYear < 500) return "Golden Age of philosophy and architecture.";
      if (historyYear < 1700) return "Empires rise. Forts and palaces dominate.";
      return "Modern Bharat. A blend of ancient soul and new energy.";
    }
    
    // Season + Vibe Logic
    if (currentSeason === 'monsoon' && currentVibe === 'nature') return "Visit Meghalaya - the wettest, greenest place on Earth.";
    if (currentSeason === 'summer' && currentVibe === 'beach') return "East Coast is hot. Head to Lakshadweep for cooler breezes.";
    if (currentSeason === 'winter' && currentVibe === 'mountain') return "Perfect time for snow in Kashmir and Himachal.";
    
    return activeStyle.message;
  };

  // Manual Time Slider Handler
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeOfDay(parseInt(e.target.value));
    setAutoTime(false);
  };

  // Helper to render festival icons on the abstract map
  const renderFestivals = () => {
     // Flatten festivals from all states/districts
     const allFestivals = STATE_DATA.flatMap(state => 
        state.districts.flatMap(district => 
           (district.festivals || []).map(fest => ({
              ...fest,
              cx: (state.viewBox.split(' ').map(Number)[0] + (district.cx/100 * state.viewBox.split(' ').map(Number)[2])) * 0.8 + (state.id === 'kl' ? 20 : 0),
              cy: (state.viewBox.split(' ').map(Number)[1] + (district.cy/100 * state.viewBox.split(' ').map(Number)[3])) * 0.8
           }))
        )
     );

     return allFestivals.map((fest, i) => (
        <g key={`fest-${i}`} className="cursor-pointer group">
           <circle cx={fest.cx} cy={fest.cy} r="10" fill={fest.iconType === 'color' ? '#ec4899' : '#f59e0b'} className="opacity-20 animate-ping" />
           <circle cx={fest.cx} cy={fest.cy} r="3" fill="#fbbf24" />
           
           {/* Icon based on type */}
           <foreignObject x={fest.cx - 8} y={fest.cy - 15} width="16" height="16">
              <div className={`text-white drop-shadow-md ${fest.iconType === 'color' ? 'animate-bounce' : ''}`}>
                 {fest.iconType === 'bell' && <Bell size={12} />}
                 {fest.iconType === 'boat' && <Ship size={12} />}
                 {fest.iconType === 'camel' && <div className="text-[10px]">🐫</div>}
                 {fest.iconType === 'color' && <PartyPopper size={12} />}
                 {fest.iconType === 'lamp' && <Flame size={12} />}
              </div>
           </foreignObject>

           {/* Tooltip */}
           <foreignObject x={fest.cx + 10} y={fest.cy - 20} width="120" height="60" className="overflow-visible pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/80 text-white text-[8px] p-2 rounded border border-saffron/50">
                 <strong className="block text-saffron">{fest.name}</strong>
                 <span>{fest.month}</span>
              </div>
           </foreignObject>
        </g>
     ));
  };

  // Render Live Tips (Thought Bubbles)
  const renderLiveTips = () => {
     // Gather all tips
     const allTips = STATE_DATA.flatMap(state => 
        state.districts.flatMap(district => 
           (district.experiences?.filter(e => e.type === 'tip') || []).map(exp => ({
              ...exp,
              cx: (state.viewBox.split(' ').map(Number)[0] + (district.cx/100 * state.viewBox.split(' ').map(Number)[2])) * 0.8 + (state.id === 'kl' ? 20 : 0),
              cy: (state.viewBox.split(' ').map(Number)[1] + (district.cy/100 * state.viewBox.split(' ').map(Number)[3])) * 0.8
           }))
        )
     );

     // Only show one tip at a time based on timer
     if (allTips.length === 0) return null;
     const currentTip = allTips[activeTipIndex % allTips.length];

     return (
        <g className="animate-fade-in cursor-pointer">
           <foreignObject x={currentTip.cx - 60} y={currentTip.cy - 60} width="120" height="80" className="overflow-visible">
              <div className="relative group">
                 <div className="bg-white text-black p-2 rounded-lg shadow-xl text-[8px] leading-tight font-medium relative z-20 animate-float border border-gray-300 max-w-[120px]">
                    <div className="flex items-center gap-1 mb-1 text-indigo-600 font-bold uppercase tracking-wide">
                       <MessageCircle size={8} /> Live Tip
                    </div>
                    {currentTip.content.substring(0, 50)}...
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45 border-r border-b border-gray-300"></div>
                 </div>
                 {/* Connection Line */}
                 <div className="absolute top-full left-1/2 w-px h-6 bg-white/50 -mt-1 origin-top animate-pulse"></div>
                 {/* Dot on map */}
                 <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
              </div>
           </foreignObject>
        </g>
     );
  };

  return (
    <section className={`py-20 relative transition-colors duration-1000 h-full overflow-hidden`} style={{ background: isNight ? '#050A19' : 'var(--theme-bg, #0F172A)' }} id="living-map">
      
      {/* Dynamic Sky Background */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
         {/* Stars (Night only) */}
         <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-${isNight ? '60' : '0'} transition-opacity duration-1000`}></div>
         
         {/* Sun / Moon Movement */}
         <div 
            className="absolute top-10 w-16 h-16 rounded-full transition-all duration-1000 ease-in-out blur-xl"
            style={{ 
               left: isNight ? '80%' : `${Math.max(10, Math.min(90, sunPosition))}%`,
               backgroundColor: isNight ? '#E2E8F0' : 'var(--theme-primary, #FDB813)',
               boxShadow: isNight ? '0 0 40px #E2E8F0' : '0 0 60px var(--theme-primary, #FDB813)',
               opacity: 0.8
            }}
         ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
        <Reveal width="fit-content">
          <div className="flex justify-between items-end w-full">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-4xl text-white mb-2">The Living Map</h2>
                {/* Time Indicator Badge */}
                <div className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold border flex items-center gap-1 ${isNight ? 'bg-indigo-950 border-indigo-500/50 text-indigo-200' : 'bg-white/10 border-white/20 text-white'}`} style={{ borderColor: isNight ? '' : 'var(--theme-primary)' }}>
                    {isNight ? <Moon size={12} /> : <Sun size={12} />}
                    {timeOfDay}:00 hrs
                </div>
              </div>
              <p className="text-gray-300">See how Bharat changes with time, seasons & vibes.</p>
            </div>
          </div>
        </Reveal>

        <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative mt-10">
          
          {/* Main Abstract Map Visualization */}
          <Reveal delay={0.4} className="w-full md:w-3/4 max-w-2xl">
            <div className={`relative w-full aspect-[4/5] flex items-center justify-center rounded-3xl border backdrop-blur-sm overflow-hidden shadow-2xl transition-all duration-1000 ${isNight ? 'bg-[#0B1221]/80 border-indigo-900/30' : 'bg-white/5 border-white/10'}`}>
              
              {/* Dynamic Overlay Text */}
              <div className="absolute top-6 left-6 z-20">
                  <h3 className={`text-4xl md:text-5xl font-display capitalize opacity-90 transition-colors duration-500 ${isNight ? 'text-indigo-200' : ''}`} style={{ color: isNight ? '' : 'var(--theme-primary)' }}>{currentSeason}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs uppercase tracking-widest text-white/60">Vibe:</span>
                    <span className={`text-sm font-bold uppercase`} style={{ color: 'var(--theme-secondary)' }}>{currentVibe}</span>
                  </div>
              </div>

              {/* Mode Indicators */}
              <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
                 {isUtsavMode && (
                   <div className="bg-pink-900/40 border border-pink-500/50 px-3 py-1 rounded-full flex items-center gap-2 text-xs text-pink-200 animate-pulse">
                      <PartyPopper size={12} /> Utsav Mode Live
                   </div>
                 )}
                 {isSecretMode && (
                   <div className="bg-purple-900/40 border border-purple-500/50 px-3 py-1 rounded-full flex items-center gap-2 text-xs text-purple-200 animate-pulse">
                      <Gem size={12} /> Secret Mode
                   </div>
                 )}
                 {showHistory && (
                   <div className="bg-amber-900/40 border border-amber-500/50 px-3 py-1 rounded-full flex items-center gap-2 text-xs text-amber-200">
                      <History size={12} /> Year {historyYear}
                   </div>
                 )}
              </div>

              {/* Abstract Shape Representing India */}
              <svg viewBox="0 0 400 500" className="w-full h-full max-w-md drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] z-10 p-10">
                  {/* Map Outline */}
                  <path 
                    d="M 150 50 L 250 50 L 280 150 L 350 180 L 300 250 L 200 450 L 100 250 L 50 180 L 120 150 Z" 
                    fill={isNight ? '#0F172A' : 'none'} 
                    stroke={isNight ? '#6366F1' : 'currentColor'} 
                    strokeWidth="2" 
                    className={`transition-all duration-1000 ${isSecretMode || isUtsavMode ? 'opacity-30' : 'opacity-100'}`}
                    style={{ color: isNight ? '' : 'var(--theme-primary)' }}
                  />
                  
                  {/* FEATURE: UTSAV & MELA (Festivals) */}
                  {isUtsavMode && (
                     <g className="animate-fade-in">
                        {renderFestivals()}
                        {/* Simulated Holi Splash Effect Overlay */}
                        <circle cx="200" cy="250" r="100" fill="url(#holiGrad)" opacity="0.1" className="animate-pulse" />
                        <defs>
                           <radialGradient id="holiGrad">
                              <stop offset="0%" stopColor="#ec4899" />
                              <stop offset="50%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="transparent" />
                           </radialGradient>
                        </defs>
                     </g>
                  )}

                  {/* FEATURE: HISTORY TIME MACHINE */}
                  {showHistory && (
                     <g>
                        {HISTORICAL_SITES.filter(s => s.year <= historyYear).map(site => (
                           <g key={site.id} className="animate-fade-in group cursor-pointer">
                              <circle cx={site.cx} cy={site.cy} r="4" fill="#F59E0B" className="animate-pulse" />
                              <text x={site.cx + 6} y={site.cy + 4} fontSize="8" fill="#FCD34D" className="opacity-0 group-hover:opacity-100 transition-opacity font-serif">{site.name}</text>
                           </g>
                        ))}
                     </g>
                  )}

                  {/* FEATURE: HIDDEN GEMS */}
                  {isSecretMode && (
                     <g>
                        {HIDDEN_GEMS.map(gem => (
                           <g key={gem.id} className="animate-bloom group cursor-pointer">
                              <path transform={`translate(${gem.cx - 5}, ${gem.cy - 5}) scale(0.5)`} d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#A855F7" />
                              <circle cx={gem.cx} cy={gem.cy} r="8" fill="transparent" stroke="#A855F7" strokeWidth="0.5" className="animate-ping" />
                              <text x={gem.cx + 8} y={gem.cy + 3} fontSize="8" fill="#E9D5FF" className="opacity-0 group-hover:opacity-100 transition-opacity">{gem.name}</text>
                           </g>
                        ))}
                     </g>
                  )}

                  {/* FEATURE: VIBE VISUALS */}
                  {!isSecretMode && !showHistory && !isUtsavMode && (
                     <g className="transition-opacity duration-1000">
                        {/* Dynamic lines based on vibe color */}
                         <path d="M 100 250 Q 120 270 100 290" stroke="var(--theme-secondary)" fill="none" className="animate-pulse" opacity="0.6" />
                         <path d="M 200 450 Q 220 440 240 450" stroke="var(--theme-secondary)" fill="none" className="animate-pulse" opacity="0.6" />
                     </g>
                  )}

                  {/* FEATURE: LIVE TIPS (THOUGHT BUBBLES) */}
                  {!isSecretMode && !showHistory && !isUtsavMode && !isNight && renderLiveTips()}

                  {/* NIGHT MODE: City Lights */}
                  {isNight && !isSecretMode && !isUtsavMode && (
                     <g className="animate-pulse-slow">
                        {[...Array(15)].map((_, i) => (
                           <circle 
                             key={`city-${i}`} 
                             cx={100 + Math.random() * 200} 
                             cy={100 + Math.random() * 300} 
                             r={Math.random() * 1.5 + 0.5} 
                             fill="#FBBF24" 
                             className="opacity-80"
                           />
                        ))}
                     </g>
                  )}
              </svg>
              
              {/* Contextual Smart Message */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                  <p className="text-white mt-2 text-sm bg-black/40 p-4 rounded-xl backdrop-blur-md border border-white/5 shadow-lg flex items-center gap-3">
                    <span className="text-2xl">{isUtsavMode ? '🎉' : isSecretMode ? '💎' : showHistory ? '⏳' : activeStyle.icon}</span>
                    <span className="italic">{getSmartMessage()}</span>
                  </p>
              </div>

              {/* CONTROLS AREA */}
              <div className="absolute bottom-[-70px] left-0 right-0 px-10 flex flex-col items-center gap-4">
                 
                 {/* 1. Time Slider */}
                 <div className="w-full flex flex-col items-center">
                   <input 
                     type="range" 
                     min="0" 
                     max="24" 
                     value={timeOfDay} 
                     onChange={handleTimeChange}
                     className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-saffron"
                   />
                   <div className="flex justify-between w-full text-[8px] text-gray-500 mt-1 uppercase tracking-wider">
                      <span>Dawn</span><span>Noon</span><span>Dusk</span><span>Midnight</span>
                   </div>
                 </div>

                 {/* 2. History Slider (Only visible in History Mode) */}
                 {showHistory && (
                   <div className="w-full bg-black/60 p-3 rounded-lg border border-amber-900/50 animate-slide-in-right">
                     <div className="flex justify-between text-xs text-amber-500 mb-1 font-bold">
                        <span>3000 BCE</span>
                        <span>{historyYear > 0 ? `${historyYear} CE` : `${Math.abs(historyYear)} BCE`}</span>
                        <span>2025 CE</span>
                     </div>
                     <input 
                       type="range" 
                       min="-3000" 
                       max="2025" 
                       value={historyYear} 
                       onChange={(e) => setHistoryYear(parseInt(e.target.value))}
                       className="w-full h-1 bg-amber-900/30 rounded-lg appearance-none cursor-pointer accent-amber-500"
                     />
                   </div>
                 )}
              </div>

            </div>
          </Reveal>

          {/* Quick-Toggle Vertical Bar (Right Side of Map) */}
          <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
             
             {/* Mode Toggles */}
             <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { setIsUtsavMode(!isUtsavMode); setShowHistory(false); setIsSecretMode(false); }}
                  className={`p-3 rounded-full border transition-all duration-300 ${isUtsavMode ? 'bg-pink-600 border-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-black/60 border-white/10 text-gray-400 hover:text-pink-400'}`}
                  title="Utsav Mode (Festivals)"
                >
                   <PartyPopper size={18} />
                </button>
                <button 
                  onClick={() => { setShowHistory(!showHistory); setIsSecretMode(false); setIsUtsavMode(false); }}
                  className={`p-3 rounded-full border transition-all duration-300 ${showHistory ? 'bg-amber-600 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-black/60 border-white/10 text-gray-400 hover:text-amber-400'}`}
                  title="History Time Machine"
                >
                   <History size={18} />
                </button>
                <button 
                  onClick={() => { setIsSecretMode(!isSecretMode); setShowHistory(false); setIsUtsavMode(false); }}
                  className={`p-3 rounded-full border transition-all duration-300 ${isSecretMode ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-black/60 border-white/10 text-gray-400 hover:text-purple-400'}`}
                  title="Hidden Gems Mode"
                >
                   <Gem size={18} />
                </button>
             </div>

             <div className="w-8 h-px bg-white/10 my-1"></div>

             {/* Vibe Mandala (Vertical Stack) */}
             <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-2 flex flex-col gap-2 shadow-xl">
                <button onClick={() => setVibe('nature')} className={`p-2 rounded-full transition-all ${currentVibe === 'nature' ? 'bg-green-600 text-white' : 'text-green-200/50 hover:text-green-400'}`} title="Nature"><Tent size={16} /></button>
                <button onClick={() => setVibe('beach')} className={`p-2 rounded-full transition-all ${currentVibe === 'beach' ? 'bg-blue-500 text-white' : 'text-blue-200/50 hover:text-blue-400'}`} title="Beach"><Anchor size={16} /></button>
                <button onClick={() => setVibe('wildlife')} className={`p-2 rounded-full transition-all ${currentVibe === 'wildlife' ? 'bg-orange-700 text-white' : 'text-orange-200/50 hover:text-orange-400'}`} title="Wildlife"><PawPrint size={16} /></button>
                <button onClick={() => setVibe('spiritual')} className={`p-2 rounded-full transition-all ${currentVibe === 'spiritual' ? 'bg-saffron text-black' : 'text-orange-100/50 hover:text-saffron'}`} title="Spiritual"><Sparkles size={16} /></button>
             </div>

             {/* Season Toggles */}
             <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-2 flex flex-col gap-2 shadow-xl">
                {(Object.keys(SEASON_DATA) as Season[]).map((season) => (
                  <button
                    key={season}
                    onClick={() => setSeason(season)}
                    className={`p-2 rounded-full transition-all duration-300 relative group ${currentSeason === season ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10 text-white/50'}`}
                    title={season}
                  >
                    <span className="text-sm">{SEASON_DATA[season].icon}</span>
                  </button>
                ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LivingMap;