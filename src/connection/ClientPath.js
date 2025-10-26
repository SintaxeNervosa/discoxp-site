import api from "../config/axiosConfig";

export const createClient = async (request) => {
    try {
        const response = await api.post(`/client`, request);
        return response;
    } catch (error) {
        return error;
    }
}
export const existUserByEmail = async (email) => {
    try {
        const response = await api.get(`client/email/${email}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const existUserByCpf = async (cpf) => {
    try {
        const response = await api.get(`client/cpf/${cpf}`);
        return response;
    } catch (error) {
        return error;
    }
}