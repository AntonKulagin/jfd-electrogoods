import { createSlice } from "@reduxjs/toolkit";
import productsService from "../../services/products.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null
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
        productUpdated(state, action) {
            state.entities = [
                ...state.entities.filter(
                    (prod) => prod._id !== action.payload._id
                ),
                action.payload
            ];
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { requested, requestFailed, received, productUpdated } = actions;

export const loadProductsList = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await productsService.fetchAll();
        dispatch(received(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const updateProduct = (data) => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await productsService.update(data);
        dispatch(productUpdated(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getAllProducts = () => (state) => state.products.entities;
export const getProductById = (id) => (state) =>
    state.products.entities.find((prod) => prod._id === id);
export const getProductsLoading = () => (state) => state.products.isLoading;

export const getProductsList = (cart) => (state) => {
    if (state.products.entities) {
        const productsArray = [];
        for (const itemCart of cart) {
            for (const prod of state.products.entities) {
                if (prod._id === itemCart.productId) {
                    productsArray.push({ ...prod, cartId: itemCart._id });
                    break;
                }
            }
        }
        return productsArray;
    }
    return [];
};

export default productsReducer;
