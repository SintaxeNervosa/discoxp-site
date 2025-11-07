import { usePedidoFromCart } from '../../components/hooks/usePedidoFromCart'
import { Header } from "../../components/layout/Header";
import "./finalization.scss"
import Modal from 'react-modal'
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';
import { postOrder } from "../../connection/OrderPaths";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from 'react-router-dom';
import { getFavoriteAddressByUserId } from '../../connection/AddressPath';
import { useNavigate } from 'react-router-dom';
import { removeItens } from '../../config/dexie';

Modal.setAppElement('#root')

export default function Finalization() {
    const {
        produtos,
        calcularTotal1,
        recarregar
    } = usePedidoFromCart();
    const navigate = useNavigate()

    const [address, setAddress] = useState();

    const location = useLocation()
    const { paymentMethod, frete } = location.state || {}

    const userData = sessionStorage.getItem("user-data");

    console.log(location.state)
    console.log("Pagamento: ", paymentMethod)
    console.log("frete: ",frete)

    const [showPopup, setShowPopup] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false)
    const [orderNumber, setOrderNumber] = useState(null);
    const [orderTotal, setOrderTotal] = useState(null);

   
    const totalComFrete = calcularTotal1() + (frete || 0);

    const whenFinalizationBuy = async () => {
        try {
            const resp = await fzrPedido();

            setOrderNumber(resp.id)
            setOrderTotal(resp.total)

            setShowConfetti(true)
            setShowPopup(true)

            setTimeout(() => {
                setShowPopup(false)
            }, 3000)

            setTimeout(() => {
                setShowConfetti(false)
            }, 5000);

            setTimeout(async () => {
            navigate('/home')
            await removeItens()
            }, 6000);
        } catch (error) {
            toast.error("Erro ao finalizar a compra");
            console.error(error)
        }
    }

    const closePopup = () => {

        setShowPopup(false)
    }

    async function fzrPedido() {
        // tirei o user data daqui 
        if (!userData) {

            toast.warning("Usuário não logado");
            throw new Error("Usuário não logado");
        }

        const u = JSON.parse(userData);

        console.log(u)
        if (!u || !u.id || u === null) {
            toast.warning("Usuario não Logado")
        }

        //format for back
        const productsForApi = produtos.map(produto => ({
            productId: produto.id.toString(),
            quantity: produto.quantidade.toString()
        }))

        console.log('Enviando pedido:', {
            userId: u.id,
            paymentMethod: paymentMethod, //calm0
            freight: (frete || 0).toString(),
            products: productsForApi
        });

        if (productsForApi === null) {
            toast.warning("Sem nenhum produto no carinho")
        }

        const response = await postOrder(
            u.id,
            alissonTradux(paymentMethod),
            frete,
            productsForApi
        )
        return response;
    }

    const loadAddress = async () => {
        const userDataToJson = JSON.parse(userData);

        const response = await getFavoriteAddressByUserId(userDataToJson.id);
        const data = response.data;
        setAddress(`${data.street} ${data.neighborhood} - ${data.uf} ${data.cep}`)
    }

    useEffect(() => {
        loadAddress();
    }, []);

    const traduzAlisson = (m) => {
        if (m === "card") {
            return "Cartão de crédito"
        }
        return m
    }
    function alissonTradux(s) {
        if(s === "card"){
            return "CREDIT_CARD"
        }
    }

    return (
        <>
            <ToastContainer />
            {/*Confeeti */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.3}
                />
            )}
            {/*Modal Popup*/}
            <Modal
                isOpen={showPopup}
                onRequestClose={closePopup}
                className='modal-popup'
                closeTimeoutMS={300}
                overlayClassName='modal-overlay'
            >
                <div className="modal-body">
                    <div className="modal-icon">🎮</div>
                    <h2>Compra Finalizada com Sucesso!</h2>

                    {orderNumber && (
                        <div className="order-info">
                            <p><strong>Nº do Pedido: #{orderNumber}</strong></p>
                            {orderTotal && (
                                <p><strong>Total: R$ {orderTotal.toFixed(2)}</strong></p>
                            )}
                        </div>
                    )}

                    <p>Obrigado por comprar na <strong>DISCO XP</strong>!</p>
                </div>
            </Modal>

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

                    <aside>
                        <h5>Endereço de entrega</h5>
                        <p>{address}</p>

                        <h5>Forma de pagamento</h5>
                        <p><strong>{traduzAlisson(paymentMethod)}</strong></p>

                        <div className='valores'>
                            <div className='linha-valor'>
                                <span>Subtotal</span>
                                <span>R$ {calcularTotal1().toFixed(2)}</span>
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

                        <button onClick={whenFinalizationBuy}>Finalizar compra</button>
                        <button onClick={() => navigate('/order')}>Voltar aos meus pedidos</button>
                    </aside>
                </section>
            </div>
        </>
    )
}