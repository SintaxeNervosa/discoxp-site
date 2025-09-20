import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PreviewProduct.scss';
import '../../components/ui/button.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getImage, getProductById } from '../../connection/productPaths';
import { toast } from 'react-toastify';

export default function PreviewProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const { productid } = useParams();
    const navigate = useNavigate();

    async function fetchDataProduct() {
        try {
            const response = await getProductById(productid);
            const data = response.data;

            if(response.status == 200) {
                setName(data.name); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProductImages() {
        try {
            const response = await getImage(productid);
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao buscar imagem do produto");
        }
    }

    useEffect(() => {
        fetchDataProduct();
    }, []);

    // dps coloca as imagens reais
    const productImages = [
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg"
    ];

    async function pegarDadosProduto() {
    }

    return (
        <div id='PreviewProduct'>
            <nav className='PreviewProduct-nav'>
                <h1>Preview de Produto</h1>
            </nav>

            <main className='PreviewProduct-main'>
                <figure className='PreviewProduct-figure'>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        pagination={{
                            clickable: true,
                            type: 'fraction'
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[Navigation, Pagination, Thumbs]}
                        className="preview-main-swiper"
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    >
                        {productImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    className='principal'
                                    src={image}
                                    alt={`Produto ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </figure>

                <aside className='PreviewProduct-aside'>
                    <div className='PreviewProduct-aside-titulo'>
                        <h1>{name}</h1>
                        <h3>⭐⭐⭐⭐⭐</h3>
                    </div>
                    <div className='PreviewProduct-aside-desc'>
                        <p>{description}</p>
                        <h5>Estoque: {quantity}</h5>
                        <h5>Preço: {price}$</h5>
                    </div>
                </aside>
            </main>

            <footer className='PreviewProduct-footer'>
                <div className='PreviewProduct-footer-images'>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Thumbs]}
                        className="preview-thumbs-swiper"
                    >
                        {productImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    className={`footer-images ${index === activeIndex ? 'active' : ''}`}
                                    src={image}
                                    alt={`Thumb ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className='PreviewProduct-footer-button'>
                    <button>COMPRAR</button>
                </div>
            </footer>
        </div>
    );
}