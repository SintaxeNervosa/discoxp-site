import { useEffect, useState } from "react";
import "./home.scss";

function Home() {

    return (
        <main className="home">
            <header className="header">
                <div className="logo">
                    <img src="" alt="" />
                </div>

                <div className="search">
                    <button>
                        <input type="text" placeholder="O que você proucura?" />
                        <img src="" alt="" />
                    </button>
                </div>

                <div className="user">
                    <a href="">Entre</a> ou <a href="">Cadastra-se</a>
                </div>
            </header>

            <div className="banner">
                <img src="" alt="" />
            </div>

            <section className="section">
                <h2>MAIS VENDIDOS</h2>

                <div className="grid">
                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>
                </div>
            </section>

            <section className="secition-destaque">
                <div className="card-destaque-1">
                    <img src="" alt="" />
                    <h3>Marvel's Spider-Man 2</h3>
                    <button>Click aqui</button>
                </div>

                <div className="card-destaque-2">
                    <img src="" alt="" />
                    <h3>Mario Kart 8 Deluxe</h3>
                    <button>Click aqui</button>
                </div>
            </section>

            <section className="section-xbox">
                <h2>XBOX SERIES</h2>

                <div className="grid">
                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
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
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>
                </div>
            </section>

            <section className="section-xbox">
                <h2>XBOX SERIES</h2>

                <div className="grid">
                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>

                    <div className="card">
                        <img src="" alt="" />
                        <h3>Jogo PS2 - Gran Turismo 4</h3>
                        <p>R$ 699,90</p>
                        <button>Comprar</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;

