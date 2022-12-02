import { createSlice } from "@reduxjs/toolkit";
import productsService from "../../services/products.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        received(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
    },
});

const { reducer: productsReducer, actions } = productsSlice;
const { requested, requestFailed, received } = actions;

export const loadProductsList = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await productsService.fetchAll();
        dispatch(received(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getAllProducts = () => (state) => state.products.entities;
export const getProductById = (id) => (state) => state.products.entities.find((prod) => prod._id === id);
export const getProductsLoading = () => (state) => state.products.isLoading;

export default productsReducer;
