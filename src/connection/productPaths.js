import api from "../config/axiosConfig";

//POST
export const createProduct = async (product) => {
    try {
        const response = await api.post("/admin/createProduct", product);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getProducts = async (page) => {
    try {
        const response = await api.get(`/products?size=10&page=${page}`);
        return response.data;
    } catch (error) {
        throw error.status;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const changeProductStatus = async (id) => {
    try {
        const response = await api.put(`admin/product/status/${id}`);
        return response;
    } catch (error) {
        throw error.message;
    }
};

export const changeProduct = async (newProduct) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.put(`admin/product`, newProduct);
        return response;
    } catch (error) {
        throw error;
    }
};

export const findAllUProductsByName = async (name) => {
    try {
        const response = await api.get(`/productsByName?name=${name}&size=10`);
        return response.data;
    } catch (error) {
        throw error.status;
    }
};

export const getProductItems = async (id) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao pegar items do produto:', {
            Details: error.response?.data,
            Status: error.response?.status
        });
        throw error;
    }
};

export const upImages = async (files, id) => {

    try {
        const response = await api.post(`/images/${id}`, files, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error('Erro em inserir as imagens de produto:', {
            Details: error.response?.data,
            Status: error.response?.status
        });
        throw error;
    }
};

//GET
//Esse método COM VÁRIAS imagens não deu certo
export const getImage = async (id) => {
    try {
        const response = await api.get(`/product/${id}/images`);

        // const urls = response.data.map(img => img.imageData);
        return response;
    } catch (error) {
        console.error("Erro ao buscar imagens do produto:", error);
        throw error;
    }
};
//Esse método COM UMA imagem deu certo 
export const getImageFile = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const bufferResponse = await api.get(`/images/${id}/file`, {
            responseType: "arraybuffer"
        });

        const blob = new Blob([bufferResponse.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        throw error;
    }
};

export const deleteImage = async (idProduct, idImg) => {
    try {
        const response = await api.delete(`/product/${idProduct}/images/${idImg}`);
        return response.data;
    } catch (error) {
        throw error.data.message;
    }
};

export const deleteAllImagesByProduct = async (id) => {
    try {
        const response = await api.delete(`/product/${id}/images`);
        return response;
    } catch (error) {
        throw error.data.message;
    }
}
