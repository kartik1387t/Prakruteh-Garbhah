import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMirrorData } from "../services/csv.service";
import { fetchVocalData } from "../services/vocal.service";
import KarigarStoryModal from "../components/KarigarStoryModal";

export default function MirrorPage() {

  const { slug } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [crafts, setCrafts] = useState<any[]>([]);
  const [selectedCraft, setSelectedCraft] = useState<any>(null);

  useEffect(() => {

  const load = async () => {

    const data = await fetchMirrorData();

    const match = data.find((item:any) => item.slug === slug);

    setDestination(match);

    if (!match) return;

    const craftData = await fetchVocalData();

    let relatedCrafts = craftData.filter(
      (c:any) =>
        c.mirror_link?.toLowerCase().trim() ===
        slug?.toLowerCase().trim()
    );

    if (relatedCrafts.length === 0) {

      relatedCrafts = craftData.filter(
        (c:any) =>
          c.state?.toLowerCase().trim() ===
          match.bharat_state?.toLowerCase().trim()
      );

    }

    setCrafts(relatedCrafts.slice(0,6));

  };

  load();

}, [slug]);

  if (!destination) {
    return (
      <div className="text-white text-center py-40">
        Loading destination...
      </div>
    );
  }

  return (

    <div className="text-white">

      {/* HERO */}
      <div className="relative h-[80vh]">

        <img
          src={destination.image_link}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-20 left-10 z-20">

          <h1 className="text-5xl font-serif">
            {destination.bharat_twin}
          </h1>

          <p className="text-gray-300">
            {destination.bharat_state}
          </p>

        </div>

      </div>

      {/* INFO */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">

        <p className="text-xl text-gray-300">
          {destination.description}
        </p>

        <div>
          <h2 className="text-2xl mb-2 text-saffron">
            Experience
          </h2>

          <p>
            {destination.experience}
          </p>
        </div>

        <div>
          <h2 className="text-2xl mb-2 text-saffron">
            Best Time
          </h2>

          <p>
            {destination.mirror_visit_window}
          </p>
        </div>

        {/* Crafts Section */}
        <div className="mt-20 px-6">

<h2 className="text-3xl font-serif mb-8 text-center">
Crafts of {destination.bharat_state}
</h2>

<div className="grid grid-cols-2 md:grid-cols-3 gap-6">

{crafts.map(craft => (

<div
  key={craft.app_no}
  onClick={() => setSelectedCraft(craft)}
  className="bg-black/40 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-saffron transition"
>

<img
  src={craft.image_link}
  className="w-full h-32 object-cover"
/>

<div className="p-3">

<h3 className="text-sm font-semibold text-white">
{craft.item_name}
</h3>

<p className="text-xs text-gray-400">
{craft.category}
</p>

                </div>

              </div>

            ))}
  
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

      </div>

    </div>
  
  );
  
}
