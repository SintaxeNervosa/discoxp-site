import './SummaryStyle.scss';
import { usePedidoFromCart } from '../../hooks/usePedidoFromCart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Summary({ buttonIsValid, selectedAddress, paymentMethod }) {
    const {
        produtos,
        calcularTotal,
        recarregar
    } = usePedidoFromCart();

    const navigate = useNavigate();
    const [subTotal, setSubTotal] = useState();
    const [total, setTotal] = useState(0);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setSubTotal(calcularTotal());
    }, []);

    useEffect(() => {
        setValid(buttonIsValid);
    }, [buttonIsValid]);


    const contianua = () => {
        console.log(selectedAddress);
        console.log(paymentMethod);
        navigate("/finalization", {
            state: {
                selectedAddress: selectedAddress,
                paymentMethod: paymentMethod
            }
        })
    }

    return (
        <div className="container-summary">
            <h1>Resumo do pedido</h1>
            {produtos.map(produto => (
                <div key={produto.id} className="item">
                    <img src={produto.imagem} alt="" />
                    <div>
                        <p>{produto.nome}</p>
                        <p>R$ {produto.preco}</p>
                    </div>
                </div>
            ))}
            <div className="prices">
                <div>
                    <p>Subtotal</p>
                    <p>R$ {subTotal}</p>
                </div>
                <div>
                    <p>Frete</p>
                    <p>Grátis</p>
                </div>
                <div>
                    <p>Total</p>
                    <p>R$ {total}</p>
                </div>
            </div>
            <button
                disabled={!valid}
                onClick={contianua}>Continuar compra</button>
        </div>
    )
}