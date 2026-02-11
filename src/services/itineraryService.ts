import { supabase } from '../lib/supabaseClient';
import { USE_BACKEND_API, API_BASE_URL } from './config';
import { YatraItem } from '../types';

export const itineraryService = {
  async getUserItinerary(userId: string): Promise<YatraItem[]> {
    if (USE_BACKEND_API) {
      const res = await fetch(`${API_BASE_URL}/itineraries/${userId}`);
      return res.json();
    } else {
      const { data, error } = await supabase
        .from('itineraries')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      return data.map((item: any) => ({
        id: item.item_id, // Mapping back to constant ID for frontend logic
        dbId: item.id, // Keep tracking of DB primary key
        title: item.title,
        category: item.category,
        location: item.location,
        day: item.day_number
      }));
    }
  },

  async addItem(userId: string, item: YatraItem) {
    if (USE_BACKEND_API) {
      // call API
    } else {
      const { error } = await supabase
        .from('itineraries')
        .insert([{
          user_id: userId,
          item_id: item.id,
          title: item.title,
          category: item.category,
          location: item.location,
          day_number: 0
        }]);
      if (error) throw error;
    }
  },

  async removeItem(userId: string, itemId: string) {
    if (!USE_BACKEND_API) {
      const { error } = await supabase
        .from('itineraries')
        .delete()
        .eq('user_id', userId)
        .eq('item_id', itemId);
      if (error) throw error;
    }
  }
};
