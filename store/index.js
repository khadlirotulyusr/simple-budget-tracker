
import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";
import contactReducer from "./reducer/contactReducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: "contacts-data",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    contacts: contactReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
// });
export const persistor = persistStore(store);

// export default store;
