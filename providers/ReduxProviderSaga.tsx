"use client";
import { Provider } from "react-redux";
import { checkUserSession } from "@/redux-saga-store/user/user.action";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/redux-saga-store/store"
import { fetchCategoriesStart } from "@/redux-saga-store/categories/category.action";

export type UserWithToken = User & {
  accessToken: string | null;
};

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
    dispatch(checkUserSession());
  }, []);

  return null;
}

export default function ReduxProviderSaga({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthListener />
        {children}
      </PersistGate>
    </Provider>
  );
}


