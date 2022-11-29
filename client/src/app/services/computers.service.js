import httpService from "./http.service";

const computersEndPoint = "computers/";

const computersService = {
    fetchAll: async () => {
        const { data } = await httpService.get(computersEndPoint);
        return data;
    },
};

export default computersService;
