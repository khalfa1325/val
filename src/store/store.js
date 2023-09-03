
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createUserReducer from '../featchers/UserOspita/userSlice'

const persistConfig = {
    key: "root",
    storage,
}
const rootReducer = combineReducers({

    user: createUserReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({

    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })


});

setupListeners(store.dispatch)


export const persistor = persistStore(store)












