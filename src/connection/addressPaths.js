import api from "../config/axiosConfig";

//Post Address 
export const createAddress = async (addressData) => {
    try {
        const response = await api.post('/address', addressData);
        return response;
    } catch (error) {
        throw error
    }
}

export const getAddresses = async (idUser) => {
    try {
        const response = await api.get(`/address/${idUser}`);
        return response;
    } catch (error) {
        throw error
    }
} 

export const updateAddress = async (idAddress, addressData) => {
    try {
        const response = await api.put(`/address/${idAddress}`, addressData);
        return response;
    } catch (error) {
        throw error
    }
}

export const deleteAddress = async (idAddress) => {
    try {
        const response = await api.delete(`/address/${idAddress}`);
        return response;
    } catch (error) {
        throw error
    }
}