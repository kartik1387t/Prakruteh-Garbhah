import React, { useState } from "react";
import { useAuth } from "../src/context/AuthContext";

const OnboardingModal: React.FC = () => {
  const { completeOnboarding } = useAuth();
  const [name, setName] = useState("");
  const [vibe, setVibe] = useState("Nature");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await completeOnboarding(name, vibe);
    } catch (err) {
      alert("Error completing onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center">
      <div className="bg-cosmos p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl mb-6 text-white">Complete Your Yatra</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-white/10 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="w-full p-3 rounded bg-white/10 text-white"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
          >
            <option>Nature</option>
            <option>Beach</option>
            <option>Wild</option>
            <option>Spiritual</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-saffron text-black p-3 rounded"
          >
            {loading ? "Saving..." : "Start Journey"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingModal;
