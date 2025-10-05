import React from "react";
import "./informationProduct.scss";

function InformationProduct() {
  return (
    <main className="container-information-product">
      <header className="header">
        <div className="logo">
          <img src="../img/Logo.png" alt="Logo" />
        </div>

        <div className="search">
          <input type="text" placeholder="O que você proucura?" />
          <button>
            <img src="/img/loupe.png" alt="lupa" />
          </button>
        </div>

        <div className="user">
          <a href="">Entre</a> ou <a href="">Cadastra-se</a>
        </div>
      </header>

      <div className="body-information-product">
        <section className="images-product">
          <section className="thumbnails">
            <div className="product-photo">
              <img src="../img/ps5.png" alt="PlayStation 5" />
            </div>

            <div className="thumbnails-information">
              <h1>
                Console Sony PlayStation 5 Slim, Com Leitor de Discos, SSD 1TB,
                Controle Sem Fio DualSense + 2 Jogos - 1000038858
              </h1>
              <h2>R$4.184,07</h2>
              <p>Em estoque</p>

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
                <img src="../img/game.jpg" alt="Jogo" />
                <p>R$ 184,07</p>
              </div>
              <div className="item">
                <img src="../img/controller.jpg" alt="Controle" />
                <p>R$ 230</p>
              </div>
              <div className="item">
                <img src="../img/camera.jpg" alt="Câmera PS5" />
                <p>R$ 7.000</p>
              </div>
            </div>
          </section>

          <section className="description">
            <h3>Descrição do produto</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sed malesuada ut ac tellus
              nisl...
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}

export default InformationProduct;
