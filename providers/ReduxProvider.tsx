"use client";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store"
import { setCurrentUser } from "../store/user/user.action";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "@/utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
//thunk
//import { fetchCategoriesAsync } from "@/store/categories/category.action";
//saga
import { fetchCategoriesStart } from "@/store/categories/category.action";

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore FIXME
    //this is so that we get loading states since it loads the categories on all pages
    //this is not exactly where it optimally should be but ok.

    //thunk
    //dispatch(fetchCategoriesAsync());

    //saga
    dispatch(fetchCategoriesStart());

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
      <PersistGate persistor={persistor} loading={null}>
        <AuthListener />
        {children}
      </PersistGate>
    </Provider>
  );
}
