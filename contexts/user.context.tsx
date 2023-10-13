"use client"
import { createContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "@/app/utils/firebase/firebase.utils";


interface UserContextValue {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
    currentUser: null,
    setCurrentUser: () => null,
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
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
