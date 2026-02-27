import { supabase } from "../lib/supabaseClient";

export const storageService = {
  async uploadProfileImage(userId: string, file: File) {
    const filePath = `${userId}/avatar.png`;

    const { error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};
