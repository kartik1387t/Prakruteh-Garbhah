import { supabase } from '../lib/supabaseClient';
import { USE_BACKEND_API, API_BASE_URL } from './config';
import { UserProfile } from '../types';

export const authService = {

  async sendMagicLink(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users_profile')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
};

      // Map DB snake_case to frontend camelCase types
      return {
        name: data.full_name,
        email: data.email,
        vibe: data.vibe || 'nature',
        currency: 'INR', // Default for now
        totalBudget: data.total_budget,
        spent: data.spent,
        level: data.level,
        badges: [] // Fetch form badges table in real implementation
      };
    }
  }
};
