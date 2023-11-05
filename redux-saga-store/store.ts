import { compose, legacy_createStore as createStore, applyMiddleware, Middleware, Dispatch, AnyAction } from "redux";
import logger from "redux-logger";
import { RootState, rootReducer } from "./root-reducer";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "./root-saga";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
}

const composeEnhancer = (
    process.env.NODE_ENV !== "production" &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;


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

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
}

const persistConfig: ExtendedPersistConfig = {
    key: "root",
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
