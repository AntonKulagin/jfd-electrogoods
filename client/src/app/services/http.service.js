import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

axios.defaults.baseURL = configFile.defaultsUrl;

axios.interceptors.request.use(
    async function (request) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/g.test(request.url);
            request.url =
                (containSlash ? request.url.slice(0, -1) : request.url) +
                ".json";
            const expiresDate = localStorageService.getJwtExpires();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && Date.now() > expiresDate) {
                const data = await authService.refresh();

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                request.params = { ...request.params, auth: accessToken };
            }
        }
        return request;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id && !data.id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
}

axios.interceptors.response.use(
    function (response) {
        if (response.data === null) return response;
        if (typeof response === "object") {
            response.data = { content: transformData(response.data) };
            return response;
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const httpService = {
    post: axios.post,
    get: axios.get,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
