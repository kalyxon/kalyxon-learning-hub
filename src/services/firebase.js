import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc 
} from 'firebase/firestore';

// ============== CONFIGURATION ==============

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

const isFirebaseConfigured = () => {
  const configured = firebaseConfig.apiKey && 
    !firebaseConfig.apiKey.includes("YOUR_") &&
    firebaseConfig.projectId &&
    !firebaseConfig.projectId.includes("YOUR_");
  
  if (!configured) {
    console.warn('⚠️ Firebase not configured. Create .env.local with Firebase credentials.');
  } else {
    console.log('✅ Firebase configured');
  }
  return configured;
};

const FIREBASE_READY = isFirebaseConfigured();

let app, auth, db;

if (FIREBASE_READY) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    setPersistence(auth, browserLocalPersistence).catch(err => console.warn('Persistence error:', err));
  } catch (error) {
    console.error('❌ Firebase init error:', error);
  }
}

// ============== ERROR MESSAGES ==============

const getAuthErrorMessage = (code) => {
  const messages = {
    'auth/email-already-in-use': 'Email already registered',
    'auth/weak-password': 'Password should be 6+ characters',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/account-exists-with-different-credential': 'Account exists with different provider'
  };
  return messages[code] || 'Authentication error. Please try again.';
};

// ============== FALLBACK STORAGE ==============

const fallbackStorage = {
  async getProgress(userId) {
    try {
      const data = localStorage.getItem(`user_progress_${userId}`);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  async saveProgress(userId, tutorialId, data) {
    try {
      const progress = await this.getProgress(userId);
      progress[tutorialId] = data;
      localStorage.setItem(`user_progress_${userId}`, JSON.stringify(progress));
      console.log('💾 Saved to localStorage:', { tutorialId, ...data });
    } catch (error) {
      console.error('localStorage error:', error);
      throw error;
    }
  }
};

// ============== AUTH SERVICE ==============

export const authService = {
  async signUp(email, password, displayName) {
    if (!FIREBASE_READY) {
      const mockUser = {
        uid: `user_${Date.now()}`,
        email,
        displayName: displayName || email.split('@')[0]
      };
      localStorage.setItem('demo_user', JSON.stringify(mockUser));
      await new Promise(r => setTimeout(r, 300));
      return mockUser;
    }

    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: displayName || email.split('@')[0] });

      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          displayName: displayName || email.split('@')[0],
          createdAt: new Date().toISOString(),
          progress: {}
        });
      } catch {
        // Non-critical
      }

      return userCredential.user;
    } catch (error) {
      throw { code: error.code, message: getAuthErrorMessage(error.code) };
    }
  },

  async signIn(email, password) {
    if (!FIREBASE_READY) {
      const mockUser = {
        uid: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0]
      };
      localStorage.setItem('demo_user', JSON.stringify(mockUser));
      await new Promise(r => setTimeout(r, 300));
      return mockUser;
    }

    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      try {
        await updateDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: new Date().toISOString()
        });
      } catch {
        // Non-critical
      }

      return userCredential.user;
    } catch (error) {
      throw { code: error.code, message: getAuthErrorMessage(error.code) };
    }
  },

  async signOut() {
    if (!FIREBASE_READY) {
      localStorage.removeItem('demo_user');
      return;
    }

    try {
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
    } catch (error) {
      throw { code: error.code, message: 'Sign out failed' };
    }
  },

  async resetPassword(email) {
    if (!FIREBASE_READY) {
      alert('Password reset unavailable in demo mode');
      return;
    }

    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw { code: error.code, message: getAuthErrorMessage(error.code) };
    }
  },

  getCurrentUser() {
    if (!FIREBASE_READY) {
      const demoUser = localStorage.getItem('demo_user');
      return demoUser ? JSON.parse(demoUser) : null;
    }
    return auth?.currentUser || null;
  },

  onAuthStateChanged(callback) {
    if (!FIREBASE_READY) {
      const demoUser = localStorage.getItem('demo_user');
      setTimeout(() => callback(demoUser ? JSON.parse(demoUser) : null), 100);
      return () => {};
    }
    return firebaseOnAuthStateChanged(auth, callback);
  }
};

// ============== FIRESTORE SERVICE ==============

export const firestoreService = {
  async getUserProfile(userId) {
    if (!FIREBASE_READY) {
      return { userId, displayName: 'User' };
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },

  async getUserProgress(userId) {
    if (!FIREBASE_READY) {
      return fallbackStorage.getProgress(userId);
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      const progress = userDoc.exists() ? (userDoc.data()?.progress || {}) : {};
      return progress;
    } catch (error) {
      console.error('Error getting progress:', error);
      return fallbackStorage.getProgress(userId);
    }
  },

  async completeTutorial(userId, tutorialId, timeSpent) {
    const data = {
      completed: true,
      completedAt: new Date().toISOString(),
      timeSpent: timeSpent || 0
    };

    if (!FIREBASE_READY) {
      return fallbackStorage.saveProgress(userId, tutorialId, data);
    }

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        [`progress.${tutorialId}`]: data
      });
      console.log('✅ Saved to Firestore:', { tutorialId, completed: true });
    } catch (error) {
      console.error('Firestore error:', error);
      return fallbackStorage.saveProgress(userId, tutorialId, data);
    }
  },

  async updateProgress(userId, tutorialId, progressData) {
    if (!FIREBASE_READY) {
      const progress = await fallbackStorage.getProgress(userId);
      progress[tutorialId] = { ...progress[tutorialId], ...progressData };
      localStorage.setItem(`user_progress_${userId}`, JSON.stringify(progress));
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        [`progress.${tutorialId}`]: { ...progressData, lastUpdated: new Date().toISOString() }
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  },

  async updateTotalTimeSpent(userId, totalMinutes) {
    if (!FIREBASE_READY) return;

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { totalTimeSpent: totalMinutes });
    } catch (error) {
      console.error('Error updating time:', error);
    }
  }
};
