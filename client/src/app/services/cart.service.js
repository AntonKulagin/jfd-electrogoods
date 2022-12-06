import httpService from "./http.service";

const cartEndPoint = "cart/";

const cartService = {
    get: async (userId) => {
        const params = {
            orderBy: "currentUserId",
            equalTo: `${userId}`
        };
        const { data } = await httpService.get(cartEndPoint, { params });
        return data;
    },
    add: async (productId) => {
        const { data } = await httpService.post(cartEndPoint + productId);
        return data;
    },
    remove: async (cartId) => {
        const { data } = await httpService.delete(cartEndPoint + cartId);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            cartEndPoint + payload._id,
            payload
        );
        return data;
    }
};

export default cartService;
