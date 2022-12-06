import { createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";
import usersService from "../../services/users.service";
import { cartLogOut } from "./cart";
import { generateAuthError } from "../../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          currentUser: null,
          userId: localStorageService.getUserId(),
          isLoggedIn: true,
          authError: null,
          isLoading: true
      }
    : {
          entities: null,
          currentUser: null,
          userId: null,
          isLoggedIn: false,
          authError: null,
          isLoading: true
      };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authRequested(state) {
            state.isLoading = true;
        },
        authReceivedSuccess(state, action) {
            state.userId = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        authRequestFailed(state, action) {
            state.authError = action.payload;
            state.isLoading = false;
        },

        currentUserRequested(state) {
            state.isLoading = true;
        },
        currentUserReceivedSuccess(state, action) {
            state.currentUser = action.payload;
            state.isLoading = false;
        },
        currentUserRequestFailed(state) {
            state.isLoading = false;
        },

        userLoggedOut(state) {
            state.isLoggedIn = false;
            state.userId = null;
        }
    }
});

const { reducer: authReducer, actions } = authSlice;
const {
    authRequested,
    authReceivedSuccess,
    authRequestFailed,

    currentUserRequested,
    currentUserReceivedSuccess,
    currentUserRequestFailed,

    userLoggedOut
} = actions;

export const loadCurrentUser = () => async (dispatch) => {
    dispatch(currentUserRequested());
    try {
        const { content } = await usersService.getCurrentUser();
        dispatch(currentUserReceivedSuccess(content));
    } catch (error) {
        dispatch(currentUserRequestFailed(error.message));
    }
};

export const signUp = (data, redirect) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const content = await authService.register(data);
        localStorageService.setTokens(content);
        dispatch(authReceivedSuccess(content.userId));
        dispatch(loadCurrentUser());
        redirect("/", { replace: true });
    } catch (error) {
        dispatch(authRequestFailed(errorCatcher(error)));
    }
};

export const signIn = (data, redirect) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const content = await authService.login(data);
        localStorageService.setTokens(content);
        dispatch(authReceivedSuccess(content.userId));
        dispatch(loadCurrentUser());
        redirect("/", { replace: true });
    } catch (error) {
        dispatch(authRequestFailed(errorCatcher(error)));
    }
};

export const logout = (navigate) => (dispatch) => {
    localStorageService.removeUserData();
    dispatch(userLoggedOut());
    dispatch(cartLogOut());
    navigate("/login", { replace: true });
};

const errorCatcher = (error) => {
    let errorMessage;
    const { code, message } = error?.response?.data?.error;
    if (code === 400) {
        errorMessage = generateAuthError(message);
    } else {
        errorMessage = error.message;
    }
    return errorMessage;
};

export const getCurrenrUserId = () => (state) => state.auth.userId;
export const getCurrentUserData = () => (state) => state.auth.currentUser;

export const getAuthError = () => (state) => state.auth.authError;
export const getIsLoading = () => (state) => state.auth.isLoading;
export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;

export default authReducer;
