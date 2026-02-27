import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { authService } from '../services/authService';
import { UserProfile } from '../types';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  sendMagicLink: typeof authService.sendMagicLink;
  signOut: typeof authService.signOut;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
const fetchOrCreateProfile = async (user: any) => {
  try {
    setLoading(true);

    // 1️⃣ Try to fetch profile
    const { data: existingProfile, error } = await supabase
      .from("users_profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingProfile) {
      setUserProfile(existingProfile);
      return;
    }

    // 2️⃣ First time user → create profile
    const tempName = localStorage.getItem("temp_name");
    const tempVibe = localStorage.getItem("temp_vibe");

    const newProfileData = {
      id: user.id,
      email: user.email,
      name: tempName || user.email?.split("@")[0] || "Yatri",
      traveler_vibe: tempVibe || "Nature",
      profile_image_url: user.user_metadata?.avatar_url || null,
    };

    const { data: newProfile, error: insertError } = await supabase
      .from("users_profile")
      .insert(newProfileData)
      .select()
      .single();

    if (insertError) throw insertError;

    setUserProfile(newProfile);

    // Clean temp storage
    localStorage.removeItem("temp_name");
    localStorage.removeItem("temp_vibe");

  } catch (err) {
    console.error("Profile Error:", err);
  } finally {
    setLoading(false);
  }
};
  
  useEffect(() => {
  // 1️⃣ Check existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);

    if (session?.user) {
      fetchOrCreateProfile(session.user);
    } else {
      setLoading(false);
    }
  });

  // 2️⃣ Listen for auth changes
  const { data: { subscription } } =
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session?.user) {
        fetchOrCreateProfile(session.user);
      } else {
        setUserProfile(null);
      }
    });

  return () => subscription.unsubscribe();
}, []);

  return (
<AuthContext.Provider value={{ 
  session, 
  userProfile, 
  loading, 
  sendMagicLink: authService.sendMagicLink,
  signOut: authService.signOut
}}>
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
