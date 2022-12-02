import { createSlice } from "@reduxjs/toolkit";
import cartService from "../../services/cart.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartRequested: (state) => {
            state.isLoading = true;
        },
        cartRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        cartReceived: (state, action) => {
            console.log("cart action", action);

            state.entities = action.payload;
            state.isLoading = false;
        },
        cartAddReceived: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        cartRemoved: (state, action) => {
            state.entities = state.entities.filter((c) => c._id !== action.payload);
            state.isLoading = false;
        },
    },
});

const { reducer: cartReducer, actions } = cartSlice;
const { cartRequested, cartRequestFailed, cartReceived, cartAddReceived, cartRemoved } = actions;

export const loadCartList = () => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.fetchAll();

        console.log("content", content);

        dispatch(cartReceived(content));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const addProduct = (productId) => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.add(productId);
        dispatch(cartAddReceived(content));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const removeProduct = (productId) => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.delete(productId);
        if (content === null) {
            dispatch(cartRemoved(productId));
        }
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const getCart = () => (state) => state.cart.entities;
// export const getCartLoading = () => (state) => state.cart.isLoading;

export default cartReducer;
