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

    if (response.status != 200) { return; }
    setOrders(response.data);
  }

  useEffect(() => {
    loadOrders();
  }, [])

  const toggleOrder = (id) => {
    setOpenOrder(openOrder === id ? null : id);
  };

  return (
    <section className="orders-section">
      <h2>Pedidos</h2>

      {orders.map((order) => (
        <div
          key={order.orderId}
          className={`order-card open`}
          onClick={() => toggleOrder(order.id)}
        >
          <div className="order-header">
            <span className="order-id">Pedido: {order.orderId}</span>
            <span className="order-date">{order.orderDate}</span>
            <span className="order-status">{order.status}</span>
            <span className="order-price">
              R$ {order.totalPrice.toFixed(2).replace(".", ",")}
            </span>
            <button className="details-btn">
              Ver detalhes <span className="arrow">›</span>
            </button>
          </div>


          {/*openOrder === order.orderId &&*/ (
            order.orderItemResponseDTOList.map((product) =>
              <div key={product.productId} className="order-details">
                <img src={`data:image/jpeg;base64,${product.imageFile}`} alt={product.name} />
                <div className="order-info">
                  <p className="product-name">{product.name}</p>
                  <p className="product-qty">
                    Quantidade: {product.quantity}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </section>
  );
}
