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

      window.location.reload(); // we improve later
    } catch (err: any) {
  console.error(err);
  alert(err.message || "Upload failed");
    }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative w-28 h-28">

      {/* Avatar */}
      <img
        src={
          userProfile.profile_image_url ||
          `https://ui-avatars.com/api/?name=${userProfile.name}`
        }
        alt="Avatar"
        className="w-28 h-28 rounded-full object-cover border border-saffron/50 cursor-pointer"
        onClick={() => setShowEdit(!showEdit)}
      />

      {/* Edit Button Overlay */}
      {showEdit && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-1 right-1 bg-saffron p-2 rounded-full shadow-lg"
        >
          {uploading ? (
            <span className="text-xs">...</span>
          ) : (
            <Pencil size={14} className="text-black" />
          )}
        </button>
      )}

      {/* Hidden File Input */}
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
