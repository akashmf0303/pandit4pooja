import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Helper for firestore operations to prevent hanging if DB is offline/disabled
const withTimeout = (promise, timeoutMs = 2500) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs))
  ]);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    if (!userId) return null;
    try {
      const docRef = doc(db, 'profiles', userId);
      const docSnap = await withTimeout(getDoc(docRef), 2500);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
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

    console.log('[AUTH] Starting initialization...');
    
    // Set up failsafe timeout
    const failsafe = setTimeout(() => {
      if (mounted && loading) {
        console.error('[AUTH] 🔴 FAILSAFE TRIGGERED: Auth initialization exceeded 3 seconds.');
        setLoading(false);
      }
    }, 3000);

    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!mounted) return;

        if (!currentUser) {
          setSession(null);
          setUser(null);
          setProfile(null);
          console.log('[AUTH] No user found during state change.');
        } else {
          console.log('[AUTH] User exists, fetching profile for:', currentUser.uid);
          
          let fetchedProf = null;
          try {
            fetchedProf = await fetchProfile(currentUser.uid);
          } catch (fsErr) {
            console.error('[AUTH] Failed to fetch profile from Firestore during auth change:', fsErr);
          }
          
          // If profile does not exist in firestore yet, create a default one
          if (!fetchedProf) {
            const email = currentUser.email || '';
            const isSuperAdminEmail = email.toLowerCase() === 'ankushadmin@panditt4pooja.in';
            const isAdminEmail = email.toLowerCase() === 'admin@panditt4pooja.in';
            const role = isSuperAdminEmail ? 'super_admin' : (isAdminEmail ? 'admin' : 'user');
            
            const defaultProfile = {
              id: currentUser.uid,
              email: email,
              full_name: currentUser.displayName || 'User',
              role: role,
              updated_at: new Date().toISOString()
            };
            
            try {
              await withTimeout(setDoc(doc(db, 'profiles', currentUser.uid), defaultProfile), 2500);
            } catch (fsErr) {
              console.error('[AUTH] Failed to write fallback profile to Firestore:', fsErr);
            }
            setProfile(defaultProfile);
          }
          
          setSession(currentUser);
          setUser(currentUser);
          console.log('[AUTH] Full auth state populated successfully.');
        }
      } catch (err) {
        console.error('[AUTH] Critical state change processing failure:', err);
      } finally {
        clearTimeout(failsafe);
        if (mounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const updateProfile = async (updates) => {
    try {
      const docRef = doc(db, 'profiles', user.uid);
      const updatedData = { ...updates, updated_at: new Date().toISOString() };
      
      await withTimeout(setDoc(docRef, updatedData, { merge: true }), 2500);
      
      // Update local state instantly
      const mergedProfile = { ...profile, ...updatedData };
      setProfile(mergedProfile);
      
      toast.success('Profile updated successfully!');
      return { data: mergedProfile, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
      return { data: null, error };
    }
  };

  // Sign Up
  const signUp = async (email, password, fullName) => {
    console.log(`[AUTH] 🟢 EXECUTING SIGNUP REQUEST FOR: ${email}`);
    
    try {
      const isSuperAdminEmail = email.toLowerCase() === 'ankushadmin@panditt4pooja.in';
      const isAdminEmail = email.toLowerCase() === 'admin@panditt4pooja.in';
      const role = isSuperAdminEmail ? 'super_admin' : (isAdminEmail ? 'admin' : 'user');

      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // 2. Create profile document in Firestore
      const newProfile = {
        id: newUser.uid,
        email: email.toLowerCase(),
        full_name: fullName,
        role: role,
        updated_at: new Date().toISOString()
      };
      
      try {
        await withTimeout(setDoc(doc(db, 'profiles', newUser.uid), newProfile), 2500);
      } catch (fsErr) {
        console.error('[AUTH] Firestore profile write failed during signup:', fsErr);
      }

      // Add admin notification
      try {
        const notifyKey = 'admin_notifications';
        const existingNotify = localStorage.getItem(notifyKey);
        const notifyList = existingNotify ? JSON.parse(existingNotify) : [];
        notifyList.unshift({
          id: 'notify_' + Date.now() + '_' + Math.random().toString().substring(2, 6),
          message: `New user registration: ${fullName} (${email.toLowerCase()}).`,
          type: 'signup',
          read: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        localStorage.setItem(notifyKey, JSON.stringify(notifyList.slice(0, 20)));
      } catch (err) {
        console.warn('Failed to save admin notification:', err);
      }

      // 3. Optional: Send Verification Email
      try {
        await sendEmailVerification(newUser);
      } catch (verErr) {
        console.warn('[AUTH] Verification email sending skipped/failed:', verErr.message);
      }
      
      toast.success('Successfully signed up! Welcome to Panditt4Pooja.');
      return { data: userCredential, error: null, needsVerification: false };
    } catch (error) {
      toast.error(error.message || 'An error occurred during sign up.');
      return { data: null, error };
    }
  };

  // Log In
  const signIn = async (email, password) => {
    console.log(`[AUTH] 🟢 EXECUTING SIGNIN REQUEST FOR: ${email}`);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;
      
      // 2. Fetch profile
      let fetchedProfile = null;
      try {
        const docRef = doc(db, 'profiles', loggedUser.uid);
        const docSnap = await withTimeout(getDoc(docRef), 2500);
        if (docSnap.exists()) {
          fetchedProfile = docSnap.data();
        }
      } catch (fsErr) {
        console.error('[AUTH] Firestore profile fetch failed during login:', fsErr);
      }

      // Auto-heal admin role status if logging in with designated admin emails
      const isSuperAdminEmail = email.toLowerCase() === 'ankushadmin@panditt4pooja.in';
      const isAdminEmail = email.toLowerCase() === 'admin@panditt4pooja.in';
      
      const targetRole = isSuperAdminEmail ? 'super_admin' : (isAdminEmail ? 'admin' : 'user');
      const defaultName = isSuperAdminEmail ? 'Super Admin' : (isAdminEmail ? 'Admin' : 'User');

      if (!fetchedProfile || 
          (isSuperAdminEmail && fetchedProfile?.role !== 'super_admin') || 
          (isAdminEmail && fetchedProfile?.role !== 'admin')) {
         
         const updatedProfile = {
           id: loggedUser.uid,
           email: email.toLowerCase(),
           role: targetRole,
           full_name: fetchedProfile?.full_name || defaultName,
           updated_at: new Date().toISOString()
         };
         
         try {
           await withTimeout(setDoc(doc(db, 'profiles', loggedUser.uid), updatedProfile, { merge: true }), 2500);
         } catch (fsErr) {
           console.error('[AUTH] Fallback profile upsert failed:', fsErr);
         }
         fetchedProfile = updatedProfile;
      }
      
      setProfile(fetchedProfile);
      setUser(loggedUser);
      setSession(loggedUser);

      toast.success('Successfully logged in.');
      return { data: userCredential, profile: fetchedProfile, error: null };
    } catch (error) {
      toast.error(error.message || 'Invalid credentials.');
      return { data: null, profile: null, error };
    }
  };

  // Log Out
  const signOut = async () => {
    console.log('[AUTH] 🟢 EXECUTING SIGNOUT REQUEST');

    try {
      // Force local state to clear immediately
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Log out from Firebase Auth
      await firebaseSignOut(auth);
      toast.success('Logged out successfully.');
    } catch (error) {
      console.warn('Backend signout error:', error);
      toast.success('Logged out successfully.');
    }
  };

  // Resend Verification Email
  const resendVerificationEmail = async (email) => {
    console.log(`[AUTH] 🟢 EXECUTING RESEND VERIFICATION REQUEST FOR: ${email}`);

    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        toast.success('Verification email sent! Check your inbox.');
        return { error: null };
      } else {
        throw new Error("You must be logged in to resend verification email.");
      }
    } catch (error) {
      toast.error(error.message || 'Error resending verification email.');
      return { error };
    }
  };

  // Reset Password Request
  const resetPassword = async (email) => {
    console.log(`[AUTH] 🟢 EXECUTING RESET PASSWORD REQUEST FOR: ${email}`);

    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`,
      });
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
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const googleUser = userCredential.user;
      
      // Fetch or initialize profile in Firestore
      const docRef = doc(db, 'profiles', googleUser.uid);
      
      let userProfile = null;
      try {
        const docSnap = await withTimeout(getDoc(docRef), 2500);
        if (docSnap.exists()) {
          userProfile = docSnap.data();
        }
      } catch (fsErr) {
        console.error('[AUTH] Firestore fetch failed during Google Sign-In:', fsErr);
      }
      
      if (!userProfile) {
        const email = googleUser.email || '';
        const isSuperAdminEmail = email.toLowerCase() === 'ankushadmin@panditt4pooja.in';
        const isAdminEmail = email.toLowerCase() === 'admin@panditt4pooja.in';
        const role = isSuperAdminEmail ? 'super_admin' : (isAdminEmail ? 'admin' : 'user');
        
        userProfile = {
          id: googleUser.uid,
          email: email,
          full_name: googleUser.displayName || 'Google User',
          role: role,
          updated_at: new Date().toISOString()
        };
        try {
          await withTimeout(setDoc(docRef, userProfile), 2500);
        } catch (fsErr) {
          console.error('[AUTH] Firestore profile write failed during Google Sign-In:', fsErr);
        }
      }
      
      setProfile(userProfile);
      setUser(googleUser);
      setSession(googleUser);
      toast.success('Successfully logged in with Google.');
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
