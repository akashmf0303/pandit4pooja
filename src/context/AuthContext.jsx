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

  const fetchProfile = async (userId) => {
    if (!userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('[AUTH] Error fetching profile:', error);
      }
      
      if (data) {
        setProfile(data);
        return data;
      }
    } catch (error) {
      console.error('[AUTH] Exception fetching profile:', error);
    }
    return null;
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const failsafe = setTimeout(() => {
        if (mounted && loading) {
          console.error('[AUTH] 🔴 FAILSAFE TRIGGERED: Auth initialization exceeded 3 seconds.');
          setLoading(false);
        }
      }, 3000);

      try {
        console.log('[AUTH] Starting initialization...');
        
        // FIRST: await supabase.auth.getSession()
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[AUTH] Session fetch error:', error);
          throw error;
        }

        if (mounted) {
          if (!currentSession) {
            setSession(null);
            setUser(null);
            setProfile(null);
            console.log('[AUTH] No session found during initialization.');
          } else {
            // STEP 2: Fetch profile FIRST
            console.log('[AUTH] Session exists, fetching profile for:', currentSession.user.id);
            await fetchProfile(currentSession.user.id);

            // STEP 3: Set all auth state at once
            setSession(currentSession);
            setUser(currentSession.user);
            console.log('[AUTH] Full auth state populated successfully.');
          }
        }
      } catch (err) {
        console.error('[AUTH] Critical initialization failure:', err);
        if (mounted) {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      } finally {
        clearTimeout(failsafe);
        if (mounted) {
          // STEP 4: Set loading false
          console.log('[AUTH] Initialization complete. Loading = false');
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // ONE listener only. Store unsubscribe properly.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('[AUTH] Event fired:', event);
        if (!mounted) return;

        // Ignore INITIAL_SESSION as we handle it manually in initializeAuth()
        if (event === 'INITIAL_SESSION') return;

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          // We fetch profile manually in signIn and initializeAuth to avoid deadlocks here.
          setSession(newSession);
          setUser(newSession?.user ?? null);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

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
    if (loading) {
      console.warn('[AUTH] 🔴 BLOCKING REPEATED SIGNUP CALL: Already loading');
      return { data: null, error: new Error('Request already in progress') };
    }
    
    console.log(`[AUTH] 🟢 EXECUTING SIGNUP REQUEST FOR: ${email}`);
    
    try {
      setLoading(true);
      const isSuperAdminEmail = email.toLowerCase() === 'ankushadmin@panditt4pooja.in';
      const isAdminEmail = email.toLowerCase() === 'admin@panditt4pooja.in';
      const role = isSuperAdminEmail ? 'super_admin' : (isAdminEmail ? 'admin' : 'user');

      const { data, error } = await withTimeout(
        supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role
            }
          }
        }),
        20000,
        'Signup API'
      );

      if (error) throw error;
      
      if (data?.user) {
        // Attempt to create profile
        const { error: profileError } = await withTimeout(
          supabase.from('profiles').upsert({
            id: data.user.id,
            email: email,
            full_name: fullName,
            role: role,
            updated_at: new Date().toISOString()
          }),
          10000,
          'Signup Profile Upsert'
        );
        
        if (profileError) {
          console.error("Profile creation error:", profileError);
        }

        // STRICT EMAIL VERIFICATION ENFORCEMENT
        // If Supabase gave us a session but the email is unconfirmed, kill it immediately
        if (!data.user.email_confirmed_at) {
          if (data.session) {
            await supabase.auth.signOut();
          }
          toast.success('Verification email sent. Please check your inbox.');
          return { data, error: null, needsVerification: true };
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

  // Helper to wrap promises in a timeout
  const withTimeout = (promise, ms, name) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(`${name} timed out after ${ms}ms`)), ms))
    ]);
  };

  // Log In
  const signIn = async (email, password) => {
    if (loading) {
      console.warn('[AUTH] 🔴 BLOCKING REPEATED SIGNIN CALL: Already loading');
      return { data: null, profile: null, error: new Error('Request already in progress') };
    }

    console.log(`[AUTH] 🟢 EXECUTING SIGNIN REQUEST FOR: ${email}`);

    try {
      setLoading(true);
      
      const { data, error } = await withTimeout(
        supabase.auth.signInWithPassword({ email, password }),
        20000,
        'Auth API'
      );

      if (error) throw error;

      if (data?.user && !data.user.email_confirmed_at) {
        await supabase.auth.signOut();
        throw new Error('Please verify your email before logging in.');
      }
      
      let fetchedProfile = null;
      if (data?.user) {
        const { data: profileData } = await withTimeout(
          supabase.from('profiles').select('*').eq('id', data.user.id).single(),
          10000,
          'Profile Fetch'
        );
          
        fetchedProfile = profileData;
        
        const isSuperAdminEmail = email.toLowerCase() === 'ankushadmin@panditt4pooja.in';
        const isAdminEmail = email.toLowerCase() === 'admin@panditt4pooja.in';

        if ((isSuperAdminEmail && fetchedProfile?.role !== 'super_admin') || 
            (isAdminEmail && fetchedProfile?.role !== 'admin')) {
           
           const targetRole = isSuperAdminEmail ? 'super_admin' : 'admin';
           const defaultName = isSuperAdminEmail ? 'Super Admin' : 'Admin';
           
           const { data: updatedProfile } = await withTimeout(
             supabase.from('profiles').upsert({
               id: data.user.id,
               email: email.toLowerCase(),
               role: targetRole,
               full_name: fetchedProfile?.full_name || defaultName,
               updated_at: new Date().toISOString()
             }).select().single(),
             10000,
             'Profile Upsert'
           );
           
           if (updatedProfile) fetchedProfile = updatedProfile;
        }
        
        setProfile(fetchedProfile);
        setUser(data.user);
        setSession(data.session);
      }

      toast.success('Successfully logged in.');
      return { data, profile: fetchedProfile, error: null };
    } catch (error) {
      toast.error(error.message || 'Invalid credentials.');
      return { data: null, profile: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Log Out
  const signOut = async () => {
    if (loading) {
      console.warn('[AUTH] 🔴 BLOCKING SIGNOUT CALL: Already loading');
      return;
    }
    
    console.log('[AUTH] 🟢 EXECUTING SIGNOUT REQUEST');

    try {
      // 1. Force local state to clear immediately
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // 2. Tell Supabase to sign out natively (handles storage automatically)
      await supabase.auth.signOut();
      toast.success('Logged out successfully.');
    } catch (error) {
      // Ignore API errors, because local state is already dead.
      console.warn('Backend signout error:', error);
      toast.success('Logged out successfully.');
    }
  };

  // Resend Verification Email
  const resendVerificationEmail = async (email) => {
    if (loading) {
      console.warn('[AUTH] 🔴 BLOCKING RESEND EMAIL CALL: Already loading');
      return { error: new Error('Request already in progress') };
    }

    console.log(`[AUTH] 🟢 EXECUTING RESEND VERIFICATION REQUEST FOR: ${email}`);

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      if (error) throw error;
      toast.success('Verification email resent! Check your inbox.');
      return { error: null };
    } catch (error) {
      toast.error(error.message || 'Error resending verification email.');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Reset Password Request
  const resetPassword = async (email) => {
    if (loading) {
      console.warn('[AUTH] 🔴 BLOCKING RESET PASSWORD CALL: Already loading');
      return { error: new Error('Request already in progress') };
    }
    
    console.log(`[AUTH] 🟢 EXECUTING RESET PASSWORD REQUEST FOR: ${email}`);

    try {
      setLoading(true);
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
    isAdmin: profile?.role === 'admin' || profile?.role === 'super_admin',
    isSuperAdmin: profile?.role === 'super_admin',
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithGoogle,
    resendVerificationEmail,
    updateProfile,
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf9f7' }}>
        <Loader2 className="animate-spin" size={48} color="#e06e38" style={{ marginBottom: '16px' }} />
        <p style={{ color: '#666', fontFamily: 'system-ui, sans-serif' }}>Loading secure session...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
