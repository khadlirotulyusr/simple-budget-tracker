
import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import budgetCategoryReducer from "./reducer/budgetCategoryReducer";
import transactionReducer from "./reducer/transactionReducer";

// const persistConfig = {
//     key: "budget-category-data",
//     storage: AsyncStorage,
// };

// Persist config untuk masing-masing reducer
const budgetPersistConfig = {
    key: "budget-category-data",
    storage: AsyncStorage,
};

const transactionPersistConfig = {
    key: "transaction-data",
    storage: AsyncStorage,
};

// const rootReducer = combineReducers({
//     budgetCategory: budgetCategoryReducer,
//     transaction: transactionReducer,
// });

const rootReducer = combineReducers({
    budgetCategory: persistReducer(budgetPersistConfig, budgetCategoryReducer),
    transaction: persistReducer(transactionPersistConfig, transactionReducer),
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer);
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);

// export default store;
