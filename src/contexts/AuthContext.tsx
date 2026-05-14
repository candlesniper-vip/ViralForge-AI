import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface UserProfile {
  email: string;
  displayName?: string;
  photoURL?: string;
  currentTeamId?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            // Create user profile
            const newProfileData = {
              email: user.email!,
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            await setDoc(userDocRef, newProfileData);
            setProfile(newProfileData as UserProfile);
            
            // Auto create a team
            const teamId = crypto.randomUUID();
            const teamRef = doc(db, 'teams', teamId);
            await setDoc(teamRef, {
              name: "My Team",
              ownerId: user.uid,
              plan: "Starter",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            // Update user to point to team
            await setDoc(userDocRef, { currentTeamId: teamId, updatedAt: serverTimestamp() }, { merge: true });
            
            // Add as team member
            const memberRef = doc(db, `teams/${teamId}/members`, user.uid);
            await setDoc(memberRef, {
              userId: user.uid,
              role: 'owner',
              joinedAt: serverTimestamp()
            });

            setProfile(prev => prev ? { ...prev, currentTeamId: teamId } : null);
          } else {
            setProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error setting up user profile", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
