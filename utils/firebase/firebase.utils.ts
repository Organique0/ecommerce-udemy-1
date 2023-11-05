import { Category, CategoryItem } from "@/redux-saga-store/categories/category.types";
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
  onAuthStateChanged,
  signInWithRedirect,
  User,
  NextOrObserver
} from "firebase/auth";

import {
  getFirestore,
  collection,
  writeBatch,
  doc,
  setDoc,
  getDoc,
  query,
  getDocs,
  QueryDocumentSnapshot
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

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
}

//seed the database
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

//addCollectionAndDocuments("categories", SHOP_DATA);
//console.log("Added categories");

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce(
    (acc, doc) => {
      const { title, items } = doc.data() as Category;
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {} as Record<string, CategoryItem[]>
  );

  return categoryMap;
};

//Use this with Redux
export const getCategoriesAndDocumentsContext = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Category);
};

// ****************************AUTHENTICATION *************************************

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
  signInWithRedirect(auth, googleProvider);

const githubProvider = new GithubAuthProvider();
export const signInWithGithubPopup = () => {
  return signInWithPopup(auth, githubProvider);
};

export type additionalInfo = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

//only runs if the user does not already exist
export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo = {} as additionalInfo): Promise<void | QueryDocumentSnapshot<UserData>> => {
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

  //return userDocRef;
  //saga:
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithCredential(
    auth,
    EmailAuthProvider.credential(email, password)
  );
};

export const signOutUser = async () => {
  return await signOut(auth);
};

//permanently open listener that runs the callback when the auth state changes
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

//saga
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
