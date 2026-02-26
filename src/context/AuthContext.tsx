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
const fetchProfile = async (userId: string, email?: string) => {
  try {
    const { data } = await supabase
      .from("users_profile")
      .select("*")
      .eq("id", userId)
      .single();

    if (!data) {
      const storedName = localStorage.getItem("temp_name");
      const storedVibe = localStorage.getItem("temp_vibe");

      const { data: newProfile } = await supabase
        .from("users_profile")
        .insert({
          id: userId,
          name: storedName || email?.split("@")[0],
          traveler_vibe: storedVibe || "Nature",
          email: email,
          profile_image_url: null
        })
        .select()
        .single();

      setUserProfile(newProfile);

      localStorage.removeItem("temp_name");
      localStorage.removeItem("temp_vibe");

    } else {
      setUserProfile(data);
    }

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  
  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id, session.user.email);
      else setLoading(false);
    });

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id, session.user.email);
      else {
        setUserProfile(null);
        setLoading(false);
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
