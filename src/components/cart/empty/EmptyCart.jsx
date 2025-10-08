import './EmptyCartStyle.scss';
import emptyCart from '../../../assets/images/cart/empty-cart.svg';
import { AnimatePresence, motion } from 'motion/react';

export default function EmptyCart() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 300 }}
                transition={{ duration: 0.5 }}
                className="empty-cart-container">
                <img src={emptyCart} alt="" />
                <h1>Seu carrinho está vazio</h1>
                <p>Que tal navegar pelas milhares de ofertas
                    e achar uma especial para você</p>
                <button>Ver produtos</button>
            </motion.div>
        </AnimatePresence>
    );
}