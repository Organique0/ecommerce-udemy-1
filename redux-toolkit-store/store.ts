import { Middleware, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";


const middlewares: Middleware<{}, any, any>[] = [];
if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
}

//default middleware for toolkit is Thunk
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //be default it uses a middleware that raises an error when you pass a non-serializable value as payload
        //in this case this is the user data from firebase
        //serializableCheck: false,
    }).concat(middlewares),
})