import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Gallery.scss";

import ApiService from "../../../../connection/apiService";
import { add, convertFilesToFormData, fileExists, findAll, removeAll } from "../../../../config/dexie";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAllImagesByProduct, getImage } from "../../../../connection/productPaths";
import { base64ToFile } from "../../../functions/ConvertFiles";
import { toast, ToastContainer } from "react-toastify";

export default function Gallery({ onSave, onCancel, existingImages = [], productId }) {
    const [images, setImagens] = useState(existingImages);
    const [favoriteIndex, setFavoriteIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();
    const { productid } = useParams();

    function obterUrlDaImagem(file) {
        if (file instanceof File) {
            return URL.createObjectURL(file);  //file ou blob bruto pá criar url de visualiar sem upar
        }
        return file.imageUrl || file; //n for é string ou img já carregada
    }

    function removerImagem(index) {
        const novasImagens = images.filter((_, i) => i !== index); //Remove uma imagem e cria uma nova lista
        setImagens(novasImagens);

        if (index === favoriteIndex) {
            setFavoriteIndex(0); //se for define essa fav
        } else if (index < favoriteIndex) {
            setFavoriteIndex(favoriteIndex - 1); //antes da favorita para manter referencia
        }
    }

    function lidarComSelecaoDeImagem(event) {
        const files = Array.from(event.target.files); //converte fileList em array 
        if (files.length > 0) {
            setImagens((prev) => [...prev, ...files]); //colocar prev img old + files news
        }
    }

    function definirComoFavorita(index) {
        setFavoriteIndex(index);
    }


    function reordenarComFavoritaPrimeiro() {
        if (images.length === 0) return images;

        const reordenarImages = [...images];
        if (favoriteIndex > 0) {
            ///remove a img fav da pocição atual e coloca no 0
            const [favoriteImage] = reordenarImages.splice(favoriteIndex, 1);
            reordenarImages.unshift(favoriteImage);
        }
        return reordenarImages;
    }

    function lidarComCancelamento() {
        if (window.confirm("Tem certeza que deseja cancelar? As alterações não serão salvas.")) {
            navigate(-1);
            // onCancel();
        }
    }

    async function lidarComSalvamento() {
        setIsLoading(true)
        try {
            const imagensToEnviar = reordenarComFavoritaPrimeiro()

            await salveImages(imagensToEnviar);

            onSave(imagensToEnviar, favoriteIndex)
        } catch (error) {
            console.log("ERROR: " + error);
            toast.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const parseImagesToFormData = (newFiles) => {
        const formData = new FormData(); //obj js para form virtual para enviar file HTTP (multipart/form-data)

        newFiles.forEach((file) => { //cada file msm do back @RequestParam('file')
            formData.append("file", file);
        });

        return formData;
    }

    async function salveImages(imagesToUpar) {
        const newFiles = imagesToUpar.filter(img => img instanceof File)//only files

        // caso tenha imagens já salvas no banco, 
        // limpa-o e adiciona as novas imagens
        if (newFiles.length <= 0) {
            throw "Informe ao menos uma imagem.";
        }

        if (productid) {
            const responseDeleteAllImages = await deleteAllImagesByProduct(productid);
            console.log("Response: " + responseDeleteAllImages);

            if (responseDeleteAllImages.status == 200) {
                const formData = parseImagesToFormData(newFiles);

                const responseAddImages = await ApiService.product.upImages(formData, productid);

                if (responseAddImages.status == 200) {
                    toast.success("Imagens salvas com sucesso");
                }
            }
        } else {
            if (fileExists()) { removeAll(); }
            await add(newFiles);
        }

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

    }

    // função para cerregar as imagens do indexedDB
    const fetchImageProductFromImageDB = async () => {
        const response = await findAll();

        let files = [];

        if (response.length > 0) {
            response.forEach(file => {
                files = [...files, file];
            });
        }

        setImagens(files);
    }

    // carregar imagens da API
    const fetchImageProductFromApi = async () => {
        const response = await getImage(productid);
        const data = response.data;

        let base64EncodedFormats = [];

        data.forEach((item) => {
            base64EncodedFormats = [...base64EncodedFormats, item.imageData];
        });

        const files = await base64ToFile(base64EncodedFormats);

        setImagens([...files]);
    }

    useEffect(() => {
        if (productid) {
            fetchImageProductFromApi();
            return;
        }

        fetchImageProductFromImageDB();
    }, []);

    return (
        <div className="gallery-container">
            <ToastContainer />
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
                                                src={obterUrlDaImagem(image)}
                                                alt={`Imagem ${index + 1}`}
                                                className="main-image"
                                            />
                                            <div className="slide-actions">
                                                <button
                                                    className={`favorite-btn ${index === favoriteIndex ? "active" : ""
                                                        }`}
                                                    onClick={() => definirComoFavorita(index)}
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
                                                    ×
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
                                                src={obterUrlDaImagem(image)}
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
                                    onClick={() => definirComoFavorita(index)}
                                >
                                    <img src={obterUrlDaImagem(image)} alt={`Preview ${index + 1}`} />
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
                    onChange={lidarComSelecaoDeImagem}
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
                        <button className="btn-cancel" onClick={lidarComCancelamento} disabled={isLoading}>
                            Cancelar
                        </button>
                        <button className="btn-save" onClick={lidarComSalvamento} disabled={isLoading || images.length === 0}>
                            {isLoading ? "Salvando..." : "💾 Salvar"}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
