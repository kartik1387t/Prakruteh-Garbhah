import React, { useState } from 'react';
import { Search, ArrowRight, TrendingDown } from 'lucide-react';
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
    <section className="py-20 px-4 md:px-10 bg-cosmos relative" id="mirror-search">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Mirror Search</h2>
            <p className="text-gray-400">Type a world destination (e.g., "Switzerland", "Venice") to find its reflection in Bharat.</p>
          </div>
        </Reveal>

        {/* Search Bar */}
        <Reveal delay={0.2}>
          <div className="max-w-2xl mx-auto mb-16 relative z-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-saffron to-indigo rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-cosmos-light rounded-lg p-2 border border-gray-700">
                <Search className="text-gray-400 ml-3" />
                <input 
                  type="text" 
                  placeholder="Where in the world do you want to go?" 
                  className="w-full bg-transparent text-white p-3 focus:outline-none placeholder-gray-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Results - Split Screen */}
        <Reveal delay={0.4}>
          {match ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 relative">
              {/* The World Side (Desaturated/Faded) */}
              <div className="relative h-[400px] lg:h-[500px] rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-all duration-500"></div>
                <img src={match.worldImage} alt={match.worldName} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-gray-300 font-display tracking-widest text-sm uppercase">The World</p>
                  <h3 className="text-3xl font-serif text-white">{match.worldName}</h3>
                  <p className="text-red-300 mt-2">Est. Cost: {formatCurrency(match.worldPrice)}</p>
                </div>
              </div>

              {/* Transition Icon */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-cosmos border border-saffron p-3 rounded-full hidden lg:block shadow-[0_0_20px_rgba(255,153,51,0.5)]">
                <ArrowRight className="text-saffron" size={24} />
              </div>

              {/* Bharat Side (True Color) */}
              <div className="relative h-[400px] lg:h-[500px] rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none overflow-hidden ring-2 ring-saffron/50 shadow-2xl shadow-saffron/20">
                <img src={match.bharatImage} alt={match.bharatName} className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-saffron font-display tracking-widest text-sm uppercase">The Reflection</p>
                      <h3 className="text-4xl font-serif text-white mb-2">{match.bharatName}</h3>
                      <p className="text-gray-200 text-sm max-w-md italic mb-4">"{match.description}"</p>
                      <p className="text-green-400 font-bold text-xl">Cost: {formatCurrency(match.bharatPrice)}</p>
                    </div>
                  </div>
                  
                  {/* Savings Badge */}
                  <div className="absolute top-[-300px] right-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center animate-float">
                    <p className="text-gray-300 text-xs uppercase">You Save</p>
                    <p className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                      <TrendingDown size={20} className="text-green-400" />
                      {formatCurrency(match.savings)}
                    </p>
                  </div>

                  <div className="mt-6">
                    <button className="bg-saffron text-cosmos font-bold py-3 px-6 rounded hover:bg-white transition-colors w-full md:w-auto">
                      Plan This Yatra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State / Prompt */
            <div className="text-center py-20 opacity-30">
              <div className="w-24 h-24 border-2 border-dashed border-gray-600 rounded-full mx-auto flex items-center justify-center mb-4">
                <Search size={32} className="text-gray-600"/>
              </div>
              <p className="font-serif text-xl">The cosmos is waiting for your query...</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default MirrorSearch;