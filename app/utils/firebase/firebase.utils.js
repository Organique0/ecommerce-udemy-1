import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
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

//opens the google login popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// redirects to google auth page
//export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const githubProvider = new GithubAuthProvider();
export const signInWithGithubPopup = () =>
  signInWithPopup(auth, githubProvider);

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
