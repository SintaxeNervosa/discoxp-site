import { motion } from 'framer-motion';
import { StarsParticles } from "./StarsParticles";
import { Card3D } from "./Card3D";
import { Observer } from "../hooks/observer";
import { Suspense } from "react";

export function PlayStationSection() {

    const [sectionRef, isVisible] = Observer();

  const products = [
    { id: 1, img: "/img/granTurismo7.jpg", title: "Gran Turismo 7", price: "R$ 699,90" },
    { id: 2, img: "/img/capa/SpiderMan.jpeg", title: "Spider-Man 2", price: "R$ 599,90" },
    { id: 3, img: "/img/God_of_War_2005_capa.png", title: "God of War", price: "R$ 549,90" },
    { id: 4, img: "/img/The_Last_of_Us_capa.png", title: "The Last of Us", price: "R$ 749,90" }
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
      className="section-play"
      ref={sectionRef}
      whileInView={{ 
        opacity: 1,
      }}
      transition={{ 
        opacity: { duration: 1 },
        background: { duration: 4, repeat: Infinity, repeatType: "reverse" }
      }}
      viewport={{ once: true }}
    >
        {isVisible && (
          <Suspense fallback={null}>
            <StarsParticles 
        count={380} 
        color="rgba(255, 255, 255, 0.8)" 
      />
          </Suspense>
        )}
      <motion.h2
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        PLAYSTATION
      </motion.h2>

      <div className="grid">
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
      </div>
    </motion.section>
  );
}