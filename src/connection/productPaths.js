import api from "../config/axiosConfig";

//POST
export const createProduct = async (product) => {
    try {
        const response = await api.post("/createProduct", product);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        throw error.status;
    }
};

export const upImages = async (files, id) => {
    try {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
        }

        const response = await api.post(`/images/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
         console.error('Erro em inserir as imagens de produto:', {
            Details: error.response?.data,
            Status: error.response?.status
        });
        throw error;
    }
};

//GET
export const getImages = async (id) => {
    try {
        const response = await api.get(`/product/${id}/images`);
        return response.data;
    } catch (error) {
           console.error("Erro ao buscar imagens do produto:", error);
        throw error;
    }
};

