import React, { useState } from 'react';
import { X, Scroll, Brain, Gamepad2, ChevronRight, Play, BookOpen } from 'lucide-react';
import { KnowledgeItem, GameItem } from '../types';

interface GyaanDrawerProps {
  districtName: string;
  knowledge?: KnowledgeItem[];
  games?: GameItem[];
  onClose: () => void;
}

const GyaanDrawer: React.FC<GyaanDrawerProps> = ({ districtName, knowledge = [], games = [], onClose }) => {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'games'>('knowledge');

  return (
    <div className="absolute inset-y-0 right-0 w-full md:w-[480px] bg-[#1a150e] border-l border-[#8B4513]/50 shadow-2xl z-[70] flex flex-col animate-slide-in-right overflow-hidden">
       {/* Parchment Texture Overlay */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] opacity-10 pointer-events-none"></div>

       {/* Header */}
       <div className="p-6 bg-[#2a1d12] border-b border-[#8B4513]/30 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-[#8B4513]/20 rounded-lg border border-[#8B4513]/50 text-amber-500">
                <Scroll size={24} />
             </div>
             <div>
                <h2 className="font-serif text-2xl text-amber-100">Gyaan</h2>
                <p className="text-xs text-amber-500 uppercase tracking-widest font-bold">Ancient Wisdom of {districtName}</p>
             </div>
          </div>
          <button onClick={onClose} className="text-amber-700 hover:text-amber-400 transition-colors">
             <X size={24} />
          </button>
       </div>

       {/* Tabs */}
       <div className="flex border-b border-[#8B4513]/30 relative z-10">
          <button 
             onClick={() => setActiveTab('knowledge')}
             className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'knowledge' ? 'bg-[#3e2b1b] text-amber-400 border-b-2 border-amber-500' : 'text-amber-800 hover:text-amber-600'}`}
          >
             Vidya & Shastras
          </button>
          <button 
             onClick={() => setActiveTab('games')}
             className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'games' ? 'bg-[#3e2b1b] text-amber-400 border-b-2 border-amber-500' : 'text-amber-800 hover:text-amber-600'}`}
          >
             Kreeda (Games)
          </button>
       </div>

       {/* Content */}
       <div className="flex-1 overflow-y-auto p-6 relative z-10">
          
          {activeTab === 'knowledge' && (
             <div className="space-y-6">
                {knowledge.length > 0 ? (
                   knowledge.map(k => (
                      <div key={k.id} className="bg-[#2a1d12] border border-[#8B4513]/30 rounded-xl overflow-hidden group hover:border-[#8B4513] transition-colors">
                         <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                               <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${k.type === 'science' ? 'text-blue-300 border-blue-900 bg-blue-900/20' : 'text-purple-300 border-purple-900 bg-purple-900/20'}`}>
                                  {k.type}
                               </span>
                            </div>
                            <h3 className="font-serif text-xl text-amber-200 mb-2 group-hover:text-amber-400 transition-colors">{k.title}</h3>
                            <p className="text-sm text-amber-100/70 italic mb-4">"{k.description}"</p>
                            <div className="bg-[#1a150e] p-4 rounded-lg border border-[#8B4513]/20">
                               <p className="text-sm text-gray-300 leading-relaxed">{k.content}</p>
                            </div>
                            
                            {/* Learn the Art Section */}
                            <button className="mt-4 w-full py-3 border border-amber-500/30 rounded text-amber-500 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-[#1a150e] transition-colors flex items-center justify-center gap-2">
                               <Play size={12} /> Learn {k.title} Basics
                            </button>
                         </div>
                      </div>
                   ))
                ) : (
                   <div className="text-center py-20 opacity-50">
                      <Brain size={48} className="mx-auto mb-4 text-amber-800" />
                      <p className="text-amber-700">Knowledge scrolls are being unearthed...</p>
                   </div>
                )}

                {/* General Vedic Math Teaser if no specific knowledge */}
                {knowledge.length === 0 && (
                   <div className="bg-[#2a1d12] border border-[#8B4513]/30 rounded-xl p-5">
                      <h3 className="font-serif text-lg text-amber-200 mb-2">Vedic Math Challenge</h3>
                      <p className="text-sm text-amber-100/70 mb-4">Can you multiply 98 x 97 in 3 seconds?</p>
                      <button className="text-xs text-amber-400 font-bold uppercase hover:underline">Take the Quiz</button>
                   </div>
                )}
             </div>
          )}

          {activeTab === 'games' && (
             <div className="space-y-4">
                {games.length > 0 ? (
                   games.map(g => (
                      <div key={g.id} className="relative bg-[#2a1d12] p-5 rounded-xl border border-[#8B4513]/30 hover:border-amber-500/50 transition-colors">
                         <div className="flex justify-between items-start">
                            <div>
                               <h3 className="font-serif text-lg text-amber-200">{g.name}</h3>
                               <p className="text-xs text-amber-600 mb-2">Origin: {g.origin}</p>
                            </div>
                            <Gamepad2 className="text-amber-800" />
                         </div>
                         <p className="text-sm text-gray-400 mb-4">{g.description}</p>
                         <button className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-white transition-colors">
                            Play Digital Version <ChevronRight size={14} />
                         </button>
                      </div>
                   ))
                ) : (
                   <div className="text-center py-20 opacity-50">
                      <Gamepad2 size={48} className="mx-auto mb-4 text-amber-800" />
                      <p className="text-amber-700">Game boards are being set up...</p>
                   </div>
                )}
                
                {/* Fallback Game */}
                {games.length === 0 && (
                   <div className="relative bg-[#2a1d12] p-5 rounded-xl border border-[#8B4513]/30">
                         <div className="flex justify-between items-start">
                            <div>
                               <h3 className="font-serif text-lg text-amber-200">Lagori (7 Stones)</h3>
                               <p className="text-xs text-amber-600 mb-2">Origin: Ancient Bharat</p>
                            </div>
                            <Gamepad2 className="text-amber-800" />
                         </div>
                         <p className="text-sm text-gray-400 mb-4">Hit the stack of stones and rebuild it before the opposing team tags you.</p>
                         <button className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-white transition-colors">
                            Play Digital Version <ChevronRight size={14} />
                         </button>
                   </div>
                )}
             </div>
          )}
       </div>
       
       <div className="p-4 bg-[#1a150e] border-t border-[#8B4513]/30 text-center relative z-10">
          <p className="text-[10px] text-amber-800 font-serif italic">"Knowledge increases by sharing."</p>
       </div>
    </div>
  );
};

export default GyaanDrawer;