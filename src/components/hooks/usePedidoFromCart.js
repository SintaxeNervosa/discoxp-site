import { useEffect, useState } from "react"
import { findAllProductsByCart } from '../../config/dexie.js';

export function usePedidoFromCart() {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    async function carregarProdutosDoCarrinho() {
        try {
            const produtosCarrinho = await findAllProductsByCart();

            const produtosFormatados = produtosCarrinho.map(item => ({
                id: item.id,
                nome: item.name || item.nome || 'Produto sem nome',
                preco: item.price || item.preco || item.valor,
                imagem: item.file,
                quantidade: item.quantity || item.quantidade || item.qtd
            }));

            console.log("Produtos do carrinho:", produtosFormatados);
            setProdutos(produtosFormatados);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            setError("Erro ao carregar produtos do pedido");
        }
    }

const calcularTotal1 = () => {
    return produtos.reduce((total, produto) => {
        return total + (produto.preco * produto.quantidade);
    }, 0);
};

const calcularTotal2 = () => {
    let total = 0;
    produtos.forEach((produto) => {
        total += produto.preco * produto.quantidade;
    });
    return total;
};

    useEffect(() => {
        carregarProdutosDoCarrinho();
    }, []);

    return {
        produtos,
        calcularTotal1,
        recarregar: carregarProdutosDoCarrinho,
        error
    }
}