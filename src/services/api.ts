import axios from 'axios';

/**
 * An axios instance with a predefined baseURL for making API requests.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export default api;