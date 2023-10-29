"use client";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store"
import { setCurrentUser, checkUserSession } from "../store/user/user.action";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser, getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"

//thunk
import { fetchCategoriesAsync } from "@/store/categories/category.action";

//saga
import { fetchCategoriesStart, setCategories } from "@/store/categories/category.action";

function AuthListener() {
  const dispatch = useDispatch();

  //create category map state
  useEffect(() => {
    //this is so that we get loading states since it loads the categories on all pages
    //this is not exactly where it optimally should be but ok.

    //thunk -- make sure to change the middleware in store.ts to support Thunks
    //@ts-ignore
    //dispatch(fetchCategoriesAsync());

    //saga
    dispatch(fetchCategoriesStart());
    dispatch(checkUserSession());

    //redux
    /*     const getCategoriesMap = async () => {
          const categoriesArray = await getCategoriesAndDocumentsContext();
          dispatch(setCategories(categoriesArray));
        };
        getCategoriesMap(); */



    //old listener for user (redux)
    /*     const unsubscribe = onAuthStateChangedListener((user: User) => {
          if (user) createUserDocumentFromAuth(user);
          dispatch(setCurrentUser(user));
        })
        return unsubscribe; */
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
