import axios from "axios";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts/';

export const example = async () => {
    try {
        const response = axios.get(`${API_BASE_URL}1`);
        return (await response).data;
    } catch (error) {
        console.error(error);
    };
};



