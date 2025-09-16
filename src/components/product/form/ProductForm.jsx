import "./ProductStyleForm.scss";

export default function ProductForm() {
    const titleForm = "Cadastrar/Editar";
    return (
        <div className="container-form-product">
            <h1>{titleForm}</h1>
            <div className="content">
                <form action="">
                    <div className="product-name">
                        <p>Nome do Produto</p>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="product-price">
                        <p>Preço</p>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="product-stock">
                        <p>Estoque</p>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="product-description">
                        <p>Descrição Detalhada</p>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="product-evaluation">
                        <p>Avaliação</p>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="product-name">
                        <p>Nome do Produto</p>
                        <input type="number" name="" id="" />
                    </div>
                    <button>Adicionar Imagem</button>
                    <button>Cancelar</button>
                </form>
                <img src="" alt="" />
            </div>
        </div>
    );
}