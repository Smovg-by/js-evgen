import axios from 'axios';

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key = '?apikey=a73965b8';
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string, page: number) => {
        const query = `${key}&s=${title}&r=json&type=movie&page=${page}`
        return axiosInstance.get(query)
    }

};


export default API;
