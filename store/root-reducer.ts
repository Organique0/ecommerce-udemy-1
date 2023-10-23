import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories-redux-example/category.reducer";


export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
})

export type RootState = ReturnType<typeof rootReducer>;