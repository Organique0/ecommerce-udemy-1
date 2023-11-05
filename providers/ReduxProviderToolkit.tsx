"use client";
import { Provider } from "react-redux";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrentUser as setCurrentUserToolkit } from "@/redux-toolkit-store/user/user.reducer";
import { setCategories as setCategoriesTookit } from "@/redux-toolkit-store/categories/category.reducer";
import { store as toolkitStore } from "@/redux-toolkit-store/store";

export type UserWithToken = User & {
  accessToken: string | null;
};

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocumentsContext();
      dispatch(setCategoriesTookit(categoriesArray));
    };
    getCategoriesMap();

    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      //be default it uses a middleware that raises an error when you pass a non-serializable value as payload
      //in this case this is the user data from firebase
      //this is all broken now since i changed the function to be saga specific
      //@ts-ignore
      const pickedUser = user && (({ accessToken, email }) => ({ accessToken, email }))(user);
      dispatch(setCurrentUserToolkit(pickedUser));
    })
    return unsubscribe;
  }, []);

  return null;
}

export default function ReduxProviderTookit({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={toolkitStore}>
      <AuthListener />
      {children}
    </Provider>
  );
}
