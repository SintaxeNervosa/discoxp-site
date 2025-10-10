import "./ProductStyleForm.scss";
import emptyImage from '../../../../public/img/empty.webp';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { changeProduct, createProduct, deleteAllImagesByProduct, getImage, getImageFile, getProductById, upImages } from "../../../connection/productPaths";
import { convertFilesToFormData, fileExists, findByFavoriteImage, removeAll } from "../../../config/dexie";
import { base64ToFile } from "../../functions/ConvertFiles";

export default function ProductForm() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [description, setDescription] = useState("");
    const [evaluation, setEvaluetion] = useState(0);
    const [image, setImage] = useState(emptyImage);
    const [userGroup, setUserGoup] = useState("");

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

                const allImages = await getImage(productid);
                const favoriteImageData = allImages.data[0];
                const favoriteImageInBase64 = favoriteImageData.imageData;
                const imageFile = await base64ToFile([favoriteImageInBase64]);

                if (imageFile.length <= 0) { return; }

                setImage(URL.createObjectURL(imageFile[0]));

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

    // metódodo para buscar a imagem favorita salva no IndexedDB
    async function findFavoriteImageByProductFromImageDB() {
        const favoriteImageFile = await findByFavoriteImage();

        setImage(favoriteImageFile);
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

    const getUserGroup = () => {
        const dataUser = sessionStorage.getItem("user-data");
        const dataUserToJson = JSON.parse(dataUser);
        return dataUserToJson.group;
    };

    useEffect(() => {
        setUserGoup(getUserGroup());

        if (productid) {
            fetchProductData();
            return;
        }

        findFavoriteImageByProductFromImageDB();
    }, []);

    async function persist() {
        if (productid) {
            requestChangeProduct();
            return;
        }

        requestCreateProduct();
    }

    async function requestCreateProduct() {
        try {

            if (!await fileExists()) {
                toast.error("Adicione ao menos uma imagem");
                return;
            }

            let Product = {
                name: name,
                evaluation: evaluation,
                description: description,
                price: price,
                quantity: stock
            };

            const createProductResponse = await createProduct(Product);

            if (createProductResponse.status == 200) {
                toast.success("Produto cadastrado com sucesso!");

                const id = createProductResponse.data.id;
                const formData = await convertFilesToFormData();

                const saveImages = await upImages(formData, id);

                if (saveImages.status == 200) {
                    removeAll();
                }
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error.response.data.message);
            for (let err of errorMessage) {
                if (err != null && err != "") {
                    toast.error(err);
                }
            }
        }
    }

    const addImage = () => {
        navigate(`/admin/product/gallery${productid
            ? `/${productid}`
            : ""}`);
    };

    const cancel = () => {
        removeAll(); // remove todas as imagens do IndexedDB
        navigate(-1);
    };

    return (
        <div className="container-form-product">
            <ToastContainer />
            <h1>{textForm.titleForm}</h1>
            <div className="content">
                <div className="form">
                    <div className="product-name">
                        <p>Nome do Produto</p>
                        <input type="text"
                            disabled={userGroup != "ADMIN"}
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="product-price">
                        <p>Preço</p>
                        <input type="text"
                            disabled={userGroup != "ADMIN"}
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
                            disabled={userGroup != "ADMIN"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="product-evaluation">
                        <p>Avaliação</p>
                        <input type="number"
                            disabled={userGroup != "ADMIN"}
                            value={evaluation}
                            onChange={(e) => setEvaluetion(e.target.value)} />
                    </div>
                    <div className="buttons">
                        <div>
                            <button
                                disabled={userGroup != "ADMIN"}
                                onClick={() => addImage()}>Galeria de Imagens</button>
                            <button onClick={() => cancel()}>Cancelar</button>
                        </div>
                        <button onClick={() => persist()}>Salvar</button>

                    </div>
                </div>
                <img src={image} alt="" />
            </div>
        </div>
    );
}   