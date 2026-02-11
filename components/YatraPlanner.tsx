import React, { useState } from 'react';
import { ShoppingBag, X, Calendar, MapPin, Sparkles, Trash2, Heart, Train, Wallet, FileText, CheckCircle, AlertTriangle, Clock, ChevronRight, GripVertical, Plus } from 'lucide-react';
import { YatraItem, ScenicRoute } from '../types';
import { SCENIC_ROUTES, BUDGET_TIERS } from '../constants';

interface YatraPlannerProps {
  items: YatraItem[];
  onRemove: (id: string) => void;
  onScenicHover: (imageUrl: string | null) => void;
}

const YatraPlanner: React.FC<YatraPlannerProps> = ({ items, onRemove, onScenicHover }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'plan' | 'budget' | 'docs'>('plan');
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenicMode, setScenicMode] = useState(false);
  const [travelStyle, setTravelStyle] = useState<string>('Mid-Range');
  const [originType, setOriginType] = useState<'indian' | 'foreign'>('foreign');
  const [calendarSynced, setCalendarSynced] = useState(false);
  
  // Day-wise grouping simulation (local state for UI only in this demo)
  const [itemDays, setItemDays] = useState<Record<string, number>>({});

  const handleDayChange = (itemId: string, day: number) => {
     setItemDays(prev => ({ ...prev, [itemId]: day }));
  };

  const syncToCalendar = () => {
     setCalendarSynced(true);
     setTimeout(() => setCalendarSynced(false), 3000);
  };

  // AI Generation Logic
  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const locations = [...new Set(items.map(i => i.location))];
      setGeneratedPlan(
        `Great choice! You have ${items.length} gems in your bag.\n\n` +
        `Start your journey in ${locations[0] || 'Bharat'}. We've organized your items into a 3-day cultural immersion.`
      );
      setIsGenerating(false);
      
      // Auto-assign items to days for demo
      const newDays: Record<string, number> = {};
      items.forEach((item, idx) => {
         newDays[item.id] = (idx % 3) + 1;
      });
      setItemDays(newDays);
    }, 2000);
  };

  const selectedBudget = BUDGET_TIERS.find(t => t.type === travelStyle);
  const hasRestrictedArea = items.some(i => i.requiresPermit || i.location?.includes('Leh') || i.location?.includes('Ladakh'));

  // Group items by day
  const itemsByDay: Record<number, YatraItem[]> = { 0: [] }; // 0 is 'Unscheduled'
  items.forEach(item => {
     const day = itemDays[item.id] || 0;
     if (!itemsByDay[day]) itemsByDay[day] = [];
     itemsByDay[day].push(item);
  });

  const dayKeys = Object.keys(itemsByDay).map(Number).sort((a,b) => a-b);
  // Ensure Days 1-3 exist if empty but planned
  if (generatedPlan && dayKeys.length < 4) {
     [1,2,3].forEach(d => { if(!itemsByDay[d]) itemsByDay[d] = []; });
  }

  return (
    <>
      {/* Floating Jhola (Bag) Icon */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 group flex items-center justify-center"
      >
        <div className="relative w-16 h-16 rounded-full bg-saffron text-cosmos flex items-center justify-center shadow-[0_0_20px_rgba(255,153,51,0.5)] transition-transform hover:scale-110">
           <ShoppingBag size={28} />
           {items.length > 0 && (
             <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-black">
               {items.length}
             </span>
           )}
        </div>
        <span className="absolute right-full mr-4 bg-black/80 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
           My Yatra Bag
        </span>
      </button>

      {/* Itinerary Planner Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-cosmos border-l border-white/10 z-[60] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
         {/* Header */}
         <div className="p-6 border-b border-white/10 bg-cosmos-light">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h2 className="font-serif text-2xl text-white">My Yatra Planner</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Design your pilgrimage</p>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                  <X size={24} />
               </button>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-black/40 rounded-lg">
               <button 
                 onClick={() => setActiveTab('plan')}
                 className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors ${activeTab === 'plan' ? 'bg-saffron text-black' : 'text-gray-400 hover:text-white'}`}
               >
                 Plan
               </button>
               <button 
                 onClick={() => setActiveTab('budget')}
                 className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors ${activeTab === 'budget' ? 'bg-saffron text-black' : 'text-gray-400 hover:text-white'}`}
               >
                 Pocket Guide
               </button>
               <button 
                 onClick={() => setActiveTab('docs')}
                 className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors ${activeTab === 'docs' ? 'bg-saffron text-black' : 'text-gray-400 hover:text-white'}`}
               >
                 Vault
               </button>
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* --- PLAN TAB --- */}
            {activeTab === 'plan' && (
              <>
                {items.length === 0 ? (
                  <div className="text-center py-20 opacity-50">
                      <Heart size={48} className="mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400">Your Jhola is empty.</p>
                      <p className="text-xs text-gray-500 mt-2">Explore the map and add gems.</p>
                  </div>
                ) : (
                  <>
                    {/* Scenic Toggle */}
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                       <div className="flex items-center gap-2 text-sm text-white">
                          <Train size={16} className={scenicMode ? 'text-saffron' : 'text-gray-400'} />
                          <span>Scenic Path Engine</span>
                       </div>
                       <button 
                         onClick={() => setScenicMode(!scenicMode)}
                         className={`w-12 h-6 rounded-full p-1 transition-colors ${scenicMode ? 'bg-saffron' : 'bg-gray-600'}`}
                       >
                          <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${scenicMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                       </button>
                    </div>

                    {scenicMode && (
                       <div className="space-y-3 animate-fade-in">
                          <h3 className="text-xs text-saffron uppercase font-bold tracking-widest mt-2">Recommended Scenic Routes</h3>
                          {SCENIC_ROUTES.map(route => (
                             <div 
                               key={route.id} 
                               className="bg-black/40 border border-saffron/30 rounded-lg overflow-hidden group hover:border-saffron transition-all cursor-pointer"
                               onMouseEnter={() => onScenicHover(route.image)}
                               onMouseLeave={() => onScenicHover(null)}
                             >
                                <div className="h-24 relative">
                                   <img src={route.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                   <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                                      {route.type === 'train' ? <Train size={10} /> : <MapPin size={10} />}
                                      {route.type}
                                   </div>
                                </div>
                                <div className="p-3">
                                   <div className="flex justify-between items-start">
                                      <h4 className="text-white text-sm font-bold">{route.name}</h4>
                                      <span className="text-xs text-saffron font-mono">{route.duration}</span>
                                   </div>
                                   <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{route.description}</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    )}

                    {/* Drag-and-Drop / Itinerary Builder Section */}
                    <div>
                        <div className="flex justify-between items-end mb-4">
                           <h3 className="text-saffron text-xs font-bold uppercase tracking-widest">Smart Itinerary</h3>
                           <button 
                             onClick={syncToCalendar}
                             className={`text-xs flex items-center gap-1 transition-colors ${calendarSynced ? 'text-green-400' : 'text-gray-400 hover:text-white'}`}
                           >
                              {calendarSynced ? <CheckCircle size={12} /> : <Calendar size={12} />}
                              {calendarSynced ? 'Synced!' : 'Sync Calendar'}
                           </button>
                        </div>
                        
                        <div className="space-y-6">
                           {[0, 1, 2, 3].map(day => {
                              const dayItems = itemsByDay[day] || [];
                              if (day !== 0 && !generatedPlan && dayItems.length === 0) return null; // Only show Day buckets if generated or populated

                              return (
                                 <div key={day} className={`rounded-lg ${day === 0 ? '' : 'bg-white/5 border border-white/10 p-3'}`}>
                                    {day !== 0 && (
                                       <h4 className="text-white font-serif text-sm mb-3 flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-full bg-indigo-900 text-indigo-200 flex items-center justify-center text-xs font-bold">{day}</div>
                                          Day {day}
                                       </h4>
                                    )}
                                    {day === 0 && dayItems.length > 0 && (
                                       <h4 className="text-gray-500 text-xs uppercase font-bold mb-2">Unscheduled Gems</h4>
                                    )}

                                    <div className="space-y-2">
                                       {dayItems.map(item => (
                                          <div key={item.id} className="bg-black/40 border border-white/5 p-2 rounded flex gap-3 group hover:border-saffron/30 transition-colors">
                                             <GripVertical className="text-gray-600 cursor-grab" size={16} />
                                             <div className="flex-1">
                                                <h5 className="text-gray-200 text-sm font-medium">{item.title}</h5>
                                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                                   <MapPin size={10} /> {item.location}
                                                </div>
                                             </div>
                                             
                                             {/* Day Assignment Dropdown */}
                                             <div className="flex flex-col gap-1 items-end">
                                                <select 
                                                   className="bg-black text-gray-400 text-[10px] border border-white/10 rounded px-1"
                                                   value={day}
                                                   onChange={(e) => handleDayChange(item.id, parseInt(e.target.value))}
                                                >
                                                   <option value={0}>Unscheduled</option>
                                                   <option value={1}>Day 1</option>
                                                   <option value={2}>Day 2</option>
                                                   <option value={3}>Day 3</option>
                                                </select>
                                                <button onClick={() => onRemove(item.id)} className="text-gray-600 hover:text-red-400">
                                                   <Trash2 size={12} />
                                                </button>
                                             </div>
                                          </div>
                                       ))}
                                       {dayItems.length === 0 && day !== 0 && (
                                          <div className="text-center p-4 border-2 border-dashed border-white/5 rounded text-gray-600 text-xs">
                                             Drag gems here
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                    </div>
                    
                    {!generatedPlan ? (
                        <button 
                          onClick={generatePlan}
                          disabled={isGenerating}
                          className="w-full py-4 mt-4 bg-gradient-to-r from-saffron to-orange-600 text-black font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                        >
                          {isGenerating ? (
                              <>
                                <Sparkles className="animate-spin" size={18} /> Consulting the Stars...
                              </>
                          ) : (
                              <>
                                <Calendar size={18} /> Organize My Trip
                              </>
                          )}
                        </button>
                    ) : (
                        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-lg p-4 animate-fade-in mt-4">
                          <div className="flex items-center gap-2 text-indigo-300 mb-2">
                              <Sparkles size={16} />
                              <span className="text-xs font-bold uppercase">AI Yatra Guide</span>
                          </div>
                          <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                              {generatedPlan}
                          </p>
                          <button 
                            onClick={() => { setGeneratedPlan(null); setItemDays({}); }}
                            className="mt-4 text-xs text-indigo-400 hover:text-white underline"
                          >
                              Regenerate
                          </button>
                        </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* --- BUDGET TAB (POCKET GUIDE) --- */}
            {activeTab === 'budget' && (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                     <h3 className="flex items-center gap-2 text-white font-serif text-lg mb-4">
                        <Wallet className="text-green-400" size={20} /> Budget Estimator
                     </h3>
                     
                     <div className="grid grid-cols-3 gap-2 mb-6">
                        {BUDGET_TIERS.map((tier) => (
                           <button
                             key={tier.type}
                             onClick={() => setTravelStyle(tier.type)}
                             className={`p-2 rounded text-center text-[10px] uppercase font-bold transition-colors border ${travelStyle === tier.type ? 'bg-saffron text-black border-saffron' : 'bg-black/20 text-gray-400 border-white/10 hover:border-white/30'}`}
                           >
                             {tier.type}
                           </button>
                        ))}
                     </div>
                     
                     {selectedBudget && (
                        <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
                           <p className="text-gray-400 text-xs uppercase mb-1">Estimated Daily Cost</p>
                           <p className="text-2xl font-mono text-white mb-2">{selectedBudget.range}</p>
                           <p className="text-xs text-gray-500 italic">{selectedBudget.desc}</p>
                        </div>
                     )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="flex items-center gap-2 text-white font-serif text-lg mb-4">
                        <Clock className="text-blue-400" size={20} /> Time Estimator
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">Example Route: Delhi → Kerala</p>
                      
                      <div className="space-y-3">
                         <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-sm text-white">✈️ Flight</span>
                            <span className="text-sm text-green-400 font-mono">3 Hours</span>
                         </div>
                         <div className="flex items-center justify-between p-2 bg-black/20 rounded border border-saffron/20">
                            <span className="text-sm text-white">🚂 Train (Scenic)</span>
                            <span className="text-sm text-saffron font-mono">48 Hours</span>
                         </div>
                         <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-sm text-white">🚗 Road</span>
                            <span className="text-sm text-orange-400 font-mono">5 Days</span>
                         </div>
                      </div>
                  </div>
               </div>
            )}

            {/* --- DOCS TAB (DIGITAL VAULT) --- */}
            {activeTab === 'docs' && (
               <div className="space-y-6 animate-fade-in">
                  
                  {/* Origin Toggle */}
                  <div className="flex bg-black/40 p-1 rounded-lg">
                     <button 
                        onClick={() => setOriginType('indian')}
                        className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${originType === 'indian' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
                     >
                        Indian Traveler
                     </button>
                     <button 
                        onClick={() => setOriginType('foreign')}
                        className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${originType === 'foreign' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
                     >
                        International
                     </button>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                     <h3 className="flex items-center gap-2 text-white font-serif text-lg mb-4">
                        <FileText className="text-saffron" size={20} /> Essential Docs
                     </h3>
                     <div className="space-y-2">
                        {originType === 'foreign' ? (
                           <>
                              <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                 <CheckCircle size={16} className="text-green-500" />
                                 <span className="text-sm text-gray-300">Passport (6mo validity)</span>
                              </div>
                              <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                 <CheckCircle size={16} className="text-gray-600" />
                                 <span className="text-sm text-gray-300">Indian e-Visa</span>
                              </div>
                              <div className="flex items-center gap-3 p-2">
                                 <CheckCircle size={16} className="text-gray-600" />
                                 <span className="text-sm text-gray-300">Currency Declaration</span>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                 <CheckCircle size={16} className="text-green-500" />
                                 <span className="text-sm text-gray-300">Aadhaar Card / Voter ID</span>
                              </div>
                              <div className="flex items-center gap-3 p-2">
                                 <CheckCircle size={16} className="text-gray-600" />
                                 <span className="text-sm text-gray-300">Driving License</span>
                              </div>
                           </>
                        )}
                     </div>
                  </div>

                  {/* Permit Warning */}
                  {hasRestrictedArea && (
                     <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                        <h3 className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs tracking-widest mb-3">
                           <AlertTriangle size={16} /> Permit Required
                        </h3>
                        <p className="text-sm text-gray-300 mb-3">
                           Your itinerary includes restricted regions (e.g., Ladakh, Sikkim). You need a special Inner Line Permit (ILP).
                        </p>
                        <button className="w-full py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 text-xs uppercase font-bold rounded transition-colors border border-red-500/30">
                           Apply for ILP
                        </button>
                     </div>
                  )}
               </div>
            )}

         </div>

         {/* Footer */}
         <div className="p-4 bg-black/50 border-t border-white/10 text-center">
            <p className="text-[10px] text-gray-500">Items saved locally. 100% Private.</p>
         </div>
      </div>
    </>
  );
};

export default YatraPlanner;