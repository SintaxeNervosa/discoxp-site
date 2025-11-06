import api from "../config/axiosConfig";

export const getAllOrdersByUser = async (id) => {
    try {
        const response = await api.get(`/order/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const postOrder = async(userId,  paymentMethod, freight, products) => {//totalPrice, uai
    try {
        const response = await api.post('/order', {
            userId: userId.toString(),
            paymentMethod: paymentMethod,
            freight: Number(freight),
            products: products
        })
        return response.data //retorna numero do pedido
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        throw error;
    }
}