import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/users';

export const getUsers = async() => {
    try{
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    }catch(error){
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }

};
