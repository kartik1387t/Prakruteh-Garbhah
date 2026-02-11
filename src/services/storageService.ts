import { supabase } from '../lib/supabaseClient';

export const storageService = {
  async uploadImage(bucket: 'avatars' | 'posts', file: File, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) throw error;
    return data;
  },

  getPublicUrl(bucket: 'avatars' | 'posts', path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};
