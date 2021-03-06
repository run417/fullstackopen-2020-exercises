import axios from 'axios';
const baseUrl = '/api/blogs';

let bearerToken = null;

const setToken = (token) => {
    bearerToken = `Bearer ${token}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (blog) => {
    const config = {
        headers: { Authorization: bearerToken },
    };
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};

const update = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
    return response.data;
};

const updateComments = async (blogIdAndComment) => {
    const config = {
        headers: { Authorization: bearerToken },
    };
    const response = await axios.post(
        `${baseUrl}/${blogIdAndComment.id}/comments`,
        blogIdAndComment,
        config
    );
    return response.data;
};

const remove = async (blog) => {
    const config = {
        headers: {
            Authorization: bearerToken,
        },
    };
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
    return response.data;
};

export default { getAll, create, update, remove, updateComments, setToken };
