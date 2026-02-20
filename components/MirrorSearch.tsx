import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { ArrowRight, MapPin } from "lucide-react";
import { fetchMirrorData } from "../src/services/csv.service";

interface MirrorLocation {
  worldName: string;
  country: string;
  worldImage: string;
  bharatName: string;
  bharatState: string;
  description: string;
  experience: string;
  bharatImage: string;
  worldPrice: number;
  bharatPrice: number;
  savings: number;
  targetAudience: string;
  mirrorVisitWindow: string;
  tags: string[];
}

const MirrorSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mirrorData, setMirrorData] = useState<MirrorLocation[]>([]);
  const [match, setMatch] = useState<MirrorLocation | null>(null);
  const [loading, setLoading] = useState(true);

  // Load CSV
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
              : [],
          };
        });

        setMirrorData(transformed);
      } catch (error) {
        console.error("CSV Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Search logic
  const performSearch = (term: string) => {
    if (term.length > 2 && mirrorData.length > 0) {
      const found = mirrorData.find((item) =>
        item.worldName.toLowerCase().includes(term.toLowerCase()) ||
        item.bharatName.toLowerCase().includes(term.toLowerCase()) ||
        item.country.toLowerCase().includes(term.toLowerCase()) ||
        item.tags.some((tag) =>
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
    performSearch(term);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <section className="min-h-screen flex flex-col w-full relative overflow-y-auto bg-black text-white">

      {/* SEARCH BAR */}
      <div className="p-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search destination..."
          className="w-full p-3 bg-black/60 border border-white/10 rounded-md outline-none"
        />
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saffron"></div>
        </div>
      ) : match ? (

        <div className="relative flex-1 flex flex-col md:flex-row">

          {/* LEFT PANEL */}
          <div className="w-full md:w-1/2 relative h-1/2 md:h-full overflow-hidden">
            <img
              src={match.worldImage}
              alt={match.worldName}
              className="w-full h-full object-cover grayscale"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute bottom-10 left-10 right-10 z-20">
              <p className="text-xs uppercase text-gray-400 mb-2">
                Illusion • {match.country}
              </p>

              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                {match.worldName}
              </h2>

              <p className="text-gray-400 text-sm">
                Cost: {formatCurrency(match.worldPrice)}
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-1/2 relative h-1/2 md:h-full overflow-hidden">

            {/* SAVE BADGE */}
            <div className="absolute top-6 right-6 z-40 bg-black/85 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Reflection Found
              </p>
              <p className="text-green-400 font-semibold">
                Save ₹{match.savings.toLocaleString("en-IN")}
              </p>
            </div>

            {/* IMAGE */}
            <img
              src={match.bharatImage}
              alt={match.bharatName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x600?text=Image+Unavailable";
              }}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* CONTENT */}
            <div className="absolute bottom-10 left-10 right-10 z-20">

              <div className="flex items-center gap-2 text-saffron mb-2 uppercase text-xs font-bold">
                <MapPin size={14} /> Reality
              </div>

              <h2 className="text-4xl font-serif mb-4">
                {match.bharatName}
              </h2>

              {/* DETAILS */}
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="text-saffron font-semibold">State:</span>{" "}
                  {match.bharatState}
                </p>

                <p>
                  <span className="text-saffron font-semibold">Price:</span>{" "}
                  {formatCurrency(match.bharatPrice)}
                </p>

                <p>
                  <span className="text-saffron font-semibold">Best Time:</span>{" "}
                  {match.mirrorVisitWindow}
                </p>
              </div>

              <p className="text-gray-300 text-sm mt-6 italic border-l-2 border-saffron pl-4">
                "{match.description}"
              </p>

              {/* CTA */}
              <div className="mt-6 flex justify-between items-end border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs text-gray-400">Real Cost</p>
                  <p className="text-2xl text-green-400 font-bold">
                    {formatCurrency(match.bharatPrice)}
                  </p>
                </div>

                <button className="px-6 py-2 bg-saffron text-black font-bold rounded-md flex items-center gap-2">
                  Plan Yatra <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </div>
        </div>

      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No match found
        </div>
      )}
    </section>
  );
};

export default MirrorSearch;
