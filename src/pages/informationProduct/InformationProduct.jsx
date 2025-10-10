import React, { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./informationProduct.scss";
import { CartProvider } from "../../context/CartContext";

function InformationProduct() {
  const { productid } = useParams(); // pega o id da URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImagens] = useState([]);

  useEffect(() => {
  async function fetchProduct() {
    try {
      const response = await fetch(`http://localhost:8080/product/${productid}`);
      if (!response.ok) throw new Error("Erro ao buscar produto");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchProduct();
}, [productid]);

  const carregarImagens = async () => {
    const response = await getImage(productid);
          const data = response.data;
    
          let base64EncodedFormats = [];
    
            data.forEach((item) => {
                base64EncodedFormats = [...base64EncodedFormats, item.imageData];
            });
    
            const files = await base64ToFile(base64EncodedFormats);
    
            setImagens([...files]);
  }

  if (loading) return <p>Carregando produto...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
  <CartProvider>
    <Header />
      <main className="container-information-product">
      
      <div className="body-information-product">
        <section className="images-product">
          <section className="thumbnails">
            <div className="product-photo">
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
                                                src={exibirImagem(image)}
                                                alt={`Imagem ${index + 1}`}
                                                className="main-image"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
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
                <button className="cart">Adicionar ao carrinho</button>
              </div>
            </div>
          </section>

          <section className="other-products">
            <h3>Outros produtos</h3>
            <div className="list">
              <div className="item">
                <img src="../img/granTurismo7.jpg" alt="Jogo" />
                <p>R$ 184,07</p>
              </div>
              <div className="item">
                <img src="../img/MarioKart.jpg" alt="Controle" />
                <p>R$ 230</p>
              </div>
              <div className="item">
                <img src="../img/forza5.jpg" alt="Forza 5" />
                <p>R$ 7.000</p>
              </div>
            </div>
          </section>

          <section className="description">
            <h3>Descrição do produto</h3>
            <p>{product.description}</p>
          </section>
        </section>
      </div>
    </main>
  </CartProvider>
  );
}

export default InformationProduct;
