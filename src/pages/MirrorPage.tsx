import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMirrorData } from "../services/csv.service";
import { fetchVocalData } from "../services/vocal.service";

export default function MirrorPage() {

  const { slug } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [crafts, setCrafts] = useState([]);

  useEffect(() => {

    const load = async () => {
      const data = await fetchMirrorData();

      const match = data.find((item:any) => item.slug === slug);

      setDestination(match);

      const craftData = await fetchVocalData();

const relatedCrafts = craftData.filter(
  c => c.state === destination.bharat_state
);

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

      </div>

    </div>

    <div className="mt-16">

<h2 className="text-2xl font-serif mb-6">
Crafts of {destination.bharat_state}
</h2>

<div className="grid grid-cols-2 md:grid-cols-3 gap-6">

{crafts.map(craft => (

<div
  key={craft.app_no}
  className="bg-black/40 rounded-lg overflow-hidden border border-white/10"
>

<img
  src={craft.image_link}
  className="w-full h-32 object-cover"
/>

<div className="p-3">

<h3 className="text-sm font-semibold">
{craft.item_name}
</h3>

<p className="text-xs text-gray-400">
{craft.category}
</p>

</div>

</div>

))}

</div>

</div>
  );

}
