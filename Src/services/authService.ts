import { supabase } from '../lib/supabaseClient';
import { USE_BACKEND_API, API_BASE_URL } from './config';
import { UserProfile } from '../types';

export const authService = {
  async signUp(email: string, password: string, fullName: string) {
    if (USE_BACKEND_API) {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({ email, password, fullName }),
      });
      return res.json();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      return data;
    }
  },

  async signIn(email: string, password: string) {
    if (USE_BACKEND_API) {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return res.json();
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    }
  },

  async signOut() {
    if (USE_BACKEND_API) {
      await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
    } else {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (USE_BACKEND_API) {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`);
      return res.json();
    } else {
      const { data, error } = await supabase
        .from('users_profile')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) return null;
      
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
