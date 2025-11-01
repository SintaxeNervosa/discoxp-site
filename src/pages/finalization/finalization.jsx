import { usePedidoFromCart } from '../../components/hooks/usePedidoFromCart'
import { Header } from "../../components/layout/Header";
import "./finalization.scss"

export default function Finalization() {
    const {
        produtos,
        calcularTotal,
        recarregar
    } = usePedidoFromCart();

    const frete = 15.90;
    const totalComFrete = calcularTotal() + frete;

    return (
        <>
            <Header />
            <div className='finalizacao-pedido'>
                <h4>Resumo do pedido</h4>

                <section className='finalizacao-content'>
                    {/* Lado esquerdo - Lista de produtos */}
                    <div className='produtos-lista'>
                        {produtos.map(produto => (
                            <article key={produto.id} className='produto-item'>
                                <div className='item-img'>
                                    <img src={produto.imagem} alt={produto.nome} />
                                </div>

                                <div className='item-info'>
                                    <div className='item'>
                                        <h6>{produto.nome}</h6>
                                    </div>

                                    <div className='item-u'>
                                        <p>Quantidade: {produto.quantidade}</p>
                                        <p><strong>Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}</strong></p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Lado direito - Resumo do pedido */}
                    <aside>
                        <h5>Endereço de entrega</h5>
                        <p>Av. Eng. Eusébio Stevaux 823<br />
                        Santo Amaro - São Paulo<br />
                        SP 04696-000</p>
                        
                        <h5>Forma de pagamento</h5>
                        <p><strong>Cartão de crédito</strong></p>

                        <div className='valores'>
                            <div className='linha-valor'>
                                <span>Subtotal</span>
                                <span>R$ {calcularTotal().toFixed(2)}</span>
                            </div>
                            <div className='linha-valor'>
                                <span>Frete</span>
                                <span>R$ {frete.toFixed(2)}</span>
                            </div>
                            <div className='linha-valor'>
                                <span><strong>Total</strong></span>
                                <span><strong>R$ {totalComFrete.toFixed(2)}</strong></span>
                            </div>
                        </div>

                        <button>Finalizar compra</button>
                        <button>Voltar aos meus pedidos</button>
                    </aside>
                </section>
            </div>
        </>
    )
}