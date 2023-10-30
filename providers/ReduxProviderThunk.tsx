"use client";
import { Provider } from "react-redux";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/redux-thunk-store/store"
import { fetchCategoriesAsync } from "@/redux-thunk-store/categories/category.action";
import { setCurrentUser } from "@/redux-thunk-store/user/user.action";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "@/utils/firebase/firebase.utils";

export type UserWithToken = User & {
  accessToken: string | null;
};

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchCategoriesAsync());

    const unsubscribe = onAuthStateChangedListener((user: User) => {
      if (user) createUserDocumentFromAuth(user);
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;

  }, []);

  return null;
}

export default function ReduxProviderThunk({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}  >
      <PersistGate persistor={persistor} loading={null}>
        <AuthListener />
        {children}
      </PersistGate>
    </Provider>
  );
}
