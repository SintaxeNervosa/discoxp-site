import { useEffect, useState } from "react";
import "./orders.scss";
import { getAllOrdersByUser } from "../../connection/OrderPaths";

export function Orders() {
  const [openOrder, setOpenOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const userFromSession = sessionStorage.getItem("user-data");
    const userFromSessionToJson = JSON.parse(userFromSession);

    const response = await getAllOrdersByUser(userFromSessionToJson.id);
    console.log(response.data);
    if (response.status != 200) { return; }

    let tempOrder = []
    for (let order of response.data) {
      tempOrder.push({ order, showDetail: false })
    }

    setOrders(tempOrder);
  }

  const renameOrderStatus = (status) => {
    switch (status) {
      case "AWAITING_PAYMENT":
        return "Aguardando pagamento"
      default: "Ocorreu um erro"
    }
  }

  useEffect(() => {
    loadOrders();
  }, [])

  useEffect(() => {
  }, [orders])

  const toggleOrder = (id) => {
    let orderTemp = [...orders];

    for (let i = 0; i < orderTemp.length; i++) {
      if (orderTemp[i].order.orderId == id) {
        orderTemp[i].showDetail = !orderTemp[i].showDetail; 
      }
    }

    setOrders(orderTemp);
  };

  return (
   <section className="orders-section">
      <h2>Pedidos</h2>
      {orders.map((order) => (
        <div
          key={order.order.orderId}
          className={`order-card open`}
          onClick={() => toggleOrder(order.order.orderId)}
        >
          {console.log("Order")}
          {console.log(order)}

          <div className="order-header">
            <span className="order-id">Pedido: {order.order.orderId}</span>
            <span className="order-date">{order.order.orderDate}</span>
            <span className="order-status">{renameOrderStatus(order.order.status)}</span>
            <span className="order-price">
              R$ {order.order.totalPrice}
            </span>
            <button className="details-btn">
              Ver detalhes <span className="arrow">›</span>
            </button>
          </div>

          {order.showDetail && (
            <div>
              {order.order.orderItemResponseDTOList.map((product) =>
                <div key={product.productId} className="order-details">

                  {console.log("Produto")}
                  {console.log(product)}

                  <img src={`data:image/jpeg;base64,${product.imageFile}`} alt={product.name} />
                  <div className="order-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-qty"> Quantidade: {product.quantity}</p>
                  </div>
                </div>
              )}
              
              <div className="order-info-grid">
                <div className="info-card">
                <h4>📦 Endereço de Entrega</h4>
                  <div className="address-info">
                    <p><strong>Cep: 86783623-02-3</strong></p>
                    <p>Rua das Flores, 123 Centro São Paulo - SP</p>
                    <p>Numero: 4332</p>
                    <p>CEP: 01234-567</p>
                  </div>
                </div>

                <div className="info-card">
                  <h4>Forma de Pagamento</h4>
                  <p>Cartão de Crédito</p>
                </div>

                <div className="info-card">
                  <h4>Resumo do Pedido</h4>
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Subtotal:</span>
                      <span>R$ 15,00</span>
                    </div>
                    <div className="price-row">
                      <span>Frete:</span>
                      <span>R$ 15,00</span>
                    </div>
                    <div className="price-row total">
                      <span>Total:</span>
                      <span>R$ 30,00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
