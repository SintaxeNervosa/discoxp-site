import { useState } from "react"
import Cart from "../../components/cart/Cart.jsx";

export default function CartTest() {
    const [visibilityCart, setVisibilityCart] = useState(false);

    function closeCart() {
        setVisibilityCart(false);
    }

    return (
        <div className="cart-teste-container">
            <Cart  visibility={visibilityCart} closeCart={closeCart}/>
            <button onClick={() => setVisibilityCart(!visibilityCart)}>Carrinho</button>
            <h1>Teste Carrinho</h1>
        </div>
    )
}