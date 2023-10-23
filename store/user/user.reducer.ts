import { INITIAL_STATE, USER_ACTION_TYPES, UserAction } from "./user.types";

export const userReducer = (state = INITIAL_STATE, action: UserAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
