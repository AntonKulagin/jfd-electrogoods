import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    typeFilter: ""
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        mainSetTypeFilter: (state, action) => {
            state.typeFilter = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: mainReducer, actions } = mainSlice;
const { mainSetTypeFilter } = actions;

export const setTypeFilterMain = (typeFilter) => (dispatch) => {
    dispatch(mainSetTypeFilter(typeFilter));
};

export const getTypeFilterMain = () => (state) => state.main.typeFilter;

export default mainReducer;
