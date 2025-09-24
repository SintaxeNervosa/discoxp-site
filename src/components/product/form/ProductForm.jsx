import "./ProductStyleForm.scss";
import emptyImage from '../../../../public/img/empty.webp';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { changeProduct, createProduct, getImage, getImageFile, getProductById } from "../../../connection/productPaths";

export default function ProductForm() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [description, setDescription] = useState("");
    const [evaluation, setEvaluetion] = useState(0);
    const [image, setImage] = useState(emptyImage);

    const { productid } = useParams();
    const navigate = useNavigate();

    const textForm = {
        titleForm: productid ? "Editar" : "Cadastro de Produto",
        imageButtonText: productid ? "Editar Imagem" : "Adicionar Imagem"
    };

    async function fetchProductData() {
        try {
            const response = await getProductById(productid);

            if (response.status == 200) {
                const data = response.data;

                setName(data.name);
                setPrice(data.price);
                setStock(data.stock);
                setDescription(data.description);
                setEvaluetion(data.evaluation);

                const favoriteImage = await getImage(productid);

                console.log(favoriteImage);
                if (favoriteImage == null || favoriteImage == "") { return; }

                const idFavoriteImage = favoriteImage[0].id;
                await findFavoriteImageByProduct(idFavoriteImage);
                return;
            };

        } catch (error) {
            toast.error("Erro ao carregar dados do produto");
            // setTimeout(() => {
            //     navigate("/admin/list-products");
            // }, 1500);
        }
    }

    async function findFavoriteImageByProduct(idImage) {
        const response = await getImageFile(idImage);
        setImage(response);
    }

    function getErrorMessage(message) {
        const errors = message.split(", ");
        return errors;
    }

    const requestChangeProduct = async () => {
        try {
            const productObj = {
                id: productid,
                name: name,
                evaluation: evaluation,
                description: description,
                price: price,
                quantity: stock
            };

            const response = await changeProduct(productObj);

            if (response.status == 204) {
                toast.success("produto alterado com sucesso!");
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error.response.data.message);

            for (let err of errorMessage) {
                if (err != null && err != "") {
                    toast.error(err);
                }
            }
        }
    };

    useEffect(() => {
        if (productid) { fetchProductData(); }

    }, []);

    async function persist() {
        if (productid) {
            requestChangeProduct();
            return;
        }
        requestCreateProduct()
    }

    async function requestCreateProduct(){
        try{
            let Product = {
                name: name,
                evaluation: evaluation,
                description: description,
                price: price,
                quantity: stock
            }
            const Response = await createProduct(Product)
            if(Response.status == 200){
                toast.success("Produto cadastrado com sucesso!")
            }
        } catch (error){
            const errorMessage = getErrorMessage(error.response.data.message);
            for (let err of errorMessage) {
                if (err != null && err != "") {
                    toast.error(err);
                }
            }
        }
    }

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
                        <div>
                            <button onClick={() => addImage()}>{textForm.imageButtonText}</button>
                            <button onClick={() => cancel()}>Cancelar</button>
                        </div>
                        <button onClick={() => persist()}>Editar</button>

                    </div>
                </div>
                <img src={image} alt="" />
            </div>
        </div>
    );
}   