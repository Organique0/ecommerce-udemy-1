import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
//thunk
import thunk from "redux-thunk";
//saga
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "./root-saga";


//demystifying middleware
//logger
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

//saga
const sagaMiddleware = createSagaMiddleware();

//thunk
//const middlewares: Middleware<{}, any, any>[] = [thunk];

const middlewares: Middleware<{}, any, any>[] = [];
//logger
//this does not raise type warnings unlike the one above
if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
}

//Chrome extension
const composeEnhancer = (
    process.env.NODE_ENV !== "production" &&
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

//2 different types of storage because depending on the rendering
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
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

//saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
