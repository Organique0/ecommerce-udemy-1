import { INITIAL_STATE, USER_ACTION_TYPES } from "./user.types";
import { AnyAction } from "redux";
import { signInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess } from "./user.action";


export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;


  /*   const { type, payload } = action;
    switch (type) {
      case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
        return {
          ...state,
          currentUser: payload,
        };
      case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
        return {
          ...state,
          currentUser: null,
        }
      case USER_ACTION_TYPES.SIGN_UP_FAILED:
      case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      case USER_ACTION_TYPES.SIGN_IN_FAILED:
        return {
          ...state,
          error: payload
        }
      default:
        return state;
    }; */
}
