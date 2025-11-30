import './SummaryStyle.scss';
import { usePedidoFromCart } from '../../../hooks/usePedidoFromCart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Summary({ buttonIsValid, selectedAddress, paymentMethod }) {
    const {
        produtos,
        calcularTotal1,
        recarregar
    } = usePedidoFromCart();

    const navigate = useNavigate();
    const [subTotal, setSubTotal] = useState();
    const [total, setTotal] = useState(0);
    const [valid, setValid] = useState(false);
    const [frete, setFrete] = useState(0)

    const calcularFrete = () => {
        return Number(Math.floor(Math.random() * 16));
    }

    useEffect(() => {
        const subtotalCal = calcularTotal1()
        const freteCal = calcularFrete()
        const totalCal = subtotalCal + freteCal
        
        setSubTotal(subtotalCal)
        setFrete(freteCal)
        setTotal(totalCal)

    }, [produtos, calcularTotal1]);

    useEffect(() => {
        setValid(buttonIsValid);
    }, [buttonIsValid]);


    const contianua = () => {
        console.log("Enviado para finalizar", {
            selectedAddress,
            paymentMethod,
            frete
        });
        
        navigate("/finalization", {
            state: {
            selectedAddress: selectedAddress,
            paymentMethod: paymentMethod,
            frete: frete
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
                    <p>R$ {frete.toFixed(2)}</p>
                </div>
                <div>
                    <p>Total</p>
                    <p>R$ {total.toFixed(2)}</p>
                </div>
            </div>
            <button
                disabled={!valid}
                onClick={contianua}>Continuar compra</button>
        </div>
    )
}