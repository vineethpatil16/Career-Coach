// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Default context value so TS and destructuring know these methods exist
const AuthContext = createContext({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  signIn: async () => ({ user: null, error: new Error('no user') }),
  signUp: async () => ({ user: null, error: new Error('no user') }),
  signOut: async () => {},
  updateProfile: async () => ({ error: new Error('no user') }),
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    async function initializeAuth() {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (initialSession) {
        setSession(initialSession);
        setUser(initialSession.user);
        await fetchProfile(initialSession.user.id);
      }
      setIsLoading(false);
    }

    initializeAuth();
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { user: data.user, error };
  }

  async function signUp(email, password, name) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      console.log('Supabase.signUp:', data, error);
      if (error) return { user: null, error };
      const newUser = data.user;
      const newSession = data.session;
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: newUser.id, name, email, current_phase: 'introspection' }]);
      if (profileError) {
        console.error('Error creating profile:', profileError);
        return { user: newUser, error: profileError };
      }
      setUser(newUser);
      setSession(newSession);
      setProfile({ id: newUser.id, name, email, age: null, phone: null, bio: null, current_phase: 'introspection' });
      return { user: newUser, error: null };
    } catch (err) {
      console.error('Unexpected signup error:', err);
      return { user: null, error: err };
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.assign('/login');
  }

  async function updateProfile(updates) {
    if (!user) return { error: new Error('No user logged in') };
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    if (!error) setProfile(prev => (prev ? { ...prev, ...updates } : null));
    return { error };
  }

  const value = { user, profile, session, isLoading, signIn, signUp, signOut, updateProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
