import './SummaryStyle.scss';
import zelda from "../../../assets/images/cart/zelda.svg";

export default function Summary({ products }) {
    return (
        <div className="container-summary">
            <h1>Resumo do pedido</h1>
            <div className="item">
                <img src={zelda} alt="" />
                <div>
                    <p>The Legend of Zelda: Breath of the Wild</p>
                    <p>R$ 200,00</p>
                </div>
            </div>
            <div className="prices">
                <div>
                    <p>Subtotal</p>
                    <p>R$ 220,00</p>
                </div>
                <div>
                    <p>Frete</p>
                    <p>Grátis</p>
                </div>
                <div>
                    <p>Total</p>
                    <p>R$ 669,00</p>
                </div>
            </div>
            <button>Continuar compra</button>
        </div>
    )
}