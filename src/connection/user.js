import axios from "axios";

export const getUsers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/users");
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
