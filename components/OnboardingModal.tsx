import React, { useState } from "react";
import { useAuth } from "../src/context/AuthContext";

const OnboardingModal: React.FC = () => {
  const { completeOnboarding } = useAuth();
  const [name, setName] = useState("");
  const [vibe, setVibe] = useState("Nature");
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  setUploadedImage(e.target.files[0]);
};

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
<div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center">
  <div className="bg-cosmos border border-white/20 rounded-2xl w-full max-w-md shadow-2xl p-8">

    <h2 className="font-serif text-3xl text-white mb-6 text-center">
      Begin Your Yatra
    </h2>

    {/* Avatar Preview */}
    <div className="flex flex-col items-center mb-6">
      <img
        src={
          session?.user?.user_metadata?.avatar_url ||
          "https://ui-avatars.com/api/?name=" + name
        }
        className="w-24 h-24 rounded-full object-cover border border-saffron/50"
      />
      <label className="text-saffron text-sm mt-2 cursor-pointer">
        Upload Custom Image
        <input
          type="file"
          hidden
          onChange={handleImageUpload}
        />
      </label>
    </div>

    {/* Name Input */}
    <input
      type="text"
      placeholder="Your Sacred Name"
      required
      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white mb-4"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    {/* Vibe Selection */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      {["Nature", "Beach", "Wild", "Spiritual"].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setVibe(option)}
          className={`p-3 rounded-lg border ${
            vibe === option
              ? "bg-saffron text-black border-saffron"
              : "bg-white/5 text-gray-400 border-white/10"
          }`}
        >
          {option}
        </button>
      ))}
    </div>

    <button
      onClick={handleSubmit}
      className="w-full py-4 bg-gradient-to-r from-saffron to-orange-600 text-black font-bold rounded-lg"
    >
      Enter the Cosmos
    </button>

  </div>
</div>
  );
};

export default OnboardingModal;
