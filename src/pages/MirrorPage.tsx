import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate import
import { useEffect, useState } from "react";
import { fetchMirrorData } from "../services/csv.service";
import { fetchVocalData } from "../services/vocal.service";
import { fetchSEOKeywords } from "../services/seo.service";
import KarigarStoryModal from "../components/KarigarStoryModal";

export default function MirrorPage() {
  const { slug } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [destination, setDestination] = useState<any>(null);
  const [crafts, setCrafts] = useState<any[]>([]);
  const [selectedCraft, setSelectedCraft] = useState<any>(null);
  const [relatedMirrors, setRelatedMirrors] = useState<any[]>([]);
  const [relatedKeywords, setRelatedKeywords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMirrorData();
        
        // Robust matching logic for slugs like "switzerland-vs-gulmarg"
        const match = data.find((item: any) => {
          const csvSlug = String(item.slug || "").toLowerCase().trim();
          const urlSlug = String(slug || "").toLowerCase().trim();
          return csvSlug === urlSlug;
        });

        if (!match) {
          setLoading(false);
          return;
        }

        setDestination(match);

        // Fetch Vocal for Local (GI Tag) Data
        const craftData = await fetchVocalData();
        let relatedCrafts = craftData.filter(
          (c: any) => c.mirror_link?.toLowerCase().trim() === slug?.toLowerCase().trim()
        );

        if (relatedCrafts.length === 0) {
          relatedCrafts = craftData.filter(
            (c: any) => c.state?.toLowerCase().trim() === match.bharat_state?.toLowerCase().trim()
          );
        }
        setCrafts(relatedCrafts.slice(0, 6));

        // Fetch Related Reflections based on experience
        const related = data.filter(
          (item: any) =>
            item.experience?.toLowerCase() === match.experience?.toLowerCase() &&
            item.slug !== match.slug
        );
        setRelatedMirrors(related.slice(0, 4));
      } catch (error) {
        console.error("Error loading Mirror Page:", error);
      } finally {
        setLoading(false);
      }

      // Fetch SEO Keyword Data
      const seoData = await fetchSEOKeywords();

const related = seoData.filter(
  (k:any) => k.related_mirror === slug
);

setRelatedKeywords(related.slice(0,6));
    };

    load();
  }, [slug]);

  // Loading State - ensures user sees something other than a black screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saffron mb-4"></div>
        <p className="font-serif italic text-saffron">Traveling through the Cosmos...</p>
      </div>
    );
  }

  // Error/Not Found State
  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
        <h2 className="text-2xl font-serif mb-4">Destination Not Found</h2>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-saffron text-black font-bold uppercase">
          Return to Universe
        </button>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* HERO SECTION */}
      <div className="relative h-[80vh]">
        <img
          src={destination.image_link || destination.destination_image_link}
          className="absolute inset-0 w-full h-full object-cover"
          alt={destination.bharat_twin}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-20 left-10 z-20">
          <h1 className="text-5xl font-serif">{destination.bharat_twin}</h1>
          <p className="text-gray-300">{destination.bharat_state}</p>
        </div>
      </div>

      {/* INFORMATION SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
        <p className="text-xl text-gray-300 italic">"{destination.description}"</p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl mb-2 text-saffron font-serif">The Experience</h2>
            <p className="text-gray-300">{destination.experience}</p>
          </div>
          <div>
            <h2 className="text-2xl mb-2 text-saffron font-serif">Divine Timing</h2>
            <p className="text-gray-300">{destination.mirror_visit_window}</p>
          </div>
        </div>

        {/* CRAFTS (GI TAGS) SECTION */}
        <div className="pt-10">
          <h2 className="text-3xl font-serif mb-8 text-center">Crafts of {destination.bharat_state}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {crafts.map((craft: any) => (
              <div
                key={craft.app_no}
                onClick={() => setSelectedCraft(craft)}
                className="bg-black/40 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-saffron transition"
              >
                <img src={craft.image_link} className="w-full h-32 object-cover" alt={craft.item_name} />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white">{craft.item_name}</h3>
                  <p className="text-xs text-gray-400">{craft.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPLORE MORE (Fixed Mapping) */}
        <div className="pt-20">
          <h2 className="text-3xl font-serif text-center mb-10">Explore More Reflections</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedMirrors.map((mirror: any) => (
              <div
                key={mirror.slug}
                onClick={() => navigate(`/mirror/${mirror.slug}`)}
                className="cursor-pointer bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-saffron transition"
              >
                <img 
                  src={mirror.image_link || mirror.destination_image_link} 
                  className="w-full h-40 object-cover" 
                  alt={mirror.bharat_twin}
                />
                <div className="p-4">
                  <h3 className="text-lg font-serif">{mirror.bharat_twin}</h3>
                  <p className="text-sm text-gray-400">{mirror.bharat_state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPLORE MORE KEYWORDS (Mapping) */}
        <div className="mt-20 text-center">

<h2 className="text-3xl font-serif mb-6">
People Also Searched
</h2>

<div className="flex flex-wrap justify-center gap-3">

{relatedKeywords.map((k:any)=>(
<button
key={k.keyword}
onClick={()=>navigate(`/mirror/${k.related_mirror}`)}
className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm hover:border-saffron transition"
>

{k.keyword}

</button>
))}

</div>

</div>
      </div>

      {selectedCraft && (
        <KarigarStoryModal
          product={{
            name: selectedCraft.item_name,
            story: selectedCraft.cultural_note,
            image: selectedCraft.image_link,
            district: selectedCraft.district,
            type: selectedCraft.category,
            makerName: "Local Artisan",
            makerVerified: true
          }}
          onClose={() => setSelectedCraft(null)}
        />
      )}
    </div>
  );
}
