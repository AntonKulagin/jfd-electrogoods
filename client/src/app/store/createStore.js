import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./slices/products";

const rootReducer = combineReducers({
    products: productsReducer,
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
