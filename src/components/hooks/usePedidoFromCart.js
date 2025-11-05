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

    // Calcular total do pedido
    const calcularTotal = () => {
        // return produtos.reduce((total, produto) => {

        //     let result = total + (produto.preco * produto.quantidade);
        //     console.log(result);
        //     return;
        // }, 0);

        let teste = 0;
        produtos.map((produto) => {
            teste += produto.preco * produto.quantidade;
        });

        return teste;
    };

    useEffect(() => {
        carregarProdutosDoCarrinho();
    }, []);

    return {
        produtos,
        calcularTotal,
        recarregar: carregarProdutosDoCarrinho,
        error
    }
}