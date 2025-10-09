// components/XboxSection.jsx
import { motion } from "framer-motion";
import { Card3D } from "./Card3D";
import "./GamesEfets.css";
import { StarsParticles } from "./StarsParticles";
import { useProducts } from "../hooks/useProducts";
import { useEffect, useState } from "react";

export function XboxSection() {
   const {
    produtosList,
    image,
    loading,
    error,
  } = useProducts(15); 

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;


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
        transition={{ type: "spring", stiffness: 100, delay: 0.2, damping: 15 }}
      >
        XBOX SERIES {produtosList.length}
      </motion.h2>

      <motion.div
        className="grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
       {produtosList.length > 0 ? (
          produtosList.map((product) => (
            <Card3D
              key={product.id}
              product={{
                id: product.id,
                img: product.imageurl || image || "/img/forza5.jpg", //funciona pfv
                title: product.name || "Nome do Produto",
                price: `R$ ${product.price}` || "Preço Indisponível"
              }}
              platformColor="#107c10"
            />
          ))
        ) : (
          <div>Nenhum produto encontrado</div>
        )}
      </motion.div>
    </motion.section>
  );
}