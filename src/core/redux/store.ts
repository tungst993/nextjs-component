import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { createWrapper } from 'next-redux-wrapper';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducer';
import rootSaga from './saga';

const { ENV } = process.env;
const envName = {
    dev: 'dev',
    qc: 'qc',
    uat: 'uat',
    production: 'production',
};

const createReducer = (injectedReducers = {}) =>
    combineReducers({
        ...injectedReducers,
        ...rootReducer,
    });

const storeConfig = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware({});
    let store;
    // let persistor = persistStore(store)

    const middlewares = [sagaMiddleware];

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga: sagaMiddleware.run,
        }),
    ];
    const isClient = typeof window !== 'undefined';

    if (isClient) {
        const persistConfig = {
            key: 'root',
            storage,
            whitelist: ['authenDomainReducer', 'navDrawerReducer'],
        };

        store = configureStore({
            reducer: persistReducer(persistConfig, rootReducer),
            preloadedState: initialState,
            middleware: () =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                }).concat(middlewares),
            enhancers,
            devTools: ENV !== envName.production,
        });

        store.__PERSISTOR = persistStore(store);
    } else {
        store = configureStore({
            reducer: rootReducer,
            preloadedState: initialState,
            //   middleware: [...getDefaultMiddleware(), ...middlewares],
            middleware: () => getDefaultMiddleware().concat(middlewares),
            enhancers,
            devTools: ENV !== envName.production,
        });
    }

    store['sagaTask'] = sagaMiddleware.run(rootSaga);

    return store;
    // return { store, persistor };
};

export default storeConfig;
export const wrapperStore = createWrapper(storeConfig, { debug: true });
