import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMirrorData } from "../services/csv.service";

export default function MirrorPage() {
  const { slug } = useParams();
  const [mirror, setMirror] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMirrorData();

      const found = data.find(
        (item: any) => item.slug === slug
      );

      setMirror(found || null);
    };

    load();
  }, [slug]);

  if (!mirror) {
    return (
      <div className="text-white text-center pt-40">
        Mirror not found
      </div>
    );
  }

  return (
    <div className="relative z-20 text-white">

      {/* WORLD DESTINATION */}
      <section className="h-[70vh] relative">
        <img
          src={mirror.destination_image_link}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-serif">
            {mirror.world_destination}
          </h1>
          <p className="text-gray-300">{mirror.country}</p>
        </div>
      </section>

      {/* BHARAT MIRROR */}
      <section className="h-[70vh] relative">
        <img
          src={mirror.image_link}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-10 left-10">
          <h2 className="text-5xl font-serif text-saffron">
            {mirror.bharat_twin}
          </h2>
          <p className="text-gray-300">{mirror.bharat_state}</p>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <p className="text-xl italic text-gray-300">
          {mirror.description}
        </p>
      </section>

    </div>
  );
}
