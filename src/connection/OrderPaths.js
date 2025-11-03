import api from "../config/axiosConfig";

export const getAllOrdersByUser = async (id) => {
    try {
        const response = await api.get(`/order/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}