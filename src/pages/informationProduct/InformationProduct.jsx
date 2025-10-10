import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./informationProduct.scss";
import { CartProvider, useCart } from "../../context/CartContext";
import ApiService from '../../connection/apiService';
import { base64ToFile } from "../../components/functions/ConvertFiles";
import { motion } from "framer-motion";
import { Header } from "../../components/layout/Header";
import { addProductInCart } from "../../config/dexie";

function InformationProduct() {
  const { productid } = useParams(); // pega o id da URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImagens] = useState([]);

  const { toggleCart } = useCart();

  const addInCart = async () => {
    await addProductInCart(productid);
    toggleCart();
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:8080/product/${productid}`);
        if (!response.ok) throw new Error("Erro ao buscar produto");
        const data = await response.json();
        setProduct(data);

        //imagem
        carregarImagens();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productid]);

  const carregarImagens = async () => {
    const response = await ApiService.product.getImage(productid);
    const data = response.data;

    let base64EncodedFormats = [];

    data.forEach((item) => {
      base64EncodedFormats = [...base64EncodedFormats, item.imageData];
    });

    const files = await base64ToFile(base64EncodedFormats);

    setImagens([...files]);
  }

  function mostrarImagem(file) {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file.imageUrl || file;
  }

  if (loading) return <p>Carregando produto...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <Header />
      <main className="container-information-product">
        <div className="body-information-product">
          <section className="images-product">
            <section className="thumbnails">
              <div className="product-photo">
                {images.length > 0 ? (
                  <Swiper
                    spaceBetween={10}
                    navigation={true}
                    pagination={{ clickable: true }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Pagination, Thumbs]}
                    className="main-swiper"
                    initialSlide={0}// Começa [0] das imagens
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="slide-content">
                          <img
                            src={mostrarImagem(image)}
                            alt={`Imagem ${index + 1}`}
                            className="main-image"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p>carregando setImagens...</p>
                )}
              </div>

              <div className="thumbnails-information">
                <h1>{product.name}</h1>
                <h2>
                  {product.price?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h2>
                <p>Quantidade: {product.quantity}</p>

                <div className="buttons">
                  <button className="buy">Comprar agora</button>
                  <button className="cart" onClick={() => addInCart()}>Adicionar ao carrinho</button>
                </div>
              </div>
            </section>

            <motion.section
              className="recommended-products"
              variants={itemVariants}
            >
              <div className="section-header">
                <h3>🎮 Você também pode gostar</h3>
                <div className="section-divider"></div>
              </div>

              <div className="recommended-grid">
                {[
                  { img: "../img/granTurismo7.jpg", price: "R$ 184,07", name: "Gran Turismo 7" },
                  { img: "../img/MarioKart.jpg", price: "R$ 230,00", name: "Mario Kart 8" },
                  { img: "../img/forza5.jpg", price: "R$ 299,90", name: "Forza Horizon 5" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="recommended-item"
                    whileHover={{
                      y: -10,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="item-image">
                      <img src={item.img} alt={item.name} />
                      <div className="item-overlay">
                        <button className="quick-view">👀 Ver</button>
                      </div>
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="item-price">{item.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <section className="description">
              <h3>Descrição do produto</h3>
              <p>{product.description}</p>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}

export default InformationProduct;
