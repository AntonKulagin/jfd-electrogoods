import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";
import usersService from "../../services/users.service";
import { cartLogOut } from "./cart";
// import { generateAuthError } from "../../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          currentUser: null,
          userId: localStorageService.getLocalId(),
          isLoggedIn: true,
          signUpError: null,
          signInError: null,
          isLoading: true
      }
    : {
          entities: null,
          currentUser: null,
          userId: null,
          isLoggedIn: false,
          signUpError: null,
          signInError: null,
          isLoading: true
      };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess(state, action) {
            state.userId = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        authSignUpRequestFailed(state, action) {
            state.signUpError = action.payload;
        },
        authSignInRequestFailed(state, action) {
            state.signInError = action.payload;
        },
        userCreated(state, action) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        userLoggedOut(state) {
            state.isLoggedIn = false;
            state.userId = null;
        },
        currentUserRequested(state) {
            state.isLoading = true;
        },
        currentUserReceived(state, action) {
            state.currentUser = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: authReducer, actions } = authSlice;
const {
    usersRequested,
    //  usersReceived,
    //  usersRequestFailed,
    authRequestSuccess,
    authSignUpRequestFailed,
    authSignInRequestFailed,
    userCreated,
    userLoggedOut,
    //  currentUserRequested,
    currentUserReceived
} = actions;

const createUserFailed = createAction("auth/createUserFailed");

// export const loadUsers = () => async (dispatch) => {
//     dispatch(usersRequested());
//     try {
//         const { content } = await usersService.fetchAll();
//         dispatch(usersReceived(content));
//     } catch (error) {
//         dispatch(usersRequestFailed(error.message));
//     }
// };

export const loadCurrentUser = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        dispatch(getUser());
    } catch (error) {
        dispatch(authSignUpRequestFailed(error.message));
    }
};

export const signUp = (data, redirect) => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const content = await authService.register(data);
        localStorageService.setTokens(content);
        dispatch(authRequestSuccess(content.localId));
        const newUser = {
            id: content.localId,
            name: data.name,
            created_at: Date.now(),
            email: data.email,
            image: `https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`
        };
        dispatch(createUser(newUser));
        dispatch(getUser());
        redirect("/", { replace: true });
    } catch (error) {
        dispatch(authSignUpRequestFailed(error.message));
    }
};

export const signIn = (data, redirect) => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const content = await authService.login(data);
        localStorageService.setTokens(content);
        dispatch(authRequestSuccess(content.localId));
        dispatch(getUser());
        redirect("/", { replace: true });
    } catch (error) {
        dispatch(authSignInRequestFailed(error.message));
    }
};

function getUser() {
    return async function (dispatch) {
        dispatch(usersRequested());
        try {
            const { content } = await usersService.getCurrentUser();
            dispatch(currentUserReceived(content));
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const logout = () => (dispatch) => {
    localStorageService.removeUserData();
    dispatch(userLoggedOut());
    dispatch(cartLogOut());
};

// const errorCatcher = (error) => {
//     let errorMessage;
//     console.log(error.response);
//     const { code, message } = error?.response?.data?.error;
//     if (code === 400) {
//         errorMessage = generateAuthError(message);
//     } else {
//         errorMessage = error.message;
//     }
//     return errorMessage;
// };

function createUser(data) {
    return async function (dispatch) {
        dispatch(usersRequested());
        try {
            const { content } = await usersService.create(data);
            dispatch(userCreated(content));
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

// export const getCurrentUser = () => (state) => {
//     return state.auth.entities
//         ? state.auth.entities.find((user) => user.id === state.auth.userId)
//         : null;
// };
export const getAuthUserId = () => (state) => state.auth.userId;

export const getUserById = (id) => (state) => {
    return state.auth.entities.find((user) => user.id === id);
};

export const getCurrenrUserId = () => (state) => state.auth.userId;
export const getCurrentUserData = () => (state) => state.auth.currentUser;

export const getAuthSignUpError = () => (state) => state.auth.signUpError;
export const getAuthSignInError = () => (state) => state.auth.signInError;
export const getIsLoading = () => (state) => state.auth.isLoading;
export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;
export default authReducer;
