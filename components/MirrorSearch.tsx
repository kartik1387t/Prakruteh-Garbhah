import React, { useState, useEffect } from 'react';
import { fetchMirrorData } from "../src/services/csv.service";
import { Search, ArrowRight, TrendingDown, MapPin, Globe, Sparkles, PiggyBank, Plane, Hotel, Volume2 } from 'lucide-react';
import Reveal from './Reveal';

interface MirrorSearchProps {
  externalTerm?: string;
}

const MirrorSearch: React.FC<MirrorSearchProps> = ({ externalTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
const [match, setMatch] = useState<MirrorLocation | null>(null);
const [mirrorData, setMirrorData] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
  const delay = setTimeout(() => {
    performSearch(searchTerm);
  }, 300);

  return () => clearTimeout(delay);
}, [searchTerm]);

  useEffect(() => {
  const loadData = async () => {
    try {
      const rawData = await fetchMirrorData();

      const transformed = rawData.map((item: any) => {
        const worldPrice = Number(item["World Price"]) || 0;
        const bharatPrice = Number(item["Bharat Price"]) || 0;

        return {
          worldName: item["World Destination"] || "",
          bharatName: item["Bharat Destination"] || "",
          worldPrice,
          bharatPrice,
          savings: worldPrice - bharatPrice,
          description: item["Description"] || "",
          experience: item["Experience"] || "",
          mirrorVisitWindow: item["Mirror Visit Window"] || "",
          worldImage: item["World Image"] || "",
          bharatImage: item["Bharat Image"] || "",
          tags: item["Tags"]
            ? item["Tags"].split(",").map((t: string) => t.trim())
            : []
        };
      });

      setMirrorData(transformed);
    } catch (error) {
      console.error("Mirror CSV Error:", error);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);
 
  useEffect(() => {
    if (externalTerm) {
      setSearchTerm(externalTerm);
      performSearch(externalTerm);
    }
  }, [externalTerm]);

  const performSearch = (term: string) => {
  if (term.length > 2 && mirrorData.length > 0) {
    const found = mirrorData.find(item =>
      item.worldName.toLowerCase().includes(term.toLowerCase()) ||
      item.bharatName.toLowerCase().includes(term.toLowerCase()) ||
      item.tags.some(tag =>
        tag.toLowerCase().includes(term.toLowerCase())
      )
    );

    setMatch(found || null);
  } else {
    setMatch(null);
  }
};

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(amount);
  };

  return (
    <section className="h-full flex flex-col w-full relative overflow-hidden" id="mirror-search">
      
      {/* Search Input (Floating Top) */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6 flex justify-center bg-gradient-to-b from-black/80 to-transparent">
        <div className="relative group w-full max-w-xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-saffron to-indigo rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative flex items-center bg-cosmos-light/90 backdrop-blur-xl rounded-full p-2 border border-white/10">
            <Search className="text-gray-400 ml-4" size={20} />
            <input 
              type="text" 
              placeholder="Where in the world... (e.g. Venice, Alps)" 
              className="w-full bg-transparent text-white p-3 pl-4 focus:outline-none placeholder-gray-500 font-sans"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {match ? (
        <div className="flex-1 flex flex-col md:flex-row h-full">
          
          {/* Left Panel: Global (Desaturated) */}
          <div className="w-full md:w-1/2 relative h-1/2 md:h-full overflow-hidden grayscale hover:grayscale-[50%] transition-all duration-1000 group">
             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
             <img src={match.worldImage} alt={match.worldName} className="w-full h-full object-cover transition-transform duration-[20s] scale-110 group-hover:scale-100" />
             
             <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex items-center gap-2 text-gray-300 mb-2 uppercase tracking-widest text-xs font-bold">
                   <Globe size={14} /> The Illusion
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">{match.worldName}</h2>
                <div className="text-xl text-gray-300 font-mono line-through opacity-70">
                   {formatCurrency(match.worldPrice)}
                </div>
             </div>
          </div>

          {/* Vertical Divider / Connection */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-black/80 backdrop-blur-md border border-saffron flex items-center justify-center shadow-[0_0_40px_rgba(255,153,51,0.6)] animate-pulse-slow">
                <Sparkles className="text-saffron" size={28} />
             </div>
             <div className="mt-4 bg-black/80 px-4 py-2 rounded-full border border-white/20 text-center backdrop-blur-md">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Reflection Found</p>
                <p className="text-sm text-green-400 font-bold">Save {formatCurrency(match.savings)}</p>
             </div>
          </div>

          {/* Right Panel: Bharat (True Color) */}
          <div className="w-full md:w-1/2 relative h-1/2 md:h-full overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
             <img src={match.bharatImage} alt={match.bharatName} className="w-full h-full object-cover animate-pan-slow" />
             
             {/* Atmosphere Tint Overlay */}
             <div className="absolute inset-0 bg-saffron/10 mix-blend-overlay pointer-events-none"></div>

             <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex items-center gap-2 text-saffron mb-2 uppercase tracking-widest text-xs font-bold">
                   <MapPin size={14} /> The Reality
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">{match.bharatName}</h2>
                <p className="text-gray-300 text-sm mb-6 italic border-l-2 border-saffron pl-4 max-w-md">
                   "{match.description}"
                </p>
                <div className="mb-4 text-xs text-gray-400 space-y-1">
  {match.experience && (
    <p><span className="text-saffron font-bold">Experience:</span> {match.experience}</p>
  )}
  {match.mirrorVisitWindow && (
    <p><span className="text-saffron font-bold">Best Time:</span> {match.mirrorVisitWindow}</p>
  )}
</div>
               
               <div className="flex items-end justify-between border-t border-white/10 pt-6">
                   <div>
                      <span className="text-gray-400 text-xs uppercase">Real Cost</span>
                      <div className="text-3xl text-green-400 font-mono font-bold">
                         {formatCurrency(match.bharatPrice)}
                      </div>
                   </div>
                   <button className="px-8 py-3 bg-saffron hover:bg-orange-600 text-black font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2 shadow-lg shadow-saffron/20">
                      Plan Yatra <ArrowRight size={16} />
                   </button>
                </div>
             </div>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
           <Globe size={64} className="text-gray-700 mb-6 animate-float" />
           <h3 className="text-2xl font-serif text-gray-500 mb-2">The Cosmos Awaits</h3>
           <p className="text-gray-600 text-sm">Search a global destination to find its soul in Bharat.</p>
        </div>
      )}
      {loading && <p className="text-white">Loading Mirror Data...</p>}

{!loading && mirrorData.length === 0 && (
  <p className="text-red-400">No data loaded</p>
)}
    </section>
  );
};

export default MirrorSearch;
