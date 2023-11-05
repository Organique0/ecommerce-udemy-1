"use client";
import { Provider } from "react-redux";
import { setCurrentUser } from "../store/user/user.action";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../store/store"
import { setCategories } from "@/store/categories/category.action";

export type UserWithToken = User & {
  accessToken: string | null;
};

function AuthListener() {
  const dispatch = useDispatch();


  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocumentsContext();
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();

    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;
  }, []);

  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor} loading={null}>
        <AuthListener />
        {children}
      </PersistGate>
    </Provider>
  );
}
