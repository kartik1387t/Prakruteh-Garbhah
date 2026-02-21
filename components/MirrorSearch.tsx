import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Globe, MapPin, Sparkles } from 'lucide-react';
import { fetchMirrorData } from '../src/services/csv.service';
import { MirrorLocation } from '../types';

interface MirrorSearchProps {
  externalTerm?: string;
  setIsSearchActive?: (value: boolean) => void;
}

const MirrorSearch: React.FC<MirrorSearchProps> = ({
  externalTerm = '',
  setIsSearchActive
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [match, setMatch] = useState<MirrorLocation | null>(null);
  const [mirrorData, setMirrorData] = useState<MirrorLocation[]>([]);
  const [loading, setLoading] = useState(true);

  // Load CSV Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await fetchMirrorData();

        const transformed = rawData.map((item: any) => {
          const worldPrice = Number(item.price_world_inr) || 0;
          const bharatPrice = Number(item.price_bharat_inr) || 0;

          return {
            worldName: item.world_destination || "",
            country: item.country || "",
            worldImage: item.destination_image_link || "",
            bharatName: item.bharat_twin || "",
            bharatState: item.bharat_state || "",
            description: item.description || "",
            experience: item.experience || "",
            bharatImage: item.image_link || "",
            worldPrice,
            bharatPrice,
            savings: worldPrice - bharatPrice,
            targetAudience: item.target_audience || "",
            mirrorVisitWindow: item.mirror_visit_window || "",
            tags: item.target_audience
              ? item.target_audience.split(",").map((t: string) => t.trim())
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

  // Sync external search
  useEffect(() => {
    if (externalTerm) {
      setSearchTerm(externalTerm);
      performSearch(externalTerm);
    }
  }, [externalTerm, mirrorData]);

  // Search logic
  const performSearch = (term: string) => {
    if (term.length > 2 && mirrorData.length > 0) {
      const found = mirrorData.find(item =>
        item.worldName?.toLowerCase().includes(term.toLowerCase()) ||
        item.bharatName?.toLowerCase().includes(term.toLowerCase()) ||
        item.country?.toLowerCase().includes(term.toLowerCase()) ||
        item.tags?.some(tag =>
          tag.toLowerCase().includes(term.toLowerCase())
        )
      );

      setMatch(found || null);
    } else {
      setMatch(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (setIsSearchActive) {
      setIsSearchActive(term.length > 0);
    }

    performSearch(term);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3
    }).format(amount);
  };

  return (
    <section className="w-full relative overflow-x-hidden" id="mirror-search">
      
      {/* Search Input */}
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

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saffron"></div>
        </div>
      ) : match ? (
        <div className="relative flex flex-col md:flex-row">

          {/* Left Panel */}
          <div className="w-full md:w-1/2 relative min-h-[60vh] md:min-h-screen overflow-hidden grayscale hover:grayscale-[50%] transition-all duration-1000 group">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={match.worldImage}
              alt={match.worldName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x600?text=Image+Unavailable";
              }}
            />
            <div className="relative p-10 z-20">
              <div className="flex items-center gap-2 text-gray-300 mb-2 uppercase tracking-widest text-xs font-bold">
                <Globe size={14} /> The Illusion
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">{match.worldName}</h2>
              <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
  {match.country}
</p>
              <div className="text-xl text-gray-300 font-mono line-through opacity-70">
                {formatCurrency(match.worldPrice)}
              </div>
            </div>
          </div>

         {/* Reflection Badge */}
<div className="
  absolute 
  top-24 right-4 
  md:top-1/2 md:left-1/2 
  md:-translate-x-1/2 md:-translate-y-1/2
  z-30 
  flex flex-col items-center
  pointer-events-none
">
  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/80 backdrop-blur-md border border-saffron flex items-center justify-center shadow-[0_0_30px_rgba(255,153,51,0.6)]">
    <Sparkles className="text-saffron" size={24} />
  </div>

  <div className="bg-black/85 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg mt-3 text-center max-w-[90vw]">
    <p className="text-xs text-gray-400 uppercase tracking-wider">
      Reflection Found
    </p>
    <p className="text-green-400 font-semibold">
      Save ₹{match.savings.toLocaleString("en-IN")}
    </p>
  </div>
</div> 
          
          {/* Right Panel */}
          <div className="w-full md:w-1/2 relative h-1/2 md:h-full overflow-hidden">
            <img
              src={match.bharatImage}
              alt={match.bharatName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x600?text=Image+Unavailable";
              }}
            />
            <div className="absolute inset-0 bg-black/50 z-10"></div>
<div className="absolute bottom-10 left-10 right-10 z-20">
  
  <div className="flex items-center gap-2 text-saffron mb-2 uppercase tracking-widest text-xs font-bold">
    <MapPin size={14} /> The Reality
  </div>

  <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
    {match.bharatName}
  </h2>

  <p className="text-sm text-gray-400 uppercase tracking-wide mb-4">
    {match.bharatState}
  </p>

  <div className="space-y-2 text-sm text-gray-300 mb-4">
    <p>
      <span className="text-saffron font-semibold">Experience:</span>{" "}
      {match.experience || "Not specified"}
    </p>

    <p>
      <span className="text-saffron font-semibold">Best Time:</span>{" "}
      {match.mirrorVisitWindow || "Not specified"}
    </p>
  </div>

  <p className="text-gray-300 text-sm mb-6 italic border-l-2 border-saffron pl-4 max-w-md">
    "{match.description}"
  </p>

  <div className="flex items-end justify-between border-t border-white/10 pt-6">
    <div>
      <span className="text-gray-400 text-xs uppercase">Real Cost</span>
      <div className="text-3xl text-green-400 font-mono font-bold">
        {formatCurrency(match.bharatPrice)}
      </div>
    </div>

    <button className="px-8 py-3 bg-saffron hover:bg-orange-600 text-black font-bold uppercase tracking-widest rounded-sm flex items-center gap-2">
      Plan Yatra <ArrowRight size={16} />
    </button>
  </div>
</div>
            
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Globe size={64} className="text-gray-700 mb-6 animate-float" />
          <h3 className="text-2xl font-serif text-gray-500 mb-2">The Cosmos Awaits</h3>
          <p className="text-gray-600 text-sm">
            Search a global destination to find its soul in Bharat.
          </p>
        </div>
      )}
    </section>
  );
};

export default MirrorSearch;
