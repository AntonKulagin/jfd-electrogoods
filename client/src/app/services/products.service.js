import httpService from "./http.service";

const productsEndPoint = "/product/";

const productsService = {
    fetchAll: async () => {
        const { data } = await httpService.get(productsEndPoint);
        return data;
    }
};

export default productsService;
