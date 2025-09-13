import api from "../config/axiosConfig";


//GET
export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

export const getUsersById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        console.log(response.data);
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
        return response.data;
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
        return error;
    }
};

//PUT
export const changeStatus = async (id) => {
    try {
        const response = await api.put(`/admin/change-status/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const changeUser = async (user) => {
    try {
        console.log(user);
        
        const response = await api.put(`/admin`, user);
        return response;
    } catch (error) {
        return error;
    }
};
