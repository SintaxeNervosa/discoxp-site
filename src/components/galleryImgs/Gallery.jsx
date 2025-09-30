import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Gallery.scss";

import "../ui/button.scss";
import ApiService from "../../connection/apiService";
import { add, convertFilesToFormData, removeAll } from "../../config/dexie";
import { useNavigate } from "react-router-dom";

export default function Gallery({ onSave, onCancel, existingImages = [], productId }) {
    const [images, setImagens] = useState(existingImages);
    const [favoriteIndex, setFavoriteIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    function exibirImagem(file) {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return file.imageUrl || file;
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
            setImagens((prev) => [...prev, ...files]);
        }
    }

    function handleSetFavorite(index) {
        setFavoriteIndex(index);
    }


    function imageFavorita() {
        if (images.length === 0) return images;

        const reordenarImages = [...images];
        if (favoriteIndex > 0) {
            const [favoriteImage] = reordenarImages.splice(favoriteIndex, 1);
            reordenarImages.unshift(favoriteImage);
        }
        return reordenarImages;
    }

    function handleCancel() {
        if (window.confirm("Tem certeza que deseja cancelar? As alterações não serão salvas.")) {
            removeAll(); // remove todas as imagens do banco;
            navigate(-1);
            // onCancel();
        }
    }

    async function handleSave() {
        setIsLoading(true)
        try {
            const imagensToEnviar = imageFavorita()

            await salveImages(imagensToEnviar)

            onSave(imagensToEnviar, favoriteIndex)
        } catch (error) {
            console.error("Erro ao salvar imagens:", error);
            alert("Erro ao salvar imagens. Tente novamente.");
        }
        finally {
            setIsLoading(false);
        }
    }


    async function salveImages(imagesToUpar) {
        try {
            const newFiles = imagesToUpar.filter(img => img instanceof File)//only files
            await add(newFiles);

            // if (newFiles.length > 0) {
            //     const formData = new FormData

            //colocar cada file no FormData
            // newFiles.forEach(file => {
            //     formData.append("file", file)
            //     })

            //     //                console.log("Produto: ", productId, " Images = ", nwefiles)


            //     // await ApiService.product.upImages(formData, 5)
            //     console.log("enviou imgs")
            // } else {
            //     console.log("nenhuma img")
            // }
        } catch (error) {
            console.error(error);
            throw new Error("Falha")
        }
    }

    return (
        <div className="gallery-container">
            <div id="Gallery">
                <nav className="Gallery-nav">
                    <h1>Galeria de imagens</h1>
                    {isLoading && <p>enviando toasty</p>}
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
                                                    className={`favorite-btn ${index === favoriteIndex ? "active" : ""
                                                        }`}
                                                    onClick={() => handleSetFavorite(index)}
                                                    title="Definir como principal"
                                                    disabled={isLoading}
                                                >
                                                    ⭐
                                                </button>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removerImagem(index)}
                                                    title="Remover imagem"
                                                    disabled={isLoading}
                                                >
                                                    ×vdhfiohiovfoi
                                                </button>
                                            </div>
                                            {/* */}
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
                                                className={`thumbzona-image ${index === favoriteIndex ? "favorite" : ""
                                                    }`}
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
                            <p>
                                <strong>Insira a imagem aqui!</strong>
                            </p>
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
                                    className={`aside-image-item ${index === favoriteIndex ? "favorite" : ""
                                        }`}
                                    onClick={() => handleSetFavorite(index)}
                                >
                                    <img src={exibirImagem(image)} alt={`Preview ${index + 1}`} />
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
                    style={{ display: "none" }}
                />

                <footer className="gallery-footer">
                    <button
                        className="btn-add-more"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                    >
                        📷 Adicionar mais imagens
                    </button>
                    <div className="footer-actions">
                        <button className="btn-cancel" onClick={handleCancel} disabled={isLoading}>
                            Cancelar
                        </button>
                        <button className="btn-save" onClick={handleSave} disabled={isLoading || images.length === 0}>
                            {isLoading ? "Salvando..." : "💾 Salvar"}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
