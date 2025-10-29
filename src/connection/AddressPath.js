import api from "../config/axiosConfig";

export const addAddress = async (obj) => {
    try {
        const response = await api.post(`/delivery-address`, obj);
        return response;
    } catch (error) {
        return error;
    }
}

export const getAllAddressByUserId = async (id) => {
    try {
        const response = await api.get(`/delivery-address/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const changeFavoriteAddres = async (obj) => {
    try {
        const response = await api.put(`/delivery-address`, obj);
        return response;
    } catch (error) {
        return error;
    }
}