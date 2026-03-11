import { useEffect, useState } from "react";
import { fetchVocalData } from "../services/vocal.service";
import { useNavigate } from "react-router-dom";

export default function VocalForLocal() {

  const [items, setItems] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const load = async () => {
      const data = await fetchVocalData();
      setItems(data.slice(0, 50));
    };

    load();

  }, []);

  return (

    <div className="min-h-screen text-white px-6 py-16">

      <h1 className="text-4xl font-serif mb-12 text-center">
        Vocal For Local
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {items.map((item) => (

          <div
            key={item.app_no}
            onClick={() => setSelectedProduct(item)}
            className="cursor-pointer group bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-saffron transition-all"
          >

            <div className="h-48 overflow-hidden">

              <img
                src={item.image_link}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />

            </div>

            <div className="p-4">

              <h3 className="text-lg font-semibold">
                {item.item_name}
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                {item.state}
              </p>

              <p className="text-xs text-gray-500 mt-2 uppercase">
                {item.category}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
{selectedProduct && (
  <KarigarStoryModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}
