import axios from "axios"

const API_URL = 'http://localhost:3001'

const DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*',
}

const DEFAULT_CONFIG = {
    headers: DEFAULT_HEADERS
};

const axiosConfig = {
    baseURL: API_URL,
};

const myAxios = axios.create(axiosConfig);  

export async function get(path, authToken) {
    let config = {
        headers: {
            ...DEFAULT_HEADERS,
            authorization: authToken
        },
    }

    try {
        const response = await myAxios.get(`${path}`, config);

        return response.data;
    } catch (err) {
        console.error(err)
    }
}

export async function post(path, data, token = false) {
    let config = {
        ...DEFAULT_CONFIG
    }
    if (token) {
        config.headers.authorization = token
    }
    try {
        const response = await myAxios.post(`${path}`, data, config);
        return response.data;
    } catch (err) {
        console.error(err)
    }
}

export async function del(path, token = false) {
    let config = {
        ...DEFAULT_CONFIG
    }
    if (token) {
        config.headers.authorization = token
    }
    try {
        const response = await myAxios.delete(`${path}`, config);

        console.log(response)
        return response.data;
    } catch (err) {
        console.error(err)
    }
}

export default myAxios;