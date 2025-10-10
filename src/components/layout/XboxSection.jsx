// components/XboxSection.jsx
import { motion } from "framer-motion";
import { Card3D } from "./Card3D";
import "./GamesEfets.css";
import { StarsParticles } from "./StarsParticles";

export function XboxSection() {

    const products = [
    { id: 1, img: "/img/Minecraft_capa.png", title: "Minecraft", price: "R$ 79,90" },
    { id: 2, img: "/img/Halo-_Reach_box_art.jpg", title: "Halo Reach", price: "R$ 199,90" },
    { id: 3, img: "/img/forza-horizon-1.jpg", title: "Forza Horizon", price: "R$ 190,90" },
    { id: 4, img: "/img/Gears_5_capa.jpeg", title: "Gears 5", price: "R$ 259,99" }
  ];

  const imageVariants = {
    hover: {
      scale: 1.12,
      rotateY: 20,
      rotateX: -5,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.section
      className="section-xbox"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        opacity: { duration: 1 },
        background: { duration: 6, repeat: Infinity, repeatType: "reverse" },
      }}
      viewport={{ once: true }}
    >
        <StarsParticles 
        count={380} 
        color="rgba(255, 255, 255, 0.8)" 
      />
      <motion.h2
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 99, delay: 0.2, damping: 15 }}
      >
        XBOX SERIES
      </motion.h2>

      <motion.div
        className="grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
       {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="card"
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            whileHover={{ 
              y: -20,
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 80, 
              damping: 15,
              delay: index * 0.1 
            }}
            viewport={{ once: true }}
          >
            <motion.div className="image-container-3d">
            <Card3D
            key={product.id}
            product={product}
            platformColor="#107c10"
          />
            </motion.div>
            
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}