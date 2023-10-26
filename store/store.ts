import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

//demystifying middleware 
const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());

    next(action);

    console.log("next state", store.getState());
}

/* const middlewares = [process.env.NODE_ENV !== "production" && logger]
    .filter(Boolean); */ //"remove everything that has falsyiness"

//this does not raise type warnings unlike the one above
const middlewares: Middleware<{}, any, any>[] = [];
if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
}

//this allows us to use the Redux Chrome extension in development
const composeEnhancer = (
    process.env.NODE_ENV !== "production" &&
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

//this solves some error
const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();


const persistConfig = {
    key: "root",
    storage,
    blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
