import { configureStore, combineReducers } from "@reduxjs/toolkit";
import computersReducer from "./slices/computers";

const rootReducer = combineReducers({
    computers: computersReducer,
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
