"use client"
//Here as an example of using React context
import { ContextType, createContext, useEffect, useReducer } from "react";
import { User } from "firebase/auth";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "@/utils/firebase/firebase.utils";
import createAction from "@/utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "@/store/user/user.types";
import { UserContextValue, UserState, UserAction, INITIAL_STATE } from "@/store/user/user.types";


export const UserContext = createContext<UserContextValue>({
    currentUser: null,
    setCurrentUser: () => null,
});

const userReducer = (state: UserState, action: UserAction): UserState => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error("unhandled type: " + type + "in userReducer");
    }
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user: User | null) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

    const value: UserContextValue = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: User) => {
            if (user) createUserDocumentFromAuth(user);
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
