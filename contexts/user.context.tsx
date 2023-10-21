"use client"
import { createContext, useEffect, useReducer } from "react";
import { User } from "firebase/auth";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "@/utils/firebase/firebase.utils";
import createAction from "@/utils/reducer/reducer.utils";

interface UserContextValue {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}
const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state: any, action: { type: any; payload: any; }) => {
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
