import React, { useRef, useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import { storageService } from "../src/services/storageService";
import { supabase } from "../src/lib/supabaseClient";

const ProfileAvatar: React.FC = () => {
  const { userProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || !userProfile) return;

      setUploading(true);

      const file = e.target.files[0];

      const publicUrl = await storageService.uploadProfileImage(
        userProfile.id,
        file
      );

      await supabase
        .from("users_profile")
        .update({ profile_image_url: publicUrl })
        .eq("id", userProfile.id);

      window.location.reload(); // simple refresh for now

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!userProfile || !userProfile.id) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={
          userProfile.profile_image_url ||
          "https://ui-avatars.com/api/?name=" + userProfile.name
        }
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover border border-white/20"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-sm text-saffron"
      >
        {uploading ? "Uploading..." : "Change Photo"}
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={handleUpload}
      />
    </div>
  );
};

export default ProfileAvatar;
