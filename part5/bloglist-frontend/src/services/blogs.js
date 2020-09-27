import axios from 'axios';
const baseUrl = '/api/blogs';

let bearerToken = null;

const setToken = (token) => {
    bearerToken = `Bearer ${token}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (blogObjectData) => {
    const config = {
        headers: { Authorization: bearerToken },
    };
    const response = await axios.post(baseUrl, blogObjectData, config);
    return response.data;
};

export default { getAll, create, setToken };
