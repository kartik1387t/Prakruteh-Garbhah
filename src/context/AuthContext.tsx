import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { authService } from '../services/authService';
import { UserProfile } from '../types';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  needsOnboarding: boolean;
  completeOnboarding: (name: string, vibe: string) => Promise<void>;
  sendMagicLink: typeof authService.sendMagicLink;
  signOut: typeof authService.signOut;
  updateProfileImage: (url: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const updateProfileImage = (url: string) => {
  setUserProfile((prev) =>
    prev ? { ...prev, profile_image_url: url } : prev
  );
};
  
const fetchProfile = async (userId: string, email?: string) => {
  try {
    setLoading(true);

    const { data, error } = await supabase
      .from("users_profile")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      // 🔥 First time login
      setNeedsOnboarding(true);
      return;
    }

    setUserProfile(data);
    setNeedsOnboarding(false);

  } catch (err) {
    console.error("Auth error:", err);
  } finally {
    setLoading(false);
  }
};

  const completeOnboarding = async (
  name: string,
  vibe: string,
  imageUrl?: string | null
) => {
  if (!session?.user) return;

  const { data, error } = await supabase
    .from("users_profile")
    .insert({
      id: session.user.id,
      email: session.user.email,
      name,
      traveler_vibe: vibe,
      profile_image_url: imageUrl || null,
})
    .select()
    .single();

  if (error) throw error;

  setUserProfile(data);
  setNeedsOnboarding(false);
};
  
  useEffect(() => {
  // 1️⃣ Check existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);

    if (session?.user) {
      fetchProfile(session.user.id, session.user.email);
    } else {
      setLoading(false);
    }
  });

  // 2️⃣ Listen for auth changes
  const { data: { subscription } } =
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setUserProfile(null);
      }
    });

  return () => subscription.unsubscribe();
}, []);

  return (
  <AuthContext.Provider
    value={{
      session,
      userProfile,
      loading,
      needsOnboarding,
      completeOnboarding,
      sendMagicLink: authService.sendMagicLink,
      signOut: authService.signOut,
      updateProfileImage,
    }}
  >
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
