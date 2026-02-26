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
const fetchProfile = async (userId: string, email?: string) => {
  try {
    const { data, error } = await supabase
      .from("users_profile")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      // Profile does not exist → create it
      const { data: newProfile, error: insertError } = await supabase
        .from("users_profile")
        .insert({
          id: userId,
          name: email?.split("@")[0] || "Traveler",
          traveler_vibe: "Nature"
        })
        .select()
        .single();

      if (!insertError) {
        setUserProfile(newProfile);
      }
    } else {
      setUserProfile(data);
    }
  } catch (err) {
    console.error("Error loading profile", err);
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
