import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cartReducer from "./slices/cart";
import productsReducer from "./slices/products";

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
