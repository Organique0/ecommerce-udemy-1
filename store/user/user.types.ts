import { User } from "firebase/auth";

export interface UserContextValue {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}
export interface UserState {
    currentUser: User | null;
}
interface SetCurrentUserAction {
    type: typeof USER_ACTION_TYPES.SET_CURRENT_USER;
    payload: User | null;
}
export type UserAction = SetCurrentUserAction;


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

export const INITIAL_STATE: UserState = {
    currentUser: null,
};
