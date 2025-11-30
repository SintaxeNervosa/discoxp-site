import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./DetailProduct.scss";
import { useCart } from "../../../context/CartContext";
import ApiService from '../../../connection/apiService';
import { base64ToFile } from "../../../components/functions/ConvertFiles";
import { Header } from "../../../components/layout/Header";
import { addProductInCart } from "../../../config/dexie";
import { Rating } from "react-simple-star-rating";

function InformationProduct() {
    const { productid } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImagens] = useState([]);

    const { toggleCart } = useCart();

    // desativar LOCOMOTIVE SCROLL śo agora
    useEffect(() => {
        // Se você tiver uma instância do Locomotive Scroll desfaz
        if (window.locomotiveScroll) {
            window.locomotiveScroll.destroy();
        }
        
        return () => {
            // Restaurar scroll normal qnd sair da página
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, []);

    const addInCart = async () => {
        try {
            await addProductInCart(parseInt(productid));
            toggleCart();
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);
        }
    }

    const carregarImagens = useCallback(async (productId) => {
        try {
            const response = await ApiService.product.getImage(productId);
            const data = response.data;

            let base64EncodedFormats = [];
            data.forEach((item) => {
                base64EncodedFormats.push(item.imageData);
            });

            const files = await base64ToFile(base64EncodedFormats);
            setImagens(files);
        } catch (error) {
            console.error("Erro ao carregar imagens:", error);
            setImagens([]);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        let controller = new AbortController();

        async function fetchProduct() {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/product/${productid}`, {
                    signal: controller.signal
                });
                
                if (!response.ok) throw new Error("Erro ao buscar produto");
                const data = await response.json();
                
                if (isMounted) {
                    setProduct(data);
                    await carregarImagens(productid);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Erro ao buscar produto:", error);
                    if (isMounted) setProduct(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        if (productid) {
            fetchProduct();
        }

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [productid, carregarImagens]);

    const mostrarImagem = (file) => {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return file.imageUrl || file;
    }

    // Cleanup das nas URLs qnd componente desmontar
    useEffect(() => {
        return () => {
            images.forEach(image => {
                if (image instanceof File) {
                    URL.revokeObjectURL(mostrarImagem(image));
                }
            });
        };
    }, [images]);

    if (loading) return (
        <div>
            <Header />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                Carregando produto...
            </div>
        </div>
    );
    
    if (!product) return (
        <div>
            <Header />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                Produto não encontrado.
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh' }}>
            <Header />
            <main className="container-information-product">
                <div className="body-information-product">
                    <section className="images-product">
                        <section className="thumbnails">
                            <div className="product-photo">
                                {images.length > 0 ? (
                                    <div className="swiper-container">
                                        <Swiper
                                            key={`swiper-${images.length}`}
                                            spaceBetween={10}
                                            navigation={true}
                                            pagination={{ clickable: true }}
                                            modules={[Navigation, Pagination]}
                                            className="main-swiper"
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
                                    </div>
                                ) : (
                                    <p>Nenhuma imagem disponível</p>
                                )}
                            </div>

                            <div className="thumbnails-information">
                                <h1>{product.name}</h1>
                                <p>
                                    <Rating
                                        initialValue={product.evaluation || 0}
                                        size={40}
                                        fillColor="gold"
                                        readonly
                                        allowFraction
                                    />
                                </p>
                                <h2>
                                    {product.price?.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </h2>
                                <p>Quantidade: {product.quantity}</p>

                                <div className="buttons">
                                    <button className="buy" onClick={addInCart}>Comprar agora</button>
                                </div>
                            </div>
                        </section>

                        <section className="description">
                            <h3>Descrição do produto</h3>
                            <p>{product.description}</p>
                        </section>

                        <section className="recommended-products">
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
                                    <div
                                        key={index}
                                        className="recommended-item"
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
                                    </div>
                                ))}
                            </div>
                        </section>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default InformationProduct;