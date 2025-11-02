import React, { useState } from "react";
import "./orders.scss";

export function Orders() {
  const [openOrder, setOpenOrder] = useState(null);

  const orders = [
    {
      id: 15390787,
      date: "13/06/2020",
      status: "Aguardando pagamento",
      price: 699.9,
      product: {
        name: "A Plague Tale: Requiem",
        
        quantity: 1,
      },
    },
    {
      id: 15390788,
      date: "13/06/2020",
      status: "Aguardando pagamento",
      price: 699.9,
    },
    {
      id: 15390789,
      date: "13/06/2020",
      status: "Aguardando pagamento",
      price: 699.9,
    },
  ];

  const toggleOrder = (id) => {
    setOpenOrder(openOrder === id ? null : id);
  };

  return (
    <section className="orders-section">
      <h2>Pedidos</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className={`order-card ${openOrder === order.id ? "open" : ""}`}
          onClick={() => toggleOrder(order.id)}
        >
          <div className="order-header">
            <span className="order-id">Pedido: {order.id}</span>
            <span className="order-date">{order.date}</span>
            <span className="order-status">{order.status}</span>
            <span className="order-price">
              R$ {order.price.toFixed(2).replace(".", ",")}
            </span>
            <button className="details-btn">
              Ver detalhes <span className="arrow">›</span>
            </button>
          </div>

          {openOrder === order.id && order.product && (
            <div className="order-details">
              <img src={order.product.image} alt={order.product.name} />
              <div className="order-info">
                <p className="product-name">{order.product.name}</p>
                <p className="product-qty">
                  Quantidade: {order.product.quantity}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
