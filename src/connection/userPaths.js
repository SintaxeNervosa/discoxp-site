import api from "../config/axiosConfig.js";

//GET
export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw error.status;
    }
};

export const getUsersById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

//POST
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', {
            email,
            password
        });
        return response;
    } catch (error) {
        console.error('[API] Erro no login de usuario:', {
            Details: error.response?.data,
            Status: error.response?.status
        });
        throw error;
    }
};

export const createUser = async (user) => {
     
    try {
        const response = await api.post("/admin", user);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
};

//PUT
export const changeUserStatus = async (id) => {
    try {
        const response = await api.put(`/admin/change-status/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const changeUser = async (user) => {
    try {
        const response = await api.put(`/admin`, user);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const createBillingAddress = async (request) => {
    try {
        const response = await api.post(`/billing-address`, request);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const createDeliveryAddress = async (request) => {
    try {
        const response = await api.post(`/delivery-address`, request);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
};

