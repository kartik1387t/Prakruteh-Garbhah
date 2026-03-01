import React, { useRef, useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import { storageService } from "../src/services/storageService";
import { supabase } from "../src/lib/supabaseClient";
import { Pencil } from "lucide-react";

const ProfileAvatar: React.FC = () => {
  const { userProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!userProfile) return null;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;

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

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative w-10 h-10 sm:w-24 sm:h-24">
      <img
        src={
          userProfile.profile_image_url ||
          `https://ui-avatars.com/api/?name=${userProfile.name}`
        }
        alt="Avatar"
        className="w-10 h-10 sm:w-24 sm:h-24 rounded-full object-cover border border-saffron/50 cursor-pointer"
        onClick={() => setShowEdit(!showEdit)}
      />

      {showEdit && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-saffron p-1 rounded-full shadow-lg"
        >
          {uploading ? (
            <span className="text-xs">...</span>
          ) : (
            <Pencil size={12} className="text-black" />
          )}
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleUpload}
      />
    </div>
  );
};

export default ProfileAvatar;
