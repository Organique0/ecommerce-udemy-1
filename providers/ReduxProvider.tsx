"use client";
import { Provider } from "react-redux";
import { store } from "../store/store"
import { setCurrentUser } from "../store/user/user.action";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "@/utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User) => {
      if (user) createUserDocumentFromAuth(user);
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;
  }, []);

  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <AuthListener />
      {children}
    </Provider>
  );
}
