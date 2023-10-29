import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";


export interface UserState {
  currentUser: User | null;
}
export const INITIAL_STATE: UserState = {
  currentUser: null,
};

//this replaces reducers and actions
export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    //toolkit makes it easy to generate new state objects
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    }
  }
})

//this is how we get actions
export const { setCurrentUser } = userSlice.actions;
//and how we get reducers
export const userReducer = userSlice.reducer;








