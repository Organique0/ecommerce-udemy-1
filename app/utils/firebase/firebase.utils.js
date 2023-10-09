import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-BEonelC5inPLnODd6B9LLNSjilr2XFk",
  authDomain: "udemy-ecommerce-1.firebaseapp.com",
  projectId: "udemy-ecommerce-1",
  storageBucket: "udemy-ecommerce-1.appspot.com",
  messagingSenderId: "136301782124",
  appId: "1:136301782124:web:c8882b12c0b5f7ff21a449",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
