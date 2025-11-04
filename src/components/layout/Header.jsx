import { motion } from 'framer-motion';
import { use, useEffect, useRef, useState } from 'react';
import "./Header.css"
import Cart from '../../components/cart/Cart';
import { useCart } from '../../context/CartContext';
import { findAllProductsByCart } from '../../config/dexie';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export function Header() {
  const logoRef = useRef(null);
  const { toggleCart, visibilityCart } = useCart();
  const [quantityItensInCart, setQuantityInCart] = useState(0);
  const [username, setUsername] = useState("Usuário");
  const navigate = useNavigate()

  async function changeQuantityCart() {
    const itens = await findAllProductsByCart();
    setQuantityInCart(itens.length);
  }

  function logout() {
    try {
      sessionStorage.removeItem("user-data");
      toast.done('Logout realizado com sucesso!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      toast.error('Erro ao realizar logout. Tente novamente mais tarde.')
    }

  }

  useEffect(() => {
    changeQuantityCart();
  }, [toggleCart]);

  useEffect(() => {
    let completeName = sessionStorage.getItem("user-data")
      ? JSON.parse(sessionStorage.getItem("user-data"))?.username || "Usuário"
      : "Usuário";

    setUsername(completeName.split(" ")[0]);
  }, [])

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
        <motion.span
          className="logo-text"
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: [0.8, 1, 0.8],
            textShadow: [
              "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #EB8F25, 0 0 20px #EB8F25",
              "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #EB8F25, 0 0 40px #EB8F25",
              "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #EB8F25, 0 0 20px #EB8F25"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff4da6, 0 0 50px #ff4da6",
            transition: { duration: 0.3 }
          }}
        >
          DISCO XP
        </motion.span>

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
          {sessionStorage.getItem("user-data") ? (
            //user logged
            <div className='user-logged'>
              <motion.img
                src="/svg/user.svg"
                alt="User Icon"
                id='use-icon'
                onClick={() => navigate('/profile')}
                whileHover={{
                  scale: 1.1,
                  filter: "brightness(1.3) drop-shadow(0 0 5px rgba(255,255,255,0.5))"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <motion.span
                whileHover={{ scale: 1.1, color: "#f0f0f0" }}
                whileTap={{ scale: 0.95 }}
              >
                Olá, {username}
              </motion.span>
            </div>
          ) : (
            //user not logged
            <>
              <motion.a
                href=""
                whileHover={{ scale: 1.1, color: "#f0f0f0" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
              >
                Entre
              </motion.a>
              ou
              <motion.a
                href=""
                whileHover={{ scale: 1.1, color: "#f0f0f0" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
              >
                Cadastra-se
              </motion.a>
            </>
          )}
          <div className='quantity-cart'>
            {quantityItensInCart > 0 &&
              <p>{quantityItensInCart}</p>
            }
            <img id='cart' src="/img/cart.svg" alt=""
              onClick={toggleCart} />
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}