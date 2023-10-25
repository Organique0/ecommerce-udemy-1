import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories-redux-example/category.reducer";
import { cartReducer } from "./cart/cart.reducer";


export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>;