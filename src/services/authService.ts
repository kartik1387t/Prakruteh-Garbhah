import { supabase } from '../lib/supabaseClient';

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
