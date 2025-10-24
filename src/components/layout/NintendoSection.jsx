import { StarsParticles } from "./StarsParticles";
import { motion } from "framer-motion";
import { Card3D } from "./Card3D";
import { Observer } from "../hooks/observer"; 
import { Suspense } from "react";

export function NintendoSection() {

    const [sectionRef, isVisible] = Observer();

  const products = [
    {
      id: 1,
      img: "/img/Legend_of_Zelda.png",
      title: "The Legend of Zelda",
      price: "R$ 699,90",
    },
    {
      id: 2,
      img: "/img/Super_Mario_Odyssey_Capa.png",
      title: "Super Mario Odyssey",
      price: "R$ 599,90",
    },
    {
      id: 3,
      img: "/img/Animal_Crossing_New_Horizons_capa.png",
      title: "Animal Crossing",
      price: "R$ 549,90",
    },
    {
      id: 4,
      img: "/img/Pokemon.jpeg",
      title: "Pokémon Scarlet",
      price: "R$ 749,90",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      scale: 0.8,
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

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotateY: 15,
      rotateX: 10,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.section
      className="section-nitendo"
      ref={sectionRef}
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        opacity: { duration: 1 },
        background: { duration: 4, repeat: Infinity, repeatType: "reverse" },
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
        NINTENDO
      </motion.h2>

      <motion.div
        className="grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="card"
            variants={itemVariants}
            whileHover="hover"
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
