import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { addProductInCart, findAllProductsByCart } from '../../config/dexie';

export function Card3D({ product, platformColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef(null);

  const { toggleCart } = useCart();

  const cardVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  // Efeito 3D CSS funciona pfvr
  const handleMouseMove = (e) => {
    if (!imgRef.current || !isHovered) return;

    const card = imgRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15; //rotação 
    const rotateX = ((centerY - y) / centerY) * 15;

    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    setIsHovered(false);
  };

  const addInCart = async () => {
    await addProductInCart(product.id);
    await findAllProductsByCart();
    toggleCart();
  }

  return (
    <motion.div
      key={product.id}
      className="card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Container image com efeito 3D e CSS */}
      <div
        className="image-container-3d"
      >
        <motion.img
          ref={imgRef}
          src={product.img}
          alt={product.title}
          className="game-cover-3d"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
        />

        {/* Efeito de brilho dinâmica */}
        {isHovered && (
          <div
            className="hover-glow"
            style={{
              background: `radial-gradient(circle at center, ${platformColor}20 0%, transparent 70%)`
            }}
          />
        )}
      </div>

      <h3>{product.title}</h3>
      <motion.p
        className="price"
        whileHover={{ scale: 1.1, color: platformColor }}
      >
        {product.price}
      </motion.p>

      <motion.button
        onClick={() => (addInCart())}
        className="buy-button"
        whileHover={{
          scale: 1.1,
          backgroundColor: platformColor,
        }}
        whileTap={{ scale: 0.9 }}
      >
        Comprar
      </motion.button>
    </motion.div>
  );
}