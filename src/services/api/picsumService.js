import { client } from './configs/axiosConfigs';
export const picsumService = {
    getImages: async () => {
        try {
            let response = await client.get(`/list?page=3&limit=30`);
            if (!response.status) {
                console.log(response);
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
}
