import createAction from "@/utils/reducer/reducer.utils"
import { User } from "firebase/auth"
import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user: User | null) => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}

//saga
export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
export const emailSignInStart = (email: String, password: String) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
export const githubSignInStart = () => createAction(USER_ACTION_TYPES.GITHUB_SIGN_IN_START);
export const signInSuccess = (user: User | null) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
export const signInFailed = (error: any) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
export const signUpStart = (email: string, password: string, displayName: string) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });
export const signUpSuccess = (user: User, additionalDetails: any) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });
export const signUpFailed = (error: any) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);
export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
export const signOutFailed = (error: any) => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, error);