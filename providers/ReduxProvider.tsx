"use client";
import { Provider } from "react-redux";
import { setCurrentUser, checkUserSession } from "../store/user/user.action";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//redux toolkit
import { setCurrentUser as setCurrentUserToolkit } from "@/redux-toolkit-store/user/user.reducer";
import { setCategories as setCategoriesTookit } from "@/redux-toolkit-store/categories/category.reducer";

//redux, saga, thunk
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../store/store"

//thunk
import { fetchCategoriesAsync } from "@/store/categories/category.action";

//saga
import { fetchCategoriesStart, setCategories } from "@/store/categories/category.action";

//toolkit
import { store as toolkitStore } from "@/redux-toolkit-store/store";

export type UserWithToken = User & {
  accessToken: string | null;
};

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
    //dispatch(fetchCategoriesStart());
    //dispatch(checkUserSession());

    //redux
    /*     const getCategoriesMap = async () => {
          const categoriesArray = await getCategoriesAndDocumentsContext();
          dispatch(setCategories(categoriesArray));
        };
        getCategoriesMap(); */

    //redux toolkit
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocumentsContext();
      dispatch(setCategoriesTookit(categoriesArray));
    };
    getCategoriesMap();

    //redux
    /*     const unsubscribe = onAuthStateChangedListener((user: User) => {
          if (user) createUserDocumentFromAuth(user);
          dispatch(setCurrentUser(user));
        })
        return unsubscribe;
      }, []); */


    //redux toolkit
    const unsubscribe = onAuthStateChangedListener((user: UserWithToken) => {
      if (user) createUserDocumentFromAuth(user);
      //be default it uses a middleware that raises an error when you pass a non-serializable value as payload
      //in this case this is the user data from firebase
      const pickedUser = user && (({ accessToken, email }) => ({ accessToken, email }))(user);
      dispatch(setCurrentUserToolkit(pickedUser));
    })
    return unsubscribe;
  }, []);

  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  //persist gate doesn't work with redux toolkit
  //redux toolkit also has its own store. Choose between store and toolkitStore.
  return (
    <Provider /* store={store} */ store={toolkitStore}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
      <AuthListener />
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
