import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./PreviewProduct.scss";
import "../../components/ui/button.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getImage, getProductById } from "../../connection/productPaths";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";

export default function PreviewProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [evaluation, setEvaluation] = useState(0);

    const { productid } = useParams();
    const navigate = useNavigate();

    async function fetchDataProduct() {
        try {
            const response = await getProductById(productid);
            const data = response.data;

            if (response.status == 200) {
                setName(data.name);
                setDescription(data.description);
                setQuantity(data.quantity);
                setPrice(data.price);
                setEvaluation(data.evaluation);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProductImages() {
        try {
            const imagesUrls = await getImage(productid);
            console.log("imagens recebidas da api:", imagesUrls);

            if (imagesUrls && imagesUrls.length > 0) {
                setImages(imagesUrls);
            } else {
                toast.info("Nenhuma imagem encontrada para este produto");
            }
        } catch (error) {
            console.log(error);
            toast.error("Erro ao buscar imagem do produto");
        }
    }

    useEffect(() => {
        fetchDataProduct();
        fetchProductImages();
    }, [productid]);

    // dps coloca as imagens reais
    const productImagesFallback = [
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
    ];

    const imagesToShow = images.length ? images : productImagesFallback;

    async function pegarDadosProduto() { }

    return (
        <div id="PreviewProduct">
            <nav className="PreviewProduct-nav">
                <h1>Preview de Produto</h1>
            </nav>

            <main className="PreviewProduct-main">
                <figure className="PreviewProduct-figure">
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        pagination={{
                            clickable: true,
                            type: "fraction",
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[Navigation, Pagination, Thumbs]}
                        className="preview-main-swiper"
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    >
                        {imagesToShow.map((imageData, index) => (
                            <SwiperSlide key={`main-${index}`}>
                                <img
                                    className='principal'
                                    src={imageData}
                                    alt={`Produto ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </figure>

                <aside className="PreviewProduct-aside">
                    <div className="PreviewProduct-aside-titulo">
                        <h1>{name}</h1>
                        <h3>
                            <Rating
                                initialValue={evaluation}
                                size={40}
                                fillColor="gold"
                                readonly
                                allowFraction
                            />
                        </h3>
                    </div>
                    <div className="PreviewProduct-aside-desc">
                        <p>{description}</p>
                        <h5>Estoque: {quantity}</h5>
                        <h5>Preço: {price}$</h5>
                    </div>
                </aside>
            </main>

            <footer className="PreviewProduct-footer">
                <div className="PreviewProduct-footer-images">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Thumbs]}
                        className="preview-thumbs-swiper"
                    >
                        {imagesToShow.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    className={`footer-images ${index === activeIndex ? "active" : ""
                                        }`}
                                    src={image}
                                    alt={`Thumb ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="PreviewProduct-footer-button">
                    <button>COMPRAR</button>
                </div>
            </footer>
        </div>
    );
}
