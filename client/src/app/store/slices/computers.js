import { createSlice } from "@reduxjs/toolkit";
import computersService from "../../services/computers.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const computersSlice = createSlice({
    name: "computers",
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

const { reducer: computersReducer, actions } = computersSlice;
const { requested, requestFailed, received } = actions;

export const loadComputers = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await computersService.fetchAll();
        dispatch(received(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getAllComputers = () => (state) => state.computers.entities;
export const getComputersLoading = () => (state) => state.computers.isLoading;

export default computersReducer;
