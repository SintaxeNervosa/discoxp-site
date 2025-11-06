import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import { addProductInCart, findAllProductsByCart } from '../../config/dexie';
import { useNavigate } from 'react-router-dom';

export function BestSellersSection() {
  const sectionRef = useRef(null);
  const {
    produtosList,
    loading,
    error,
  } = useProducts(15);

  const navigate = useNavigate();
  const { toggleCart } = useCart();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  // Animação de entrada com o stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: -45,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1
      }
    }
  };

  const titleVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.5
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1.2
      }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      y: -15,
      rotateY: 5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { scale: 0.95 }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "#cc5200",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotateY: 10,
      transition: { duration: 0.3 }
    }
  };

  const addInCart = async (id) => {
    await addProductInCart(id);
    toggleCart();
  }

  return (
    <motion.section
      ref={sectionRef}
      className="section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.h2
        className="section-title"
        variants={titleVariants}
      >
        MAIS VENDIDOS
      </motion.h2>

      <motion.div
        className="grid"
        variants={containerVariants}
      >
        {produtosList.length > 0 ? (
          produtosList.map((product) => product.quantity > 0 && (
            <motion.div
              key={product.id}
              className="card"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                onClick={() => navigate(`/product/${product.id}`)}
                className='image-container'
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <motion.img
                  src={product.imageUrl}
                  alt={product.name}
                  whileHover="hover"
                  variants={imageVariants} />
              </motion.div>

              <h3>{product.name}</h3>

              <motion.p
                className="price"
                whileHover={{ scale: 1.1, color: "#ff6b35" }}
              >
                {product.price}
              </motion.p>

              <motion.button
                className="buy-button"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={() => addInCart(product.id)}
              >
                Comprar
              </motion.button>
            </motion.div>
          ))
        ) : (
          <div>Nenhum produto encontrado</div>
        )}
      </motion.div>
    </motion.section>
  );
}