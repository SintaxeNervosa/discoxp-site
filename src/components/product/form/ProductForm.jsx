import "./ProductStyleForm.scss";
import gta from '../../../assets/images/gta.png';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ProductForm() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [description, setDescription] = useState("");
    const [evaluation, setEvaluetion] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = useState(null);

    const { productid } = useParams();

    const textForm = {
        titleForm: productid ? "Editar" : "Cadastro de Produto",
        imageButtonText: productid ? "Editar Imagem" : "Adicionar Imagem"
    };

    useEffect(() => {
        toast.warning("Faz direito ein");
    }, []);

    const addImage = () => { };
    const cancel = () => { };

    return (
        <div className="container-form-product">
            <ToastContainer />
            <h1>{textForm.titleForm}</h1>
            <div className="content">
                <div className="form">
                    <div className="product-name">
                        <p>Nome do Produto</p>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="product-price">
                        <p>Preço</p>
                        <input type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="product-stock">
                        <p>Estoque</p>
                        <input type="text"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)} />
                    </div>
                    <div className="product-description">
                        <p>Descrição Detalhada</p>
                        <input type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="product-evaluation">
                        <p>Avaliação</p>
                        <input type="number"
                            value={evaluation}
                            onChange={(e) => setEvaluetion(e.target.value)} />
                    </div>
                    <div className="buttons">
                        <button onClick={() => addImage()}>{textForm.imageButtonText}</button>
                        <button onClick={() => cancel()}>Cancelar</button>
                    </div>
                </div>
                <img src={image == null ? "" : image} alt="" />
            </div>
        </div>
    );
}   