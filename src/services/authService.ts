import { supabase } from '../lib/supabaseClient';

export const authService = {
  async sendMagicLink(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Redirects user back to your site after they click the link
        emailRedirectTo: window.location.origin, 
      },
    });

    if (error) throw error;
    return data;
  },
  // ... (keep other existing methods like signOut and getUserProfile)
};

  // 🔹 Sign Out
  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error.message);
      throw error;
    }
  },

  // 🔹 Get User Profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('users_profile') // Make sure this table name is correct
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Profile fetch error:', error.message);
      return null;
    }

    if (!data) return null;

    // Map DB fields if needed (adjust if your DB uses snake_case)
    const profile: UserProfile = {
      id: data.id,
      name: data.name,
      email: data.email,
      vibe: data.vibe,
      currency: data.currency,
      totalBudget: data.total_budget ?? 0,
      spent: data.spent ?? 0,
      level: data.level ?? 1,
      badges: data.badges ?? [],
    };

    return profile;
  },
};
