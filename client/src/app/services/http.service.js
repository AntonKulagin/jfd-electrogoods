import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (request) {
        const expiresDate = localStorageService.getJwtExpires();
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && Date.now() > expiresDate;

        if (configFile.isFireBase) {
            const containSlash = /\/$/g.test(request.url);
            request.url =
                (containSlash ? request.url.slice(0, -1) : request.url) +
                ".json";

            if (isExpired) {
                const data = await authService.refresh();

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    userId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                request.params = { ...request.params, auth: accessToken };
            }
        } else {
            if (isExpired) {
                const data = await authService.refresh();

                localStorageService.setTokens(data);
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                request.headers = {
                    ...request.headers,
                    Authorization: `Bearer ${accessToken}`
                };
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

http.interceptors.response.use(
    function (response) {
        if (configFile.isFireBase) {
            response.data = { content: transformData(response.data) };
            return response;
        }
        response.data = { content: response.data };
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const httpService = {
    post: http.post,
    get: http.get,
    put: http.put,
    delete: http.delete
};

export default httpService;
