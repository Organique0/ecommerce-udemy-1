"use client"
import { ContextType, createContext, useEffect, useReducer } from "react";
import { User } from "firebase/auth";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "@/utils/firebase/firebase.utils";
import createAction from "@/utils/reducer/reducer.utils";

interface UserContextValue {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}
interface UserState {
    currentUser: User | null;
    // Add other properties in your state if needed.
}
interface SetCurrentUserAction {
    type: typeof USER_ACTION_TYPES.SET_CURRENT_USER;
    payload: User | null;
}
// Create a union type for all possible action types.
type UserAction = SetCurrentUserAction;

export const UserContext = createContext<UserContextValue>({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

const INITIAL_STATE: UserState = {
    currentUser: null,
};

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
