import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PreviewProduct.scss';
import '../../components/ui/button.scss';
import ApiService from "../../connection/apiService";

export default function PreviewProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [name, setName] = useState();
    const [description, setDescription] = useState()

    
    // dps coloca as imagens reais
    const productImages = [
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg", 
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg",
        "/img/alexey-savchenko-k4Akpt5-Sfk-unsplash.jpg"
    ];

    async function pegarDadosProduto() {
        const response = await ApiService.product.getProductItems
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
                        <h1>Grand Theft Auto VI</h1>
                        <h3>⭐⭐⭐⭐⭐</h3>
                    </div>
                    <div className='PreviewProduct-aside-desc'>
                        <p>GTA 6 é um videogame ambientado no estado fictício de Leonida, uma paródia da Flórida dos anos 2020, com foco em Vice City. O jogo segue a dupla de criminosos Lucia e Jason Duval, inspirados no casal "Bonnie e Clyde", enquanto tentam construir um império de drogas e sobreviver a uma conspiração estadual após um assalto fracassado</p>
                        <h5>Estoque: 945</h5>
                        <h5>Preço: 500,00$</h5>
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