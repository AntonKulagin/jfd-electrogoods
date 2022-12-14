import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "/user/";

const usersService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload.id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
    //  updateAdmin: async (payload) => {
    //      const { data } = await httpService.patch(
    //          userEndpoint + payload._id,
    //          payload
    //      );
    //      return data;
    //  }
};
export default usersService;
