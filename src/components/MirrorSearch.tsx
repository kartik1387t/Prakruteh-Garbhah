import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Globe, MapPin, Sparkles } from 'lucide-react';
import { fetchMirrorData } from '../services/csv.service';
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
            mirrorVisitWindow: item.mirror_visit_window || "",
            slug: item.slug || "",
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

  useEffect(() => {
    if (externalTerm && mirrorData.length > 0) {
      setSearchTerm(externalTerm);
      performSearch(externalTerm);
    }
  }, [externalTerm, mirrorData]);

  const performSearch = (term: string) => {
    if (term.length > 2) {
      const found = mirrorData.filter(item =>
        item.worldName?.toLowerCase().includes(term.toLowerCase()) ||
        item.bharatName?.toLowerCase().includes(term.toLowerCase()) ||
        item.country?.toLowerCase().includes(term.toLowerCase())
      );

      setMatch(found || null);
    } else {
      setMatch(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (setIsSearchActive) setIsSearchActive(term.length > 0);
    performSearch(term);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);

  return (
    <section className="w-full relative pb-20">

      {/* Search Bar */}
      <div className="sticky top-0 z-40 p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="relative max-w-xl mx-auto">
          <div className="flex items-center bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
            <Search className="ml-4 text-saffron" size={18} />
            <input
              type="text"
              placeholder="Search a destination..."
              className="w-full bg-transparent text-white px-4 py-3 focus:outline-none text-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-32 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-saffron mx-auto"></div>
        </div>
      ) : match ? (
        <div className="flex flex-col md:flex-row">

          {/* LEFT — WORLD */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={match.worldImage}
              alt={match.worldName}
              className="w-full h-[60vh] md:h-[80vh] object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute bottom-10 left-10 right-10 z-20">
              <div className="text-gray-400 uppercase text-xs mb-2 flex items-center gap-2">
                <Globe size={14} /> The Illusion
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-white">
                {match.worldName}
              </h2>

              <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">
                {match.country}
              </p>

              <p className="text-xl line-through text-gray-400">
                {formatCurrency(match.worldPrice)}
              </p>
            </div>
          </div>

          {/* RIGHT — BHARAT */}
          <div className="w-full md:w-1/2 relative bg-cosmos">
            <img
              src={match.bharatImage}
              alt={match.bharatName}
              className="w-full h-[60vh] md:h-[80vh] object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="absolute bottom-10 left-10 right-10 z-20">
              <div className="text-saffron uppercase text-xs mb-2 flex items-center gap-2">
                <MapPin size={14} /> The Reality
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-white">
                {match.bharatName}
              </h2>

              <p className="text-sm text-gray-400 uppercase mb-4">
                {match.bharatState}
              </p>

              <div className="text-sm text-gray-300 space-y-2 mb-4">
                <p><span className="text-saffron">Experience:</span> {match.experience}</p>
                <p><span className="text-saffron">Best Time:</span> {match.mirrorVisitWindow}</p>
              </div>

              <p className="italic text-gray-300 mb-6">
                "{match.description}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400">Real Cost</p>
                  <p className="text-3xl text-green-400 font-bold">
                    {formatCurrency(match.bharatPrice)}
                  </p>
                </div>

                <button className="px-6 py-3 bg-saffron text-black font-bold uppercase text-sm rounded-sm flex items-center gap-2">
                  Plan Yatra <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Reflection Badge */}
          <div className="absolute top-32 right-6 z-50 pointer-events-none">
            <div className="bg-black/85 px-4 py-2 rounded-xl shadow-lg text-center">
              <p className="text-xs text-gray-400 uppercase">
                Reflection Found
              </p>
              <p className="text-green-400 font-semibold">
                Save ₹{match.savings.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

        </div>
      ) : (
        <div className="py-32 text-center text-gray-400">
          Search a global destination to find its soul in Bharat.
        </div>
      )}
    </section>
  );
};

export default MirrorSearch;
