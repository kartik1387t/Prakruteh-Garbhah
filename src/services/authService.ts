import { supabase } from '../lib/supabaseClient';
import { USE_BACKEND_API, API_BASE_URL } from './config';
import { UserProfile } from '../types';

export const sendMagicLink = async (email: string) => {
  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin
    }
  });
};

export const signOutUser = async () => {
  return await supabase.auth.signOut();
};
const handleMint = async () => {
  const { error } = await sendMagicLink(email);

  if (error) {
    alert(error.message);
  } else {
    alert("Check your email to complete your Yatra.");
  }
};

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
      
      if (error) throw error;
      
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
