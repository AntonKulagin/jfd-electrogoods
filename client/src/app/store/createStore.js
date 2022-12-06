import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cartReducer from "./slices/cart";
import mainReducer from "./slices/main";
import productsReducer from "./slices/products";

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    main: mainReducer
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
