import "./ProductForm.scss";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./ProductForm.scss";

export default function ProductForm() {
    const [images, setImagens] = useState([]);
    const [thumbSwiper, setThumbSwiper] = useState(null);

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
    function exibirImagem(fili) {
        return URL.createObjectURL(fili);
    }

    function removerImagem(index) {
        const novasImagens = [...imagens];

        novasImagens.splice(index, 1);

        setImagens(novasImagens);
    }

    return (
        <div id="ProductForm">
            <header className="ProductForm-header">
                <h1>Cadastrar Produto</h1>
            </header>
            <main className="ProductForm-main">
                <aside>
                    <div className="ProductForm-main-inputs">
                        <p></p>
                        <input type="text" />
                    </div>
                    <div className="ProductForm-main-inputs">
                        <p></p>
                        <input type="text" />
                    </div>
                    <div className="ProductForm-main-inputs">
                        <p></p>
                        <input type="text" />
                    </div>
                    <div className="ProductForm-main-descricao">
                        <textarea
                            cols="40"
                            rows="4"
                            placeholder="Descrição do Produto"
                        ></textarea>
                        <input type="text" />
                    </div>
                    <div className="ProductForm-main-inputs">
                        <p></p>
                        <input type="text" />
                    </div>
                </aside>
                <figure className="ProductForm-images">
                    {images.length > 0 ? <></> : <div></div>}
                </figure>
            </main>

            <footer>
                <button>Adicionar imagem do produto</button>
                <button>Cancelar</button>
            </footer>
        </div>
    );
}
