import React, { useState } from 'react';
import { ArrowLeft, X, Utensils, Shirt, Info, Trees, Scroll, Hexagon, Flame, Heart, MapPin, ChefHat, MessageCircle, ShoppingBag, Gamepad2, Video, Award, Users } from 'lucide-react';
import { STATE_DATA } from '../constants';
import { StateProfile, DistrictProfile, FoodItem, ArtisanProduct } from '../types';
import Reveal from './Reveal';
import LanguageCard from './LanguageCard';
import GyaanDrawer from './GyaanDrawer';
import KarigarStoryModal from './KarigarStoryModal';
import DigitalLoom from './DigitalLoom';
import AnubhavWall from './AnubhavWall';

interface StateExplorerProps {
  onClose: () => void;
  onAddToYatra: (item: any) => void;
}

const StateExplorer: React.FC<StateExplorerProps> = ({ onClose, onAddToYatra }) => {
  const [viewLevel, setViewLevel] = useState<'country' | 'state' | 'district'>('country');
  const [selectedState, setSelectedState] = useState<StateProfile | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictProfile | null>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  
  // Modes
  const [isGullyMode, setIsGullyMode] = useState(false);
  const [isShoppingMode, setIsShoppingMode] = useState(false);

  // Overlays
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [showLanguageCard, setShowLanguageCard] = useState(false);
  const [showGyaanDrawer, setShowGyaanDrawer] = useState(false);
  const [selectedArtisanProduct, setSelectedArtisanProduct] = useState<ArtisanProduct | null>(null);
  const [showLoom, setShowLoom] = useState(false);
  const [showAnubhavWall, setShowAnubhavWall] = useState(false);

  // Reset logic
  const goBack = () => {
    if (showAnubhavWall) { setShowAnubhavWall(false); return; }
    if (showLoom) { setShowLoom(false); return; }
    if (selectedArtisanProduct) { setSelectedArtisanProduct(null); return; }
    if (selectedFood) { setSelectedFood(null); return; }
    if (showLanguageCard) { setShowLanguageCard(false); return; }
    if (showGyaanDrawer) { setShowGyaanDrawer(false); return; }
    
    if (viewLevel === 'district') {
      setViewLevel('state');
      setSelectedDistrict(null);
    } else if (viewLevel === 'state') {
      setViewLevel('country');
      setSelectedState(null);
    } else {
      onClose();
    }
  };

  const handleStateClick = (state: StateProfile) => {
    setSelectedState(state);
    setViewLevel('state');
  };

  const handleDistrictClick = (district: DistrictProfile) => {
    if (isGullyMode || isShoppingMode) {
       // In these modes, we rely on hover/direct interaction with bubbles
    } else {
       setSelectedDistrict(district);
       setViewLevel('district');
    }
  };

  const handleFoodClick = (food: FoodItem, districtName: string, stateName: string) => {
     setSelectedFood(food);
  };

  const handleArtisanClick = (product: ArtisanProduct) => {
     setSelectedArtisanProduct(product);
  };

  const handleAddToYatraLocal = (item: any) => {
     onAddToYatra(item);
  };

  // Render SVG Map of Bharat
  const RenderCountryMap = () => (
    <div className="relative w-full h-full flex items-center justify-center p-10 animate-fade-in">
       <div className="absolute top-10 text-center z-20 pointer-events-none">
          <h2 className="font-serif text-3xl text-saffron mb-2">Explore Bharat</h2>
          <p className="text-gray-400 text-sm">Select a region to begin your deep dive</p>
       </div>

       <svg viewBox="0 0 400 500" className="w-full h-full max-w-2xl drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <path 
             d="M 150 50 L 250 50 L 280 150 L 350 180 L 300 250 L 200 450 L 100 250 L 50 180 L 120 150 Z" 
             fill="none" 
             stroke="#334155" 
             strokeWidth="1"
             className="opacity-50"
          />

          {STATE_DATA.map((state) => (
             <g 
               key={state.id} 
               onClick={() => handleStateClick(state)}
               onMouseEnter={() => setHoveredStateId(state.id)}
               onMouseLeave={() => setHoveredStateId(null)}
               className="cursor-pointer transition-all duration-300 group"
             >
                <path 
                   d={state.path} 
                   fill={hoveredStateId === state.id ? state.color : 'rgba(30, 41, 59, 0.8)'}
                   stroke={state.color}
                   strokeWidth={hoveredStateId === state.id ? 2 : 1}
                   className="transition-all duration-300 ease-out"
                />
                
                {hoveredStateId === state.id && (
                   <foreignObject x="0" y="0" width="400" height="500" style={{ pointerEvents: 'none' }}>
                      <div className="w-full h-full relative overflow-hidden" style={{ clipPath: `path('${state.path}')` }}>
                         {state.animType === 'heat' && <div className="absolute inset-0 bg-orange-500/20 animate-heat-wave"></div>}
                         {state.animType === 'rain' && <div className="absolute inset-0 bg-blue-500/10"><div className="w-full h-full bg-[url('https://cdn.pixabay.com/animation/2023/06/25/21/53/21-53-52-780_512.gif')] opacity-20 bg-cover mix-blend-overlay"></div></div>}
                         {state.animType === 'snow' && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
                      </div>
                   </foreignObject>
                )}
                
                {hoveredStateId === state.id && (
                  <text x="200" y="480" textAnchor="middle" fill="white" className="font-serif text-lg tracking-widest uppercase animate-fade-in pointer-events-none">
                     {state.name}
                  </text>
                )}
             </g>
          ))}
       </svg>
    </div>
  );

  // Render Zoomed State View
  const RenderStateView = () => {
     if (!selectedState) return null;
     
     // Dynamic styling based on Mode
     let fillColor = selectedState.color;
     let strokeColor = selectedState.color;
     let opacity = 0.4;

     if (isGullyMode) {
        fillColor = '#F97316'; // Orange
        opacity = 0.6;
     } else if (isShoppingMode) {
        fillColor = '#EC4899'; // Pink/Magenta for Swadeshi
        opacity = 0.5;
     }
     
     return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
           
           {/* Mode Backgrounds */}
           {isGullyMode && <div className="absolute inset-0 bg-orange-500/10 mix-blend-screen pointer-events-none z-0"></div>}
           {isShoppingMode && <div className="absolute inset-0 bg-pink-500/10 mix-blend-screen pointer-events-none z-0"></div>}

           <svg viewBox={selectedState.viewBox} className="w-full h-full max-w-3xl drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-fade-in z-10">
              <defs>
                 <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={fillColor} stopOpacity={0.1} />
                    <stop offset="100%" stopColor={fillColor} stopOpacity={opacity} />
                 </linearGradient>
              </defs>
              <path 
                 d={selectedState.path} 
                 fill="url(#stateGrad)" 
                 stroke={strokeColor} 
                 strokeWidth="0.5"
                 className="transition-colors duration-500"
              />
              
              {selectedState.districts.map((district) => {
                 const vb = selectedState.viewBox.split(' ').map(Number);
                 const x = vb[0] + (district.cx / 100) * vb[2];
                 const y = vb[1] + (district.cy / 100) * vb[3];
                 
                 return (
                    <g key={district.id} onClick={() => handleDistrictClick(district)} className="cursor-pointer group">
                       
                       {/* Standard Marker */}
                       {!isGullyMode && !isShoppingMode && (
                          <>
                             <circle cx={x} cy={y} r="2" fill="white" className="animate-pulse" />
                             <circle cx={x} cy={y} r="6" stroke="white" strokeWidth="0.5" fill="transparent" className="group-hover:scale-150 transition-transform duration-300" />
                             <text x={x} y={y + 8} textAnchor="middle" fontSize="4" fill="white" className="font-sans opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                                {district.name}
                             </text>
                          </>
                       )}

                       {/* Gully Mode Interaction */}
                       {isGullyMode && (
                          <foreignObject x={x - 15} y={y - 15} width="30" height="30" className="overflow-visible pointer-events-none group-hover:pointer-events-auto">
                              <div className="w-30 h-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 origin-center">
                                  <div className="bg-black/90 rounded-full border border-saffron/50 p-2 shadow-xl relative w-24 h-24 -mt-8 -ml-8 flex flex-wrap items-center justify-center gap-1 backdrop-blur-md">
                                      <div className="absolute -top-4 w-full text-center">
                                         <span className="bg-saffron text-black text-[3px] font-bold px-1 rounded uppercase">{district.name}</span>
                                      </div>
                                      {district.famousFoods?.map((food) => (
                                          <div 
                                            key={food.id}
                                            onClick={(e) => { e.stopPropagation(); handleFoodClick(food, district.name, selectedState.name); }}
                                            className="w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-saffron hover:scale-125 transition-all cursor-pointer bg-gray-800"
                                            title={food.name}
                                          >
                                              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                                          </div>
                                      ))}
                                  </div>
                              </div>
                              {/* Trigger Circle */}
                              <div className="w-4 h-4 rounded-full border-2 border-saffron bg-orange-900/50 absolute top-[13px] left-[13px] flex items-center justify-center pointer-events-auto">
                                 <Utensils size={8} className="text-saffron" />
                              </div>
                          </foreignObject>
                       )}

                       {/* Shopping Mode Interaction */}
                       {isShoppingMode && (
                          <foreignObject x={x - 15} y={y - 15} width="30" height="30" className="overflow-visible pointer-events-none group-hover:pointer-events-auto">
                              <div className="w-30 h-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 origin-center">
                                  <div className="bg-black/90 rounded-full border border-pink-500/50 p-2 shadow-xl relative w-24 h-24 -mt-8 -ml-8 flex flex-wrap items-center justify-center gap-1 backdrop-blur-md">
                                      <div className="absolute -top-4 w-full text-center">
                                         <span className="bg-pink-600 text-white text-[3px] font-bold px-1 rounded uppercase">{district.name} Craft</span>
                                      </div>
                                      {district.artisanProducts?.map((prod) => (
                                          <div 
                                            key={prod.id}
                                            onClick={(e) => { e.stopPropagation(); handleArtisanClick(prod); }}
                                            className="w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-pink-500 hover:scale-125 transition-all cursor-pointer bg-gray-800"
                                            title={prod.name}
                                          >
                                              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                          </div>
                                      ))}
                                      {(!district.artisanProducts || district.artisanProducts.length === 0) && (
                                         <span className="text-[3px] text-gray-500">No products</span>
                                      )}
                                  </div>
                              </div>
                              {/* Trigger Circle */}
                              <div className="w-4 h-4 rounded-full border-2 border-pink-500 bg-pink-900/50 absolute top-[13px] left-[13px] flex items-center justify-center pointer-events-auto">
                                 <ShoppingBag size={8} className="text-pink-400" />
                              </div>
                          </foreignObject>
                       )}
                    </g>
                 )
              })}
           </svg>
           
           {/* Standard Lotus Menu */}
           {viewLevel === 'district' && selectedDistrict && !isGullyMode && !isShoppingMode && !showLanguageCard && !showGyaanDrawer && !showLoom && !showAnubhavWall && (
              <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={() => setViewLevel('state')}>
                 <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-saffron to-red-600 border-4 border-black shadow-[0_0_30px_rgba(255,153,51,0.5)] flex flex-col items-center justify-center z-20 relative">
                       <h3 className="font-serif text-white font-bold">{selectedDistrict.name}</h3>
                       <button 
                         onClick={() => handleAddToYatraLocal({ id: selectedDistrict.id, title: selectedDistrict.name, category: 'place', location: selectedState?.name })}
                         className="mt-1 bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors"
                         title="Add to Yatra"
                       >
                          <Heart size={12} className="text-white" />
                       </button>
                    </div>

                    {[
                       { icon: <Utensils size={18} />, label: 'Food', color: 'bg-orange-500', action: () => setIsGullyMode(true) },
                       { icon: <Shirt size={18} />, label: 'Wear', color: 'bg-pink-500', action: () => setIsShoppingMode(true) },
                       { icon: <MessageCircle size={18} />, label: 'Speak', color: 'bg-indigo-500', action: () => setShowLanguageCard(true) },
                       { icon: <Scroll size={18} />, label: 'Gyaan', color: 'bg-amber-600', action: () => setShowGyaanDrawer(true) },
                       { icon: <Users size={18} />, label: 'Anubhav', color: 'bg-teal-500', action: () => setShowAnubhavWall(true) }, // Bharat Anubhav Trigger
                       { icon: <Gamepad2 size={18} />, label: 'Weave', color: 'bg-blue-500', action: () => setShowLoom(true) }, 
                    ].map((item, index) => {
                       const angle = (index * 60) * (Math.PI / 180);
                       const tx = Math.cos(angle) * 100;
                       const ty = Math.sin(angle) * 100;
                       return (
                          <div 
                            key={index}
                            onClick={item.action}
                            className={`absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 rounded-full ${item.color} border-2 border-white/20 flex flex-col items-center justify-center text-white text-[9px] shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 animate-bloom origin-center`}
                            style={{ 
                               transform: `translate(${tx}px, ${ty}px)`,
                               animationDelay: `${index * 0.05}s`
                            }}
                          >
                             {item.icon}
                             <span className="mt-1">{item.label}</span>
                          </div>
                       )
                    })}
                 </div>
                 <div className="absolute bottom-20 text-white/50 text-xs animate-pulse">Click anywhere else to close district view</div>
              </div>
           )}

           {/* --- MODALS & DRAWERS --- */}

           {showLanguageCard && selectedDistrict && selectedDistrict.language && (
              <LanguageCard 
                language={selectedDistrict.language}
                districtName={selectedDistrict.name}
                onClose={() => setShowLanguageCard(false)}
              />
           )}

           {showGyaanDrawer && selectedDistrict && (
              <GyaanDrawer 
                 districtName={selectedDistrict.name}
                 knowledge={selectedDistrict.knowledge}
                 games={selectedDistrict.games}
                 onClose={() => setShowGyaanDrawer(false)}
              />
           )}

           {showLoom && selectedDistrict && (
              <DigitalLoom 
                 patternName={`${selectedDistrict.name} Weave`}
                 onClose={() => setShowLoom(false)}
              />
           )}

           {showAnubhavWall && selectedDistrict && (
              <AnubhavWall 
                 district={selectedDistrict}
                 onClose={() => setShowAnubhavWall(false)}
              />
           )}

           {selectedArtisanProduct && (
              <KarigarStoryModal 
                 product={selectedArtisanProduct}
                 onClose={() => setSelectedArtisanProduct(null)}
              />
           )}

           {/* Food Recipe Modal */}
           {selectedFood && (
              <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                 <div className="bg-cosmos border border-saffron/30 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative animate-fade-in h-[80vh] flex flex-col">
                    <button onClick={() => setSelectedFood(null)} className="absolute top-4 right-4 text-white hover:text-red-400 z-10 p-2 bg-black/30 rounded-full"><X size={20} /></button>
                    
                    <div className="h-48 relative flex-shrink-0">
                       <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-cosmos to-transparent"></div>
                       <div className="absolute bottom-4 left-4">
                          <h3 className="font-serif text-2xl text-white">{selectedFood.name}</h3>
                       </div>
                    </div>
                    
                    <div className="p-6 overflow-y-auto">
                       <div className="flex items-start gap-3 mb-4">
                          <Scroll className="text-gray-400 mt-1 flex-shrink-0" size={16} />
                          <p className="text-sm text-gray-300 italic">"{selectedFood.legend}"</p>
                       </div>
                       
                       <div className="flex items-center gap-2 mb-4 text-xs text-gray-400 border-b border-white/10 pb-2">
                          <ChefHat size={14} /> Famous at <span className="text-white font-bold">{selectedFood.famousShop}</span>
                       </div>

                       {/* Recipe Section */}
                       {selectedFood.recipe && (
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                             <h4 className="text-saffron text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Utensils size={14} /> Recipe Card
                             </h4>
                             
                             <div className="mb-3">
                                <span className="text-[10px] text-gray-500 uppercase font-bold">Difficulty</span>
                                <span className={`ml-2 text-xs font-bold ${selectedFood.recipe.difficulty === 'Easy' ? 'text-green-400' : 'text-orange-400'}`}>{selectedFood.recipe.difficulty}</span>
                             </div>

                             <div className="mb-3">
                                <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Ingredients</span>
                                <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
                                   {selectedFood.recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                                </ul>
                             </div>

                             <button className="w-full py-2 bg-saffron/20 border border-saffron/50 text-saffron text-xs font-bold uppercase rounded hover:bg-saffron hover:text-black transition-colors">
                                Save to My Recipes
                             </button>
                          </div>
                       )}

                       <button 
                         onClick={() => {
                            handleAddToYatraLocal({ id: selectedFood.id, title: selectedFood.name, category: 'food', location: selectedState?.name, image: selectedFood.image });
                            setSelectedFood(null);
                         }}
                         className="w-full py-3 mt-4 bg-saffron hover:bg-orange-600 text-black font-bold uppercase tracking-widest text-xs rounded transition-colors flex items-center justify-center gap-2"
                       >
                          <Heart size={16} /> Add to Yatra Bag
                       </button>
                    </div>
                 </div>
              </div>
           )}
        </div>
     );
  };

  return (
    <div className="fixed inset-0 z-50 bg-cosmos flex flex-col md:flex-row overflow-hidden font-sans">
       
       {/* 1. State Identity Card (Sidebar) */}
       <aside className={`w-full md:w-96 bg-cosmos-light border-r border-white/10 p-8 flex flex-col transition-all duration-500 ${viewLevel !== 'country' && selectedState ? 'translate-x-0' : '-translate-x-full md:-translate-x-96 absolute md:relative z-30'}`}>
          {selectedState && (
             <div className="h-full flex flex-col animate-slide-in-left">
                <div className="mb-6">
                   <h2 className="font-serif text-4xl text-white mb-1">{selectedState.name}</h2>
                   <p className="text-saffron uppercase tracking-widest text-xs font-bold">{selectedState.nickname}</p>
                </div>
                
                <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar">
                   <div className="p-4 bg-white/5 rounded-lg border-l-2 border-saffron">
                      <p className="text-gray-300 text-sm italic">"{selectedState.description}"</p>
                   </div>
                   {/* ... existing sidebar content ... */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/30 p-3 rounded">
                         <span className="text-xs text-gray-500 uppercase block mb-1">Climate</span>
                         <span className="text-white text-sm">{selectedState.climate}</span>
                      </div>
                      <div className="bg-black/30 p-3 rounded">
                         <span className="text-xs text-gray-500 uppercase block mb-1">Best Time</span>
                         <span className="text-white text-sm">{selectedState.bestTime}</span>
                      </div>
                   </div>

                   <div>
                      <h4 className="text-white font-serif mb-3 border-b border-white/10 pb-2">Major Landmarks</h4>
                      <ul className="space-y-2">
                         {selectedState.landmarks.map(l => (
                            <li key={l} className="text-gray-400 text-sm flex items-center gap-2">
                               <div className="w-1.5 h-1.5 bg-saffron rounded-full"></div> {l}
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                   <button onClick={() => setViewLevel('country')} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                      <ArrowLeft size={16} /> Back to Bharat Map
                   </button>
                </div>
             </div>
          )}
       </aside>

       {/* 2. Main Map Area */}
       <main className="flex-1 relative bg-gradient-to-br from-cosmos to-black">
          {/* Top Controls */}
          <div className="absolute top-6 right-6 z-50 flex gap-4 items-center">
             
             {viewLevel !== 'country' && (
                <>
                   {/* Gully Food Toggle */}
                   <button 
                     onClick={() => { setIsGullyMode(!isGullyMode); setIsShoppingMode(false); }}
                     className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isGullyMode ? 'bg-orange-600 border-orange-400 text-white shadow-[0_0_15px_rgba(234,88,12,0.5)]' : 'bg-black/40 border-white/20 text-gray-400 hover:text-white'}`}
                   >
                      <Utensils size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">Gully Food</span>
                   </button>

                   {/* Shopping Mode Toggle */}
                   <button 
                     onClick={() => { setIsShoppingMode(!isShoppingMode); setIsGullyMode(false); }}
                     className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isShoppingMode ? 'bg-pink-600 border-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-black/40 border-white/20 text-gray-400 hover:text-white'}`}
                   >
                      <ShoppingBag size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">Swadeshi Shop</span>
                   </button>
                </>
             )}

             {viewLevel !== 'country' && (
                <button 
                  onClick={goBack}
                  className="bg-black/40 backdrop-blur border border-white/20 text-white p-3 rounded-full hover:bg-white/10 transition-colors"
                  title="Back"
                >
                   <ArrowLeft size={20} />
                </button>
             )}
             <button 
               onClick={onClose}
               className="bg-red-500/10 backdrop-blur border border-red-500/30 text-red-400 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors"
               title="Close Explorer"
             >
                <X size={20} />
             </button>
          </div>

          {/* Map Render Logic */}
          <div className="w-full h-full flex items-center justify-center">
             {viewLevel === 'country' ? <RenderCountryMap /> : <RenderStateView />}
          </div>
       </main>
    </div>
  );
};

const states = getAllStates();

states.map(state => (
  <StateCard key={state.id} state={state} />
));
export default StateExplorer;
