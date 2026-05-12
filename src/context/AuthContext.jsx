import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get active session on mount
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    // Failsafe: if Supabase hangs, force loading to false after 3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 means no row found, which is fine right after signup
        console.error('Error fetching profile:', error);
      }
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() })
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      toast.success('Profile updated successfully!');
      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
      return { data: null, error };
    }
  };

  // Sign Up
  const signUp = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user' // Default role
          }
        }
      });

      if (error) throw error;
      
      // If email confirmation is off, or user is already confirmed, insert profile
      if (data?.user) {
        // Attempt to create profile (in production, a database trigger is safer)
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: data.user.id,
          email: email,
          full_name: fullName,
          role: 'user',
          updated_at: new Date().toISOString()
        });
        
        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Don't throw here, auth succeeded
        }
      }

      toast.success('Successfully signed up! Welcome to Panditt4Pooja.');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message || 'An error occurred during sign up.');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Log In
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Successfully logged in.');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message || 'Invalid credentials.');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Log Out
  const signOut = async () => {
    try {
      // Force local state to clear immediately for responsive UI
      setUser(null);
      setProfile(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully.');
    } catch (error) {
      toast.error(error.message || 'Error logging out.');
    }
  };

  // Reset Password Request
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      toast.success('Password reset email sent! Check your inbox.');
      return { error: null };
    } catch (error) {
      toast.error(error.message || 'Error sending reset email.');
      return { error };
    }
  };

  // Google Auth
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
    } catch (error) {
      toast.error(error.message || 'Error signing in with Google.');
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithGoogle,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-primary)' }}>
          <Loader2 className="animate-spin" size={48} color="var(--color-accent-primary)" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
