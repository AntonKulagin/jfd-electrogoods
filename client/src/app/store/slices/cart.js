import { createSlice } from "@reduxjs/toolkit";
import cartService from "../../services/cart.service";
// import { nanoid } from "nanoid";

const initialState = {
    entities: [],
    isLoading: true,
    error: null
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
            state.entities = action.payload;
            state.isLoading = false;
        },
        cartAddReceived: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        cartRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
            state.isLoading = false;
        },
        cartAllDeleted: (state) => {
            state.entities = [];
            state.isLoading = false;
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
    cartRequested,
    cartRequestFailed,
    cartReceived,
    cartAddReceived,
    cartRemoved,
    cartAllDeleted
} = actions;

export const loadCartList = (userId) => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.get(userId);
        dispatch(cartReceived(content));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const addProduct = (productId, navigate) => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.add(productId);
        dispatch(cartAddReceived(content));
    } catch (error) {
        const { status } = error?.response;
        if (status === 401) navigate("/login");
        dispatch(cartRequestFailed(error.message));
    }
};

export const removeProduct = (cartId) => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.remove(cartId);
        if (!content) {
            dispatch(cartRemoved(cartId));
        }
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const cartLogOut = () => (dispatch) => {
    dispatch(cartRequested());
    try {
        dispatch(cartAllDeleted());
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const getCart = () => (state) => state.cart.entities;
export const getCartLoading = () => (state) => state.cart.isLoading;

export default cartReducer;
