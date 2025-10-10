import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [visibilityCart, setVisibilityCart] = useState(false);

    const openCart = () =>  {
        setVisibilityCart(true);
    }
    const closeCart = () => setVisibilityCart(false);
    const toggleCart = () => setVisibilityCart(v => !v);

    return (
        <CartContext.Provider value={{ visibilityCart, openCart, closeCart, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);