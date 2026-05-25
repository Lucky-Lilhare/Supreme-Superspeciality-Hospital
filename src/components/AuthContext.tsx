import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, OperationType, handleFirestoreError } from '../firebase';

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  signUp: (email: string, name: string, pass: string) => Promise<void>;
  signIn: (email: string, pass: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// Helper function to retry document get requests if momentarily blocked by auth race-conditions in iframe preview
async function getDocWithRetry(docRef: any, retries = 5, delay = 500): Promise<any> {
  try {
    return await getDoc(docRef);
  } catch (error: any) {
    const errorStr = error instanceof Error ? error.message : String(error);
    const isPermissionError = errorStr.toLowerCase().includes('permission') || 
                              errorStr.toLowerCase().includes('insufficient');
    if (isPermissionError && retries > 0) {
      console.warn(`Firestore read permission lag detected. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return getDocWithRetry(docRef, retries - 1, delay * 1.5);
    }
    throw error;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync profile when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log(`[AuthSync] onAuthStateChanged triggered. currentUser.uid: "${currentUser.uid}", email: "${currentUser.email}"`);
        const docRef = doc(db, 'users', currentUser.uid);
        try {
          console.log(`[AuthSync] Fetching profile document from Firestore path: "users/${currentUser.uid}"...`);
          const docSnap = await getDocWithRetry(docRef);
          console.log(`[AuthSync] Profile fetch completed. Document exists: ${docSnap.exists()}`);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            console.log(`[AuthSync] Users profile does not exist. Creating default profile...`);
            // Profile does not exist yet (e.g. if created outside or google account clicked first time)
            const creationTimeText = currentUser.metadata.creationTime;
            const isVeryRecent = creationTimeText 
              ? (Date.now() - new Date(creationTimeText).getTime() < 45000)
              : false;

            const profile = {
              uid: currentUser.uid,
              name: currentUser.displayName || 'Supreme Patient',
              email: currentUser.email || '',
              createdAt: new Date().toISOString(),
            };

            if (!isVeryRecent) {
              console.log(`[AuthSync] Profile not very recent. Attempting to write profile to Firestore:`, profile);
              await setDoc(docRef, profile);
              console.log(`[AuthSync] Written profile successfully.`);
            }
            setUserProfile(profile);
          }
        } catch (error) {
          console.error("[AuthSync] Error fetching user profile from Firestore:", error);
          setUserProfile({
            uid: currentUser.uid,
            name: currentUser.displayName || 'Supreme Patient',
            email: currentUser.email || '',
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        console.log(`[AuthSync] onAuthStateChanged: no currentUser signed in.`);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, name: string, pass: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
      
      const profile = {
        uid: res.user.uid,
        name: name,
        email: email,
        createdAt: new Date().toISOString()
      };
      
      // Save profile to users collection
      try {
        await setDoc(doc(db, 'users', res.user.uid), profile);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${res.user.uid}`);
      }
      
      setUserProfile(profile);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signIn = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const profileRef = doc(db, 'users', res.user.uid);
      try {
        const snap = await getDocWithRetry(profileRef);
        if (!snap.exists()) {
          const profile = {
            uid: res.user.uid,
            name: res.user.displayName || 'Supreme Patient',
            email: res.user.email || '',
            createdAt: new Date().toISOString()
          };
          await setDoc(profileRef, profile);
          setUserProfile(profile);
        }
      } catch (err) {
        console.error("Error creating/checking profile on Google Sign-in:", err);
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signUp, signIn, signInGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
