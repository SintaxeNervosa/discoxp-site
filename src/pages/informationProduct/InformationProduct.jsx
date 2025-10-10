import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./informationProduct.scss";

function InformationProduct() {
  const { productid } = useParams(); // pega o id da URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchProduct() {
    try {
      const response = await fetch(`http://localhost:8080/product/${productid}`);
      if (!response.ok) throw new Error("Erro ao buscar produto");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchProduct();
}, [productid]);

  if (loading) return <p>Carregando produto...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <main className="container-information-product">
      <header className="header">
        <div className="logo">
          <img src="../img/Logo.png" alt="Logo" />
        </div>

        <div className="search">
          <input type="text" placeholder="O que você procura?" />
          <button>
            <img src="/img/loupe.png" alt="lupa" />
          </button>
        </div>

        <div className="user">
          <a href="">Entre</a> ou <a href="">Cadastre-se</a>
        </div>
      </header>

      <div className="body-information-product">
        <section className="images-product">
          <section className="thumbnails">
            <div className="product-photo">
              <img src="../img/175144648.jpg"  />
            </div>

            <div className="thumbnails-information">
              <h1>{product.name}</h1>
              <h2>
                {product.price?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
              <p>Quantidade: {product.quantity}</p>

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
                <img src="../img/granTurismo7.jpg" alt="Jogo" />
                <p>R$ 184,07</p>
              </div>
              <div className="item">
                <img src="../img/MarioKart.jpg" alt="Controle" />
                <p>R$ 230</p>
              </div>
              <div className="item">
                <img src="../img/forza5.jpg" alt="Forza 5" />
                <p>R$ 7.000</p>
              </div>
            </div>
          </section>

          <section className="description">
            <h3>Descrição do produto</h3>
            <p>{product.description}</p>
          </section>
        </section>
      </div>
    </main>
  );
}

export default InformationProduct;
