import { motion } from 'framer-motion';
import { StarsParticles } from './StarsParticles';
import { Observer } from "../hooks/observer";
import { Suspense } from "react";

import './Footer.css';

export function Footer() {
    const [sectionRef, isVisible] = Observer();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer 
      className="footer-enhanced"
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Partculas de fundo */}
       {isVisible && (
          <Suspense fallback={null}>
            <StarsParticles 
        count={200} 
        color="rgba(255, 255, 255, 0.3)" 
      />
          </Suspense>
        )}
      
      {/* efeito de brilho */}
      <div className="footer-glow" />
      
      <div className="footer-content">
        
        <motion.div className="footer-column" variants={itemVariants}>
          <motion.h4 
            className="footer-title"
            whileHover={{ scale: 1.05, color: '#EB8F25' }}
          >
            SOBRE A DISCOXP
          </motion.h4>
          <motion.p className="footer-text">
            A maior loja de games do Brasil, trazendo os melhores lançamentos 
            e clássicos para todas as plataformas.
          </motion.p>
          <motion.div className="footer-stats">
            <div className="stat">
              <motion.span 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                50K+
              </motion.span>
              <span>Clientes</span>
            </div>
            <div className="stat">
              <motion.span 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
              >
                10K+
              </motion.span>
              <span>Jogos</span>
            </div>
          </motion.div>
        </motion.div>

        
        <motion.div className="footer-column" variants={itemVariants}>
          <motion.h4 
            className="footer-title"
            whileHover={{ scale: 1.05, color: '#EB8F25' }}
          >
            LINKS RÁPIDOS
          </motion.h4>
          <motion.div className="footer-links">
            {['Início', 'Promoções', 'Lançamentos', 'Pré-venda', 'Coleções'].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                className="footer-link"
                variants={itemVariants}
                whileHover={{ 
                  x: 10, 
                  color: '#EB8F25',
                  transition: { type: "spring", stiffness: 400 }
                }}
                transition={{ delay: index * 0.1 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        
        <motion.div className="footer-column" variants={itemVariants}>
          <motion.h4 
            className="footer-title"
            whileHover={{ scale: 1.05, color: '#EB8F25' }}
          >
            SUPORTE
          </motion.h4>
          <motion.div className="footer-links">
            {['Central de Ajuda', 'Política de Trocas', 'Frete e Entrega', 'Formas de Pagamento', 'Contato'].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                className="footer-link"
                variants={itemVariants}
                whileHover={{ 
                  x: 10, 
                  color: '#EB8F25',
                  transition: { type: "spring", stiffness: 400 }
                }}
                transition={{ delay: index * 0.1 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        
        <motion.div className="footer-column" variants={itemVariants}>
          <motion.h4 
            className="footer-title"
            whileHover={{ scale: 1.05, color: '#EB8F25' }}
          >
            SIGA-NOS
          </motion.h4>
          <motion.div className="social-enhanced">
            {[
              { 
                name: 'Instagram', 
                icon: 'https://www.svgrepo.com/show/521711/instagram.svg',
                color: '#E4405F'
              },
              { 
                name: 'Facebook', 
                icon: 'https://www.svgrepo.com/show/494273/facebook-round.svg',
                color: '#1877F2'
              },
              { 
                name: 'LinkedIn', 
                icon: 'https://www.svgrepo.com/show/494278/linkedin-round.svg',
                color: '#0A66C2'
              },
              { 
                name: 'Twitter', 
                icon: 'https://www.svgrepo.com/show/513008/twitter-154.svg',
                color: '#1DA1F2'
              },
              { 
                name: 'YouTube', 
                icon: 'https://www.svgrepo.com/show/513089/youtube-168.svg',
                color: '#FF0000'
              },
              { 
                name: 'TikTok', 
                icon: 'https://www.svgrepo.com/show/487139/brand-tiktok-sq.svg',
                color: '#000000'
              }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href="#"
                className="social-link"
                variants={socialVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ '--social-color': social.color }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.img 
                  src={social.icon} 
                  alt={social.name}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <span>{social.name}</span>
                <motion.div 
                  className="social-glow"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        
        <motion.div className="footer-column" variants={itemVariants}>
          <motion.h4 
            className="footer-title"
            whileHover={{ scale: 1.05, color: '#EB8F25' }}
          >
            PAGAMENTO SEGURO
          </motion.h4>
          <motion.div className="payment-logos-enhanced">
            {[
              'https://www.svgrepo.com/show/394547/visa.svg',
              'https://www.svgrepo.com/show/394275/mastercard.svg',
              'https://www.svgrepo.com/show/357036/amex.svg',
              'https://www.svgrepo.com/show/512626/paypal-140.svg',
              'https://www.svgrepo.com/show/500416/pix.svg',
              'https://www.svgrepo.com/show/453387/payment.svg'
            ].map((logo, index) => (
              <motion.div
                key={logo}
                className="payment-logo"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  transition: { type: "spring", stiffness: 400 }
                }}
                transition={{ delay: index * 0.05 }}
              >
                <img src={logo} alt="Payment method" />
              </motion.div>
            ))}
          </motion.div>
          
        </motion.div>
      </div>

      
      <motion.div 
        className="footer-bottom-enhanced"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <div className="footer-bottom-content">
          <motion.p
            whileHover={{ scale: 1.05 }}
          >
            © 2024 <span className="logo-glow">DiscoXP Store</span>. Todos os direitos reservados
          </motion.p>
          <motion.div 
            className="footer-extra"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>Desenvolvido por 🎮 para gamers</span>
            <motion.div 
              className="pulse-dot"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
}