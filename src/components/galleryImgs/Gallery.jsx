import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

// Importações CSS do Swiper - CORRIGIDO
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Gallery.scss";
import "../ui/button.scss"


export default function Gallery({ onSave, onCancel, existingImages = [] }) {
    const [images, setImagens] = useState(existingImages);
    const [favoriteIndex, setFavoriteIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const fileInputRef = useRef(null);

    function exibirImagem(file) {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return file;
    }

    function removerImagem(index) {
        const novasImagens = images.filter((_, i) => i !== index);
        setImagens(novasImagens);

        if (index === favoriteIndex) {
            setFavoriteIndex(0);
        } else if (index < favoriteIndex) {
            setFavoriteIndex(favoriteIndex - 1);
        }
    }

    function handleImageSelect(event) {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setImagens(prev => [...prev, ...files]);
        }
    }

    function handleSetFavorite(index) {
        setFavoriteIndex(index);
    }

    function handleSave() {
        onSave(images, favoriteIndex);
    }

    return (
        <div className="gallery-container">
            <div id="Gallery">
                <nav className="Gallery-nav">
                    <h1>Galeria de imagens</h1>
                </nav>

                {/* Área principal */}
                <div className="gallery-mainzona">
                    {images.length > 0 ? (
                        <div className="swiper-container">
                            {/* Swiper Principal Da imgagem grande*/}
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Pagination, Thumbs]}
                                className="main-swiper"
                                initialSlide={favoriteIndex}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="slide-content">
                                            <img 
                                                src={exibirImagem(image)} 
                                                alt={`Imagem ${index + 1}`}
                                                className="main-image"
                                            />
                                            <div className="slide-actions">
                                                <button 
                                                    className={`favorite-btn ${index === favoriteIndex ? 'active' : ''}`}
                                                    onClick={() => handleSetFavorite(index)}
                                                    title="Definir como principal"
                                                >
                                                    ⭐
                                                </button>
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => removerImagem(index)}
                                                    title="Remover imagem"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/*Miniaturas das imagensss*/}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="thumbszonas-swiper"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="thumbzona-slide">
                                            <img 
                                                src={exibirImagem(image)} 
                                                alt={`Thumb ${index + 1}`}
                                                className={`thumbzona-image ${index === favoriteIndex ? 'favorite' : ''}`}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <div 
                            className="galeria-vazia"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <img src="/img/DropImage.png" alt="Adicionar imagem" />
                            <p><strong>Insira a imagem aqui!</strong></p>
                            <p className="subtext">Clique para adicionar imagens</p>
                        </div>
                    )}
                </div>

                {/*preview das imaginhas*/}
                <aside className="gallery-aside">
                    <h3>Imagens adicionadas</h3>
                    <div className="aside-images-grid">
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <div 
                                    key={index} 
                                    className={`aside-image-item ${index === favoriteIndex ? 'favorite' : ''}`}
                                    onClick={() => handleSetFavorite(index)}
                                >
                                    <img 
                                        src={exibirImagem(image)} 
                                        alt={`Preview ${index + 1}`}
                                    />
                                    {index === favoriteIndex && (
                                        <div className="favorite-indicator">Principal</div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="no-images">Nenhuma imagem adicionada</p>
                        )}
                    </div>
                </aside>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                />

                <footer className="gallery-footer">
                    <button 
                        className="btn-add-more"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Adicionar mais imagens
                    </button>
                    <div className="footer-actions">
                        <button className="btn-cancel" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button className="btn-save" onClick={handleSave}>
                            Salvar
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}