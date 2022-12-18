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
          isLoading: true,
          currentDataLoaded: false,
          allUsersIsLoading: true,
          isAdmin: true
      }
    : {
          entities: null,
          currentUser: null,
          userId: null,
          isLoggedIn: false,
          authError: null,
          isLoading: true,
          currentDataLoaded: false,
          allUsersIsLoading: true,
          isAdmin: false
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

        usersRequested(state) {
            state.allUsersIsLoading = true;
        },
        usersReceivedSuccess(state, action) {
            state.entities = action.payload;
            state.allUsersIsLoading = false;
        },
        usersRequestFailed(state, action) {
            state.error = action.payload;
            state.allUsersIsLoading = false;
        },

        currentUserRequested(state) {
            state.isLoading = true;
            state.currentDataLoaded = false;
        },
        currentUserReceivedSuccess(state, action) {
            state.currentUser = action.payload;
            state.isAdmin = action.payload.isAdmin;
            state.isLoading = false;
            state.currentDataLoaded = true;
        },
        currentUserRequestFailed(state, action) {
            state.authError = action.payload;
            state.isLoading = false;
            state.currentDataLoaded = false;
        },

        updateRequested(state) {
            state.currentDataLoaded = false;
        },
        updateReceived(state, action) {
            state.currentUser = action.payload;
            state.currentDataLoaded = true;
        },
        updateRequestFailed(state, action) {
            state.authError = action.payload;
            state.currentDataLoaded = false;
        },

        userLoggedOut(state) {
            state.userId = null;
            state.currentUser = null;
            state.isLoggedIn = false;
        },

        updateAdminReseived(state, action) {
            state.entities = [
                ...state.entities.filter(
                    (user) => user._id !== action.payload._id
                ),
                action.payload
            ];
            state.currentDataLoaded = true;
        }
    }
});

const { reducer: authReducer, actions } = authSlice;
const {
    authRequested,
    authReceivedSuccess,
    authRequestFailed,

    usersRequested,
    usersReceivedSuccess,
    usersRequestFailed,

    currentUserRequested,
    currentUserReceivedSuccess,
    currentUserRequestFailed,

    updateRequested,
    updateReceived,
    updateRequestFailed,

    userLoggedOut,

    updateAdminReseived
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

export const loadAllUsers = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await usersService.get();
        dispatch(usersReceivedSuccess(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const signUp = (data, redirect) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const content = await authService.register(data);
        localStorageService.setTokens(content);
        dispatch(authReceivedSuccess(content.userId));
        redirect("/", { replace: true });
    } catch (error) {
        dispatch(authRequestFailed(errorCatcher(error)));
    }
};

export const signIn = (data, redirect) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const content = await authService.login(data);
        localStorageService.removeUserData();
        localStorageService.setTokens(content);
        dispatch(authReceivedSuccess(content.userId));
        redirect("/", { replace: true });
    } catch (error) {
        dispatch(authRequestFailed(errorCatcher(error)));
    }
};

export const updateUser = (data) => async (dispatch) => {
    dispatch(updateRequested());
    try {
        const { content } = await usersService.update(data);
        dispatch(updateReceived(content));
    } catch (error) {
        dispatch(updateRequestFailed(errorCatcher(error)));
    }
};

export const updateUserAdmin = (data) => async (dispatch) => {
    dispatch(updateRequested());
    try {
        const { content } = await usersService.update(data);
        dispatch(updateAdminReseived(content));
    } catch (error) {
        dispatch(updateRequestFailed(errorCatcher(error)));
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

export const getIsAdmin = () => (state) => state.auth.isAdmin;
export const getAllUsers = () => (state) => state.auth.entities;

export const getCurrenrUserId = () => (state) => state.auth.userId;
export const getCurrentUserData = () => (state) => state.auth.currentUser;
export const getDataStatus = () => (state) => state.auth.currentDataLoaded;

export const getAuthError = () => (state) => state.auth.authError;
export const getIsLoading = () => (state) => state.auth.isLoading;
export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;

export default authReducer;
