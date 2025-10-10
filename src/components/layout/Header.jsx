// Header.jsx
import { motion } from 'framer-motion';
import { useRef } from 'react';
import "./Header.css"
import Cart from '../../components/cart/Cart';
import { useCart } from '../../context/CartContext';

export function Header() {
  const logoRef = useRef(null);
  const { toggleCart, visibilityCart } = useCart();

  return (
    <>
      <Cart />
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
            }}
          />
        </div>

        <motion.div
          className="search"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <input
            type="text"
            placeholder="O que você procura?"
          />
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#cc5200" }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/img/loupe.png" alt="lupa" />
          </motion.button>
        </motion.div>

        <motion.div
          className="user"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.a
            href=""
            whileHover={{ scale: 1.1, color: "#f0f0f0" }}
            whileTap={{ scale: 0.95 }}
          >
            Entre
          </motion.a>
          ou
          <motion.a
            href=""
            whileHover={{ scale: 1.1, color: "#f0f0f0" }}
            whileTap={{ scale: 0.95 }}
          >
            Cadastra-se
          </motion.a>
          <img id='cart' src="/img/cart.svg" alt=""
            onClick={toggleCart} />
        </motion.div>
      </motion.header>
    </>
  );
}