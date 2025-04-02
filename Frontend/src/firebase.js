import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMef9ImfFN6_i_0zsfXL96GzuJQFCkuYs",
    authDomain: "ticker-shorts.firebaseapp.com",
    projectId: "ticker-shorts",
    storageBucket: "ticker-shorts.firebasestorage.app",
    messagingSenderId: "399070981931",
    appId: "1:399070981931:web:3de5e513c6c2e17d2e9f6e",
  clientId: "399070981931-5uoagh08a96t1ndd3qnd14929f4658pr.apps.googleusercontent.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();  // Get Google ID Token
    return token;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export { auth, googleProvider, signInWithGoogle };
