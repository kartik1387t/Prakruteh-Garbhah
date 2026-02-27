import { supabase } from "../lib/supabaseClient";

export const authService = {
  async sendMagicLink(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};

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
