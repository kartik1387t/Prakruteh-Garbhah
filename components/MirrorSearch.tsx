import { useEffect, useState } from "react";
import { getBharatMirrorData } from "../data/bharatMirrorService";

const MirrorSearch = () => {
  const [mirrors, setMirrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getBharatMirrorData();
        setMirrors(data);
      } catch (error) {
        console.error("Failed to load Bharat Mirror data", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <p style={{ color: "white" }}>Loading mirror data...</p>;
  }

  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h2>Mirror Search (Live Data)</h2>

      {mirrors.map((item, index) => (
        <div key={index} style={{ marginBottom: "1.5rem" }}>
          <strong>{item.world_destination}</strong>
          <br />
          Bharat Twin: {item.bharat_twin}
          <br />
          World Cost: ₹{item.price_world_inr}
          <br />
          Bharat Cost: ₹{item.price_bharat_inr}
        </div>
      ))}
    </div>
  );
};

export default MirrorSearch;
