import { useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const requireSupabaseConfig = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY di .env.local.');
  }
};

const getAuthRedirectUrl = () => import.meta.env.VITE_AUTH_REDIRECT_URL || `${window.location.origin}/login`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    requireSupabaseConfig();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signup = async (email, password, username) => {
    requireSupabaseConfig();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAuthRedirectUrl(),
        data: {
          username,
          full_name: username,
        },
      },
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    requireSupabaseConfig();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email) => {
    requireSupabaseConfig();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getAuthRedirectUrl(),
    });
    if (error) throw error;
  };

  const updatePassword = async (password) => {
    requireSupabaseConfig();
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data;
  };

  const value = { user, loading, login, signup, logout, resetPassword, updatePassword };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
