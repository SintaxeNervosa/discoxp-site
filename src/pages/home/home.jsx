import { useEffect, useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";

function Home() {

    return (
        <main className="home">
            <header className="header">
                <div className="logo">
                    <img src="./img/Logo.png" alt="Logo" />
                </div>

                <div className="search">
                    <input type="text" placeholder="O que você proucura?" />
                    <button>
                        <img src="" alt="" />
                    </button>
                </div>

                <div className="user">
                    <a href="">Entre</a> ou <a href="">Cadastra-se</a>
                </div>
            </header>

            <div className="banner">
                <img src="/img/gta.png" alt="" />
            </div>

            <section className="section">
                <h2>MAIS VENDIDOS</h2>

                <div className="grid">
                    <div className="card">
                        <img src="/img/forza5.jpg" alt="capa01" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/granTurismo7.jpg" alt="capa02" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/Legend_of_Zelda.png" alt="capa03" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/SpiderMan.jpeg" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>
                </div>
            </section>

            <section className="section-destaque">
                <div className="card-destaque-1">
                    <img src="/img/S.jpeg" alt="capa" />
                    <h3>Marvel's Spider-Man 2</h3>
                    <button>Click aqui</button>
                </div>

                <div className="card-destaque-2">
                    <img src="/img/MarioKart.jpg" alt="capa" />
                    <h3>Mario Kart 8 Deluxe</h3>
                    <button>Click aqui</button>
                </div>
            </section>

            <section className="section-xbox">
                <h2>XBOX SERIES</h2>

                <div className="grid">
                    <div className="card">
                        <img src="/img/forza5.jpg" alt="capa01" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/forza5.jpg" alt="capa02" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/forza5.jpg" alt="capa03" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/forza5.jpg" alt="capa04" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>
                </div>
            </section>

            <section className="section-nitendo">
                <h2>NINTENDO</h2>

                <div className="grid">
                    <div className="card">
                        <img src="/img/Legend_of_Zelda.png" alt="capa01" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/Legend_of_Zelda.png" alt="capa02" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/Legend_of_Zelda.png" alt="capa03" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/Legend_of_Zelda.png" alt="capa04" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>
                </div>
            </section>

            <section className="section-play">
                <h2>PLAYSTATION</h2>

                <div className="grid">
                    <div className="card">
                        <img src="/img/granTurismo7.jpg" alt="capa01" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/granTurismo7.jpg" alt="capa02" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/granTurismo7.jpg" alt="capa03" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="/img/granTurismo7.jpg" alt="capa04" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-column">
                        <h4>ATENDIMENTO AO CLIENTE</h4>
                        <a href="">Central de Ajuda</a>
                        <a href="">Garantia DiscoXP Store</a>
                        <a href="">Ouvidoria</a>
                        <a href="">Fale Conosco</a>
                    </div>

                    <div className="footer-column">
                        <h4>SOBRE A DISCO XP STORE</h4>
                        <a href="">Central de Ajuda</a>
                        <a href="">Garantia Strument Store</a>
                        <a href="">Ouvidoria</a>
                        <a href="">Fale Conosco</a>
                    </div>

                    <div className="footer-column">
                        <h4>PAGAMENTO</h4>
                        <div className="logos">
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>SIGA-NOS</h4>
                        <div className="social">
                            <a href=""><img src="" alt="" /> Instagram</a>
                            <a href=""><img src="" alt="" /> Facebook</a>
                            <a href=""><img src="" alt="" /> Linkedin</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    © 2024 DiscoXP Store. Todos os direitos reservados
                </div>
            </footer>
        </main>
    );
}

export default Home;

