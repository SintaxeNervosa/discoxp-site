import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "./Gallery.scss";
import "../../SCSS/global.scss";
import "../ui/button.scss";

export default function Gallery({ onSave, onCancel}) {
    const [images, setImagens] = useState([]);
    const [thumbSwiper, setThumbSwiper] = useState(null);
    const [favoriteIndex, setFavoriteIndex] = useState(0);

    function exibirImagem(fili) {
        return URL.createObjectURL(fili);
    }

    function removerImagem(index) {
        const novasImagens = [...images];

        novasImagens.splice(index, 1);

        setImagens(novasImagens);

          if (index === favoriteIndex) {
            setFavoriteIndex(0);
        } else if (index < favoriteIndex) {
            setFavoriteIndex(favoriteIndex - 1);
        }
    }

    function QualImagemDIV() {
        document.getElementById("file").click();
    }

    function handleImageSelect(event) {
        const arquivosSelecionados = event.target.files;

        const arrayDeArquivos = Array.from(arquivosSelecionados);
        setImagens(function (imagensAntigas) {
            return [...imagensAntigas, ...arrayDeArquivos];
        });
    }
        function RetornarImages() {
        // Retorna as imagens e o índice da favorita para o componente pai
        onSave(images, favoriteIndex);
    }

    return (
        <div className="container">
           <div id="Gallery">
                 <nav className="Gallery-nav">
                <h1>Galeria de imagens</h1>
            </nav>
            <figure className="Gallery-images">
                <img src="/img/DropImage.png" alt="" />
                <p><strong>Insira a imagem aqui!</strong></p>
            </figure>
            <aside className="Gallery-aside">
                {/*Images já adicionadas */}
                <img src="/img/DropImage.png" alt="" />
                <img src="/img/DropImage.png" alt="" />
                <img src="/img/DropImage.png" alt="" />
                <img src="/img/DropImage.png" alt="" />
            </aside>
            <footer>
                <button>Adicionar imagem</button>
                <button>Salvar</button>
            </footer>
           </div>
        </div>
    );
}

{/* <figure className="ProductForm-images">
                {images.length > 0 ?
                    <>
                        <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Pagination, Thumbs]}
                className="main-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="slide-content">
                      <img 
                        src={exibirImagem(image)} 
                        alt={`Produto ${index + 1}`}
                        className="main-image"
                      />
                    <img src="public/svg/trash.svg" alt="" className="remove-btn" onClick={() => removerImagem(index)}/>
                    <img src="public/svg/star.svg" alt="" className="favoritar-btn"/>{/*A imagem favoritada é a primeira do array 
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="thumbs-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={exibirImagem(image)} 
                      alt={`Thumb ${index + 1}`}
                      className="thumb-image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
                    </> :
                    <div>

                    </div>}
            </figure> /*/}