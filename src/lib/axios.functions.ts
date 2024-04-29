const axios = require('axios');

export const axiosPostRequest = async (url: string, body: any, headers?: any): Promise<any> => {

    try {
        let req = await axios.post(url, body, { headers });
        return req;
    } catch (error) {
        throw error;
    }

}
