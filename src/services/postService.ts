import { supabase } from '../lib/supabaseClient';
import { USE_BACKEND_API, API_BASE_URL } from './config';
import { ExperiencePost } from '../types';

export const postService = {
  async getPostsByDistrict(districtId: string): Promise<ExperiencePost[]> {
    if (USE_BACKEND_API) {
      const res = await fetch(`${API_BASE_URL}/posts/${districtId}`);
      return res.json();
    } else {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          users_profile (full_name)
        `)
        .eq('district_id', districtId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform to frontend type
      return data.map((post: any) => ({
        id: post.id,
        userId: post.user_id,
        userName: post.users_profile?.full_name || 'Anonymous',
        userBadge: 'Desi Explorer', // Logic to determine badge can be added
        type: post.type,
        content: post.content,
        districtId: post.district_id,
        locationName: post.location_name,
        timestamp: new Date(post.created_at).toLocaleDateString(),
        helpfulCount: post.helpful_count,
        tags: post.tags
      }));
    }
  },

  async createPost(post: Omit<ExperiencePost, 'id' | 'timestamp' | 'helpfulCount' | 'userName' | 'userBadge'>) {
    if (USE_BACKEND_API) {
      return fetch(`${API_BASE_URL}/posts`, { method: 'POST', body: JSON.stringify(post) });
    } else {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([{
          user_id: post.userId,
          district_id: post.districtId,
          location_name: post.locationName,
          type: post.type,
          content: post.content,
          tags: post.tags
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
};
