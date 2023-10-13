import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-BEonelC5inPLnODd6B9LLNSjilr2XFk",
  authDomain: "udemy-ecommerce-1.firebaseapp.com",
  projectId: "udemy-ecommerce-1",
  storageBucket: "udemy-ecommerce-1.appspot.com",
  messagingSenderId: "136301782124",
  appId: "1:136301782124:web:c8882b12c0b5f7ff21a449",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
//opens a popup window to sign in with google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// redirects to google auth page
export const signInWithGoogleRedirect = () =>
  signInWithGoogleRedirect(auth, googleProvider);

const githubProvider = new GithubAuthProvider();
export const signInWithGithubPopup = () => {
  return signInWithPopup(auth, githubProvider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithCredential(
    auth,
    EmailAuthProvider.credential(email, password)
  );
};

export const signOutUser = async () => {
  return await signOut(auth);
};
