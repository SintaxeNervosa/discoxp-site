import "./ProductForm.scss";


export default function ProductForm() {







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
