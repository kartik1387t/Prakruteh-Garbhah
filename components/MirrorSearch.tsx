import React, { useState } from 'react';
import { Search, ArrowRight, TrendingDown, MapPin, Globe, Sparkles } from 'lucide-react';
import { MIRROR_DATA } from '../constants';
import { MirrorLocation } from '../types';
import Reveal from './Reveal';

const MirrorSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [match, setMatch] = useState<MirrorLocation | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      const found = MIRROR_DATA.find(item => 
        item.worldName.toLowerCase().includes(term.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
      setMatch(found || null);
    } else {
      setMatch(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(amount);
  };

  return (
    <section className="h-full flex flex-col items-center justify-start py-10 px-4 md:px-0 relative w-full" id="mirror-search">
      <div className="w-full max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">Mirror Search</h2>
            <p className="text-gray-400">Type a destination (e.g., "Switzerland") to reveal its Indian soul.</p>
          </div>
        </Reveal>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 relative z-50">
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-saffron to-indigo rounded-full blur opacity-40 pointer-events-none"></div>

    <div className="relative flex items-center bg-cosmos-light/80 backdrop-blur-xl rounded-full p-2 border border-white/10">
      <input
        type="text"
        placeholder="Where in the world..."
        className="w-full bg-transparent text-white p-3 pl-4 focus:outline-none placeholder-gray-500 font-sans"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  </div>
</div>

        {/* Results - Two Cards Layout */}
        <div className="relative min-h-[500px]">
          {match ? (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
              
              {/* Card 1: The World (Left Side) */}
              <div className="w-full md:w-[380px] group animate-slide-in-left">
                <div className="relative bg-cosmos-light/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-saffron/10 transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="h-64 overflow-hidden relative">
                     <div className="absolute inset-0 bg-gray-900/40 z-10 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
                     <img src={match.worldImage} alt={match.worldName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                     <div className="absolute top-4 left-4 z-20 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                          <Globe size={12} /> The Illusion
                        </span>
                     </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-white mb-2">{match.worldName}</h3>
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                      <span className="text-gray-400 text-sm">Estimated Cost</span>
                      <span className="text-red-300 font-mono">{formatCurrency(match.worldPrice)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {match.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Connection Icon */}
              <div className="hidden md:flex flex-col items-center justify-center z-10 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                  <div className="w-12 h-12 rounded-full bg-saffron/20 border border-saffron flex items-center justify-center mb-2 animate-pulse-slow">
                     <Sparkles className="text-saffron" size={24} />
                  </div>
                  <span className="text-[10px] text-saffron uppercase tracking-[0.2em]">Reflecting</span>
              </div>

              {/* Card 2: Bharat (Right Side) */}
              <div className="w-full md:w-[380px] group animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="relative bg-gradient-to-b from-cosmos-light/80 to-indigo/10 border border-saffron/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,153,51,0.15)] hover:shadow-[0_0_50px_rgba(255,153,51,0.25)] transition-all duration-500 hover:-translate-y-2 h-full">
                   
                   {/* 'Recommended' Badge */}
                   <div className="absolute top-0 right-0 bg-saffron text-cosmos font-bold text-xs px-3 py-1 rounded-bl-xl z-30">
                     Prakruteh Garbha Choice
                   </div>

                  <div className="h-64 overflow-hidden relative">
                     <img src={match.bharatImage} alt={match.bharatName} className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                     <div className="absolute top-4 left-4 z-20 bg-saffron/90 px-3 py-1 rounded-full backdrop-blur-md">
                        <span className="text-xs font-bold text-cosmos uppercase tracking-widest flex items-center gap-1">
                          <MapPin size={12} /> The Reality
                        </span>
                     </div>
                     <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-serif text-3xl text-white leading-tight drop-shadow-lg">{match.bharatName}</h3>
                     </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-300 text-sm mb-6 italic border-l-2 border-saffron pl-3">
                      "{match.description}"
                    </p>
                    
                    <div className="space-y-3 mb-6 bg-white/5 p-4 rounded-lg">
                       <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Your Cost</span>
                          <span className="text-green-400 font-bold font-mono text-lg">{formatCurrency(match.bharatPrice)}</span>
                       </div>
                       <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Total Savings</span>
                          <span className="text-saffron flex items-center gap-1">
                             <TrendingDown size={14} /> {formatCurrency(match.savings)}
                          </span>
                       </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-saffron to-indigo text-white font-display uppercase tracking-widest text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 group-hover:gap-4 rounded-sm">
                       Plan This Yatra <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center opacity-30 mt-20">
               <div className="text-center">
                  <Globe size={64} className="mx-auto text-gray-600 mb-4 animate-float" />
                  <p className="font-serif text-gray-500">The cosmos is waiting for your query...</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MirrorSearch;
