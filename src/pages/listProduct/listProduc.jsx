import { useEffect, useState } from "react";
import "./listProduct.scss";
import iconProduct from "../../assets/images/add-product 1.png";
import { useNavigate } from "react-router-dom";
import {
  changeProductStatus,
  findAllUProductsByName,
  getProducts,
} from "../../connection/productPaths";
import { ToastContainer, toast } from "react-toastify";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import ProductListingAdminButtons from "../../components/listProducts/admin/ProductListingAdminButtons";
import ProductListingStockistButtons from "../../components/listProducts/stockist/ProductListingStockistButtons";
import { getUserGrop } from "../../components/functions/SessionStorageMethods";

function ListProduct() {
  const [productsList, setProductList] = useState([]);
  const [listIsEmpty, setListIsEmpty] = useState(true);
  const [name, setName] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const [idToEdit, setIdToEdit] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState(null);

  const navigate = useNavigate();

  // Buscar produtos
  async function fetchProducts() {
    try {
      const products = await getProducts(page);

      setTotalPages(products.totalPages);

      setProductList(products.content);
      setListIsEmpty(products.length === 0);
    } catch (err) {
      toast.error("Ocorreu um erro ao buscar produtos");
    }
  }

  // carregar botão de acordo com o tipo de usuário
  const loadButtom = (p) => {
    let component = null;

    const userGroup = getUserGrop();
    if (userGroup != null) {

      userGroup == "ADMIN"
        ? component = <ProductListingAdminButtons
          p={p}
          changeStatusConfirm={() => changeStatusConfirm({
            id: p.id,
            status: p.status,
          })} />
        : component = <ProductListingStockistButtons p={p} />
    }

    return component;
  };

  async function findUProductsByName() {
    try {
      const response = await findAllUProductsByName(name);

      setProductList(response.content);
      setTotalPages(response.totalPages);

    } catch (error) {
      console.log(error);
    }
  }

  function fetchPages() {
    const items = [];

    for (let i = 0; i < totalPages; i++) {
      items.push(i);
    }

    return items;
  }

  const changeStatusConfirm = (product) => {
    setIdToEdit(product.id);

    if (product.status) {
      setPopUpMessage("Deseja desativar o produto?");
    } else {
      setPopUpMessage("Deseja ativar o produto?");
    }

    setAlertVisible(true);
  };

  const changeStatus = async () => {
    try {
      const response = await changeProductStatus(idToEdit);

      if (response.status == 204) {
        toast.success("Status atualizado com sucesso");
        fetchProducts();
      }

      setAlertVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar status");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    findUProductsByName();
    if (name == null) { setPage(0); }
  }, [name]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="main-list-product">
      <ToastContainer />
      <AlertConfirm
        title={popUpMessage}
        visible={alertVisible}
        cancelText="Cancelar"
        okText="Confirmar"
        onOk={() => {
          changeStatus();
        }}
        onCancel={() => {
          setAlertVisible(false);
        }}
      />

      <section className="container-list-product">
        <div className="header-list-product">
          <h1>Lista de Produtos</h1>
        </div>

        <div className="search-product">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Pesquisar Produtos"
          />
          <button
            hidden={getUserGrop() == "ADMIN" ? false : true}
            onClick={() => navigate("/admin/product/create")}>
            <img
              src={iconProduct}
              alt="Adicionar Produto"
              className="image-icon"
            />
          </button>
        </div>

        <div className="table-product">
          {!listIsEmpty ? (
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {productsList.length > 0 ? (
                  productsList.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.quantity}</td>
                      <td>R$ {p.price}</td>
                      <td>{p.status ? "Ativo" : "Inativo"}</td>
                      {loadButtom(p)}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Nenhum produto encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <h2>Não há produtos cadastrados</h2>
          )}
          {
            <div className="pages">
              {fetchPages().map((e, key) => (
                <p key={key} onClick={() => setPage(e)}>{e + 1}</p>
              ))}
            </div>
          }
        </div>
      </section>
    </main>
  );
}

export default ListProduct;
