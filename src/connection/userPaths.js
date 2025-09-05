import api from "../config/axiosConfig"

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
        throw error
    }
};
