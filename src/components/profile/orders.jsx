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
          key={order.orderId}
          className={`order-card open`}
          onClick={() => toggleOrder(order.order.orderId)}
        >
          {console.log(order.order.totalPrice)}
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
            order.order.orderItemResponseDTOList.map((product) =>
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
