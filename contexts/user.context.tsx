"use client"
import { createContext, useState } from "react";
import { User } from "firebase/auth";

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

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
