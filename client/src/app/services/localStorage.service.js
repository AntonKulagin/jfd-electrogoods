const JWT_TOKEN_KEY = "jwt-token";
const JWT_EXPIRES_KEY = "jwt-expires";
const USER_LOCAL_ID = "userId";
const JWT_REFRESH_KEY = "jwt-refresh-token";

export const setTokens = ({
    accessToken,
    expiresIn = 3600,
    userId,
    refreshToken
}) => {
    localStorage.setItem(JWT_TOKEN_KEY, accessToken);
    localStorage.setItem(JWT_EXPIRES_KEY, expiresIn);
    localStorage.setItem(USER_LOCAL_ID, userId);
    localStorage.setItem(JWT_REFRESH_KEY, refreshToken);
};

export const getAccessToken = () => {
    return localStorage.getItem(JWT_TOKEN_KEY);
};

export const getRefreshToken = () => {
    return localStorage.getItem(JWT_REFRESH_KEY);
};

export const getUserId = () => {
    return localStorage.getItem(USER_LOCAL_ID);
};

export const getJwtExpires = () => {
    return localStorage.getItem(JWT_EXPIRES_KEY);
};

export const removeUserData = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(JWT_EXPIRES_KEY);
    localStorage.removeItem(USER_LOCAL_ID);
    localStorage.removeItem(JWT_REFRESH_KEY);
};

export default {
    setTokens,
    getAccessToken,
    getUserId,
    getJwtExpires,
    removeUserData,
    getRefreshToken
};
