import httpService from "./http.service";

const cartEndPoint = "cart/";

const cartService = {
    fetchAll: async () => {
        const { data } = await httpService.get(cartEndPoint);
        return data;
    },
    add: async (id) => {
        const { data } = await httpService.post(cartEndPoint + id);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(cartEndPoint + id);
        return data;
    },
};

export default cartService;
