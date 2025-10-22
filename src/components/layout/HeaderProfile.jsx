import "./HeaderProfile.css";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Cart from '../../components/cart/Cart';
import { useCart } from '../../context/CartContext';
import { findAllProductsByCart } from '../../config/dexie';

export function HeaderProfile() {
      const logoRef = useRef(null);
      const { toggleCart, visibilityCart } = useCart();
      const [quantityItensInCart, setQuantityInCart] = useState(0);
    
      async function changeQuantityCart() {
        const itens = await findAllProductsByCart();
        setQuantityInCart(itens.length);
      }
    
      useEffect(() => {
        changeQuantityCart();
      }, [toggleCart]);

    return (
        <><Cart />
            <motion.header
                className="header"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <div className="logo">
                    <motion.img
                        src="/img/DISCO_XP__1_-removebg-preview.png"
                        alt="Logo"
                        ref={logoRef}
                        animate={{ rotate: 360 }}
                        transition={{
                            rotate: {
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: 0,
                            transition: { duration: 0.3 }
                        }} />
                </div>
                <span className="logo-text">DISCO XP</span>

            </motion.header></>

    );
}
