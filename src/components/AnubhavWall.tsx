import React, { useState } from 'react';
import { MessageSquare, Shield, Filter, MapPin, UserCheck, Sparkles, X, Send } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import { DistrictProfile, ExperiencePost } from '../types';

interface AnubhavWallProps {
  district: DistrictProfile;
  onClose: () => void;
}

const AnubhavWall: React.FC<AnubhavWallProps> = ({ district, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'do' | 'dont' | 'safety'>('all');
  const [showAskModal, setShowAskModal] = useState(false);

  const posts = district.experiences || [];
  const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.type === filter || (filter === 'safety' && p.type === 'safety'));

  const safety = district.safety || { soloTraveler: 50, family: 50, senior: 50, lastVerified: 'Unknown' };

  const getSafetyColor = (score: number) => {
     if (score >= 80) return 'text-green-400';
     if (score >= 50) return 'text-yellow-400';
     return 'text-red-400';
  };

  return (
    <div className="absolute inset-y-0 right-0 w-full md:w-[500px] bg-[#0F172A] border-l border-white/10 shadow-2xl z-[60] flex flex-col animate-slide-in-right">
       
       {/* Header */}
       <div className="p-6 border-b border-white/10 bg-[#1E293B] relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={20} /></button>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-saffron/10 rounded-lg border border-saffron/30">
                <Sparkles className="text-saffron" size={20} />
             </div>
             <div>
                <h2 className="font-serif text-2xl text-white">Bharat Anubhav</h2>
                <p className="text-xs text-gray-400">Community Wisdom for {district.name}</p>
             </div>
          </div>
       </div>

       {/* Safety Meter (Top Widget) */}
       <div className="p-4 bg-black/20 border-b border-white/10">
          <div className="flex justify-between items-end mb-3">
             <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} className="text-blue-400" /> Community Safety Meter
             </h3>
             <span className="text-[10px] text-gray-500">Verified {safety.lastVerified}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
             <div className="bg-white/5 p-2 rounded text-center border border-white/5">
                <div className={`text-lg font-mono font-bold ${getSafetyColor(safety.soloTraveler)}`}>{safety.soloTraveler}%</div>
                <div className="text-[9px] text-gray-400 uppercase mt-1">Solo</div>
             </div>
             <div className="bg-white/5 p-2 rounded text-center border border-white/5">
                <div className={`text-lg font-mono font-bold ${getSafetyColor(safety.family)}`}>{safety.family}%</div>
                <div className="text-[9px] text-gray-400 uppercase mt-1">Family</div>
             </div>
             <div className="bg-white/5 p-2 rounded text-center border border-white/5">
                <div className={`text-lg font-mono font-bold ${getSafetyColor(safety.senior)}`}>{safety.senior}%</div>
                <div className="text-[9px] text-gray-400 uppercase mt-1">Senior</div>
             </div>
          </div>
       </div>

       {/* Filters */}
       <div className="flex p-2 gap-2 overflow-x-auto no-scrollbar border-b border-white/10 bg-black/10">
          {[
             { id: 'all', label: 'All Stories' },
             { id: 'do', label: '✅ Do\'s' },
             { id: 'dont', label: '❌ Don\'ts' },
             { id: 'safety', label: '🛡️ Safety' }
          ].map(f => (
             <button
               key={f.id}
               onClick={() => setFilter(f.id as any)}
               className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${filter === f.id ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}`}
             >
                {f.label}
             </button>
          ))}
       </div>

       {/* Feed */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          {filteredPosts.length > 0 ? (
             filteredPosts.map(post => (
                <ExperienceCard key={post.id} post={post} />
             ))
          ) : (
             <div className="text-center py-20 opacity-50">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">Be the first to share an experience here.</p>
             </div>
          )}
          
          {/* AI Prompt Mockup */}
          {posts.length > 2 && (
             <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 animate-fade-in my-6">
                <div className="flex items-center gap-2 mb-2">
                   <Sparkles size={14} className="text-indigo-400" />
                   <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">AI Side-Trip Idea</span>
                </div>
                <p className="text-sm text-gray-300 italic">"Since travelers loved {posts[0].locationName}, you might enjoy the hidden stepwell just 10 mins away."</p>
             </div>
          )}
       </div>

       {/* Bottom Actions */}
       <div className="p-4 bg-[#1E293B] border-t border-white/10 flex gap-3">
          <button 
             onClick={() => setShowAskModal(true)}
             className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-widest rounded border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
             <UserCheck size={14} /> Ask a Traveler
          </button>
          <button className="flex-1 py-3 bg-saffron hover:bg-orange-600 text-black font-bold uppercase text-xs tracking-widest rounded transition-colors flex items-center justify-center gap-2">
             <MessageSquare size={14} /> Share Story
          </button>
       </div>

       {/* Ask Modal Simulation */}
       {showAskModal && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
             <div className="bg-cosmos border border-white/20 rounded-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-serif text-white mb-2">Ask a Current Traveler</h3>
                <p className="text-xs text-gray-400 mb-4">Connect with verified Local Legends or travelers currently in {district.name}.</p>
                
                <textarea 
                   placeholder="e.g., Is it safe for solo female travelers at night near the fort?"
                   className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-saffron mb-4 h-24"
                ></textarea>
                
                <div className="flex gap-3">
                   <button onClick={() => setShowAskModal(false)} className="flex-1 py-2 text-gray-400 hover:text-white text-xs uppercase font-bold">Cancel</button>
                   <button onClick={() => setShowAskModal(false)} className="flex-1 py-2 bg-saffron text-black rounded text-xs uppercase font-bold flex items-center justify-center gap-2">
                      <Send size={12} /> Send
                   </button>
                </div>
             </div>
          </div>
       )}

    </div>
  );
};

export default AnubhavWall;