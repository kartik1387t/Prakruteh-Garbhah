import React, { useRef, useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import { storageService } from "../src/services/storageService";
import { supabase } from "../src/lib/supabaseClient";

const ProfileAvatar: React.FC = () => {
  const { userProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showOption, setShowOption] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!userProfile) return null;

  // 🟢 Long Press Handler
  const startPress = () => {
    const timer = setTimeout(() => {
      setShowOption(true);
    }, 3000); // 3 seconds
    setPressTimer(timer);
  };

  const cancelPress = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

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

      setShowOption(false);
      window.location.reload(); // temporary, we’ll improve later

    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">

      {/* Avatar */}
      <img
        src={
          userProfile.profile_image_url ||
          `https://ui-avatars.com/api/?name=${userProfile.name}`
        }
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover border border-saffron/50"
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
      />

      {/* Long Press Option */}
      {showOption && (
        <div className="text-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-saffron mt-2"
          >
            {uploading ? "Uploading..." : "Change Photo"}
          </button>

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleUpload}
          />
        </div>
      )}

    </div>
  );
};

export default ProfileAvatar;
