import React, { useState, useEffect } from 'react';
import CosmicIntro from './components/CosmicIntro';
import MirrorSearch from './components/MirrorSearch';
import LivingMap from './components/LivingMap';
import YatraDashboard from './components/YatraDashboard';
import Footer from './components/Footer';
import CosmicBackground from './components/CosmicBackground';
import StateExplorer from './components/StateExplorer';
import YatraPlanner from './components/YatraPlanner';
import SafetyDashboard from './components/SafetyDashboard';
import AuthModal from './components/AuthModal';
import SwarRangPlayer from './components/SwarRangPlayer';
import BharatAIGuide from './components/BharatAIGuide';
import { VIBE_THEMES } from './constants';
import { 
  Aperture, 
  Search, 
  Mic, 
  Globe, 
  Map as MapIcon, 
  PieChart, 
  Sparkles, 
  ShoppingBag,
  X,
  User
} from 'lucide-react';
import { Season, YatraItem, VibeType, UserProfile } from './types';

type SlideType = 'home' | 'mirror' | 'map' | 'dashboard' | 'explore_states';

// --- Components (Outside to fix Keyboard/Focus bug) ---

const SmartSearchBar: React.FC<{
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userProfile: UserProfile | null;
  onJoinClick: () => void;
  onDashboardClick: () => void;
}> = ({ searchTerm, onSearch, userProfile, onJoinClick, onDashboardClick }) => (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron via-white to-indigo rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
      <div className="relative flex items-center bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
         <Search className="ml-4 text-saffron" size={20} />
         <input 
           type="text" 
           placeholder="Search a country, a vibe..." 
           className="w-full bg-transparent text-white px-4 py-3 focus:outline-none font-sans text-sm placeholder-gray-400"
           value={searchTerm}
           onChange={onSearch}
         />
         <button className="p-2 hover:bg-white/10 rounded-full transition-colors mx-1" title="Voice Search">
            <Mic size={18} className="text-gray-400 group-hover:text-white" />
         </button>
         <div className="w-px h-6 bg-white/10 mx-1"></div>
         <button 
           onClick={() => userProfile ? onDashboardClick() : onJoinClick()}
           className="px-3 py-1 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
         >
            {userProfile ? (
              <div className="w-6 h-6 rounded-full bg-saffron text-black flex items-center justify-center font-serif">
                 {userProfile.name.charAt(0)}
              </div>
            ) : (
              <><User size={14} /> Join</>
            )}
         </button>
      </div>
    </div>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  [cite_start]// --- All Original Global States [cite: 158-164] ---
  const [showIntro, setShowIntro] = useState(true);
  const [activeSlide, setActiveSlide] = useState<SlideType | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [mirrorSearchProp, setMirrorSearchProp] = useState('');
  const [currentSeason, setCurrentSeason] = useState<Season>('spring');
  const [currentVibe, setCurrentVibe] = useState<VibeType>('nature');
  const [isMuted, setIsMuted] = useState(true);
  const [atmosphereTint, setAtmosphereTint] = useState<'summer' | 'monsoon' | 'winter' | 'none'>('none');
  const [yatraItems, setYatraItems] = useState<YatraItem[]>([]);
  const [scenicPreview, setScenicPreview] = useState<string | null>(null);

  [cite_start]// --- All Original Handlers [cite: 165-178] ---
  useEffect(() => {
    const theme = VIBE_THEMES[currentVibe] || VIBE_THEMES['nature'];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
  }, [currentVibe]);

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowAuthModal(false);
    setCurrentVibe(profile.vibe);
  };

  const handleLogout = () => setUserProfile(null);

  const handleAddToYatra = (item: YatraItem) => {
    if (!yatraItems.find(i => i.id === item.id)) {
      setYatraItems(prev => [...prev, item]);
    }
  };

  const handleRemoveFromYatra = (id: string) => {
    setYatraItems(prev => prev.filter(i => i.id !== id));
  };

  const handleSmartSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setGlobalSearchTerm(term);
    const lowerTerm = term.toLowerCase();

    if (lowerTerm.includes('snow') || lowerTerm.includes('winter') || lowerTerm.includes('kashmir')) {
       setCurrentSeason('winter');
       setCurrentVibe('nature');
       if (activeSlide !== 'map') setActiveSlide('map');
    } else if (lowerTerm.includes('budget') || lowerTerm.includes('cost') || lowerTerm.includes('price')) {
       if (activeSlide !== 'dashboard') setActiveSlide('dashboard');
    } else if (term.length > 2) {
       if (activeSlide !== 'mirror') setActiveSlide('mirror');
       setMirrorSearchProp(term);
    }
  };

  const closeSlide = () => { setActiveSlide(null); setNavOpen(false); };
  const toggleSlide = (slide: SlideType) => { setActiveSlide(activeSlide === slide ? null : slide); setNavOpen(false); };

  return (
    <div className="h-screen w-screen overflow-hidden text-white font-sans relative transition-all duration-1000">
      
      {!showIntro && <CosmicBackground />}

      [cite_start]{/* 1.1 Atmosphere Tint Overlay[span_0](end_span) */}
      <div 
         className="absolute inset-0 pointer-events-none z-0 transition-colors duration-1000 mix-blend-overlay"
         style={{
            backgroundColor: 
               atmosphereTint === 'summer' ? 'rgba(253, 224, 71, 0.1)' : 
               atmosphereTint === 'monsoon' ? 'rgba(20, 184, 166, 0.1)' :
               atmosphereTint === 'winter' ? 'rgba(191, 219, 254, 0.1)' : 'transparent'
         }}
      ></div>

      [span_1](start_span){/* 1.2 Scenic Immersive Layer[span_1](end_span) */}
      {scenicPreview && (
        <div className="fixed inset-0 z-10 transition-opacity duration-1000 ease-in-out pointer-events-none">
           <div className="absolute inset-0 bg-black/40 z-10"></div>
           <img src={scenicPreview} className="w-full h-full object-cover animate-pulse-slow" alt="Scenic Preview" />
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-black/60 px-4 py-2 rounded-full border border-saffron/30 backdrop-blur-md">
              <span className="text-saffron text-sm uppercase tracking-widest font-display">Live Scenery Preview</span>
           </div>
        </div>
      )}
      
      {!showIntro && (
        <>
          <YatraPlanner items={yatraItems} onRemove={handleRemoveFromYatra} onScenicHover={setScenicPreview} />
          <SafetyDashboard />
          <BharatAIGuide user={userProfile} currentContext={{ state: activeSlide === 'explore_states' ? 'Rajasthan' : undefined, vibe: currentVibe }} />
          <SwarRangPlayer isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} onTintChange={setAtmosphereTint} primaryColor={VIBE_THEMES[currentVibe].primary} />

          <SmartSearchBar 
             searchTerm={globalSearchTerm}
             onSearch={handleSmartSearch}
             userProfile={userProfile}
             onJoinClick={() => setShowAuthModal(true)}
             onDashboardClick={() => toggleSlide('dashboard')}
          />

          [span_2](start_span){/* FADE-OUT WRAPPER FOR NAV [cite: 186-187] */}
          <div className={`transition-opacity duration-700 ${activeSlide ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              
              [cite_start]{/* Universal Nav Orb [cite: 145-154] */}
              <div className="fixed bottom-32 left-8 z-50">
                <div className={`absolute bottom-2 left-2 transition-all duration-300 ${navOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={() => toggleSlide('mirror')} className="absolute -translate-y-32 w-12 h-12 rounded-full bg-cosmos-light border border-white/20 flex items-center justify-center hover:bg-saffron hover:text-black transition-all shadow-lg"><Globe size={20} /></button>
                    <button onClick={() => toggleSlide('map')} className="absolute -translate-y-24 translate-x-24 w-12 h-12 rounded-full bg-cosmos-light border border-white/20 flex items-center justify-center hover:bg-saffron hover:text-black transition-all shadow-lg"><MapIcon size={20} /></button>
                    <button onClick={() => toggleSlide('dashboard')} className="absolute translate-x-32 w-12 h-12 rounded-full bg-cosmos-light border border-white/20 flex items-center justify-center hover:bg-saffron hover:text-black transition-all shadow-lg"><PieChart size={20} /></button>
                </div>
                <button onClick={() => setNavOpen(!navOpen)} className={`relative w-16 h-16 rounded-full bg-gradient-to-tr from-cosmos to-black border-2 border-saffron/50 shadow-[0_0_30px_rgba(255,153,51,0.4)] flex items-center justify-center transition-transform duration-500 z-50 ${navOpen ? 'rotate-180' : ''}`}>
                    <Aperture className="text-saffron" size={32} />
                </button>
              </div>

              [cite_start]{/* Side Access Panel [cite: 155-157] */}
              <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-8 pr-4">
                {['States', 'Culture', 'Food', 'Festivals', 'Safety'].map((item) => (
                  <div key={item} className="group flex items-center justify-end gap-4 cursor-pointer" onClick={() => item === 'States' && toggleSlide('explore_states')}>
                      <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-saffron transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">{item}</span>
                      <div className="w-1 h-8 bg-white/20 rounded-full group-hover:bg-saffron group-hover:h-12 transition-all"></div>
                  </div>
                ))}
              </div>

              <div className="fixed top-8 left-8 z-40 hidden md:block">
                <h1 className="font-serif font-bold text-lg text-white/80 tracking-wide">Prakruteh Garbhah</h1>
              </div>

              <div className="fixed bottom-36 left-32 z-20 pointer-events-none animate-pulse hidden md:block">
                <p className="text-white/40 font-display tracking-widest text-xs">Explore the Cosmos via the Orb</p>
              </div>
          </div>

          <main className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-0 md:p-6 lg:p-12">
             [cite_start]{/* Mirror Slide [cite: 189-191] */}
             <div className={`absolute inset-0 md:inset-10 bg-cosmos/95 glass-card md:rounded-3xl overflow-y-auto pointer-events-auto flex flex-col transition-all duration-500 ${activeSlide === 'mirror' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <button onClick={closeSlide} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full z-50"><X size={24} /></button>
                 <div className="flex-1 mt-16 md:mt-0"><MirrorSearch externalTerm={mirrorSearchProp} /></div>
             </div>

             [cite_start]{/* Map Slide [cite: 192-194] */}
             <div className={`absolute inset-0 md:inset-10 bg-cosmos/95 glass-card md:rounded-3xl overflow-hidden pointer-events-auto flex flex-col transition-all duration-500 ${activeSlide === 'map' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                 <button onClick={closeSlide} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full z-50"><X size={24} /></button>
                 <div className="flex-1 h-full mt-16 md:mt-0">
                    <LivingMap currentSeason={currentSeason} setSeason={setCurrentSeason} currentVibe={currentVibe} setVibe={setCurrentVibe} isMuted={isMuted} toggleSound={() => setIsMuted(!isMuted)} />
                 </div>
             </div>

             [cite_start]{/* State Explorer[span_2](end_span) */}
             {activeSlide === 'explore_states' && (
                <div className="absolute inset-0 z-50 pointer-events-auto bg-cosmos">
                   <StateExplorer onClose={closeSlide} onAddToYatra={handleAddToYatra} />
                </div>
             )}

             [cite_start]{/* Dashboard Slide [cite: 196-205] */}
             <div className={`absolute inset-0 md:inset-10 bg-cosmos/95 glass-card md:rounded-3xl overflow-y-auto pointer-events-auto flex flex-col transition-all duration-500 ${activeSlide === 'dashboard' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
                 <button onClick={closeSlide} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full z-50"><X size={24} /></button>
                 <div className="flex-1 mt-16 md:mt-0">
                    <section className="py-10 px-4 text-center border-b border-white/10">
                       <div className="flex items-center justify-center gap-2 mb-8">
                          <ShoppingBag className="text-saffron" />
                          <h2 className="font-serif text-3xl">Vocal for Local</h2>
                       </div>
                       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                         {['Kanchipuram Silk', 'Blue Pottery', 'Pashmina'].map((craft, i) => (
                           <div key={i} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer border border-white/20">
                             <img src={`https://picsum.photos/400?random=${i+10}`} alt={craft} className="w-full h-full object-cover group-hover:scale-110 transition-all"/>
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <span className="text-white font-display border border-white px-4 py-2">{craft}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                    </section>
                    <YatraDashboard user={userProfile} onLoginRequest={() => { closeSlide(); setShowAuthModal(true); }} onLogout={handleLogout} onUpdateBudget={(b) => setUserProfile(prev => prev ? {...prev, totalBudget: b} : null)} />
                    <Footer />
                 </div>
             </div>
          </main>
          
          {showAuthModal && <AuthModal onLogin={handleLogin} onClose={() => setShowAuthModal(false)} />}
        </>
      )}

      {showIntro && <div className="absolute inset-0 z-50"><CosmicIntro onExplore={() => setShowIntro(false)} /></div>}
    </div>
  );
};

export default App;
    
