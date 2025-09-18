import { useEffect, useState } from "react";
import "./listProduct.scss";
import iconProduct from "../../assets/images/add-product 1.png";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../connection/productPaths";
import { ToastContainer, toast } from "react-toastify";

function ListProduct() {
  const navigate = useNavigate();
  const [productsList, setProductList] = useState([]);
  const [listIsEmpty, setListIsEmpty] = useState(true);

  // Buscar produtos
  async function fetchProducts() {
    try {
      const products = await getProducts();
      setProductList(products);
      setListIsEmpty(products.length === 0);
    } catch (err) {
      toast.error("Ocorreu um erro ao buscar produtos");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="main-list-product">
      <ToastContainer />

      <section className="container-list-product">
        <div className="header-list-product">
          <h1>Lista de Produtos</h1>
        </div>

        <div className="search-product">
          <input type="text" placeholder="Pesquisar Produtos" />
          <button onClick={() => navigate("/admin/product/register")}>
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
                      <td className="actions">
                        <button className="btn-view">View</button>
                        <button className="btn-edit">Editar</button>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </td>
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
        </div>
      </section>
    </main>
  );
}

export default ListProduct;
