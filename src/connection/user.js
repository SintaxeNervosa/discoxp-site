import axios from "axios";

export const getUsers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/users");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

export const getUsersById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:8080/admin", user);
        return response;
    } catch (error) {
        return error;
    }
};

export const changeStatus = async (id) => {
    try {
        const response = await axios.put(`http://localhost:8080/admin/change-status/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const changeUser = async (user) => {
    try {
        console.log(user);
        
        const response = await axios.put(`http://localhost:8080/admin`, user);
        return response;
    } catch (error) {
        return error;
    }
};
