import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export function BestSellersSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  
  const products = [
    { id: 1, img: "/img/forza5.jpg", title: "Forza Horizon 5", price: "R$ 699,90" },
    { id: 2, img: "/img/granTurismo7.jpg", title: "Gran Turismo 7", price: "R$ 699,90" },
    { id: 3, img: "/img/Legend_of_Zelda.png", title: "The Legend of Zelda", price: "R$ 699,90" },
    { id: 4, img: "/img/SpiderMan.jpeg", title: "Spider-Man 2", price: "R$ 699,90" }
  ];

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
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="card"
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            custom={index}
          >
            <motion.div 
              className="image-container"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img 
                src={product.img} 
                alt={product.title}
                whileHover="hover"
                variants={imageVariants}
              />
            </motion.div>
            
            <h3>{product.title}</h3>
            
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
            >
              Comprar
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}