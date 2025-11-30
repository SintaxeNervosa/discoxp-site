import { useEffect, useState } from 'react'
import './OrderList.scss';
import { toast, ToastContainer } from 'react-toastify';
import { changeOrderStatus, getAllOrders } from '../../../../connection/OrderPaths';

export default function OrderList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [currentOrderId, setCurrentOrderId] = useState(null);

    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        const response = await getAllOrders();

        if(response.status == 200) {
            setOrders(response.data)
        }
    }

    const prepareStatusChange = (id, orderStatus) => {
        setStatus(orderStatus)
        setCurrentOrderId(id);
        setIsModalOpen(true);
    };

    const saveStatusChange = async () => {
        const response = await changeOrderStatus(currentOrderId, status);

        if(response.status == 201) {
            setIsModalOpen(false)
            loadOrders();
            toast.success("Status alterado com sucesso!")
        }
    }

    useEffect(() => {
        loadOrders();
    }, [])

    return (
        <main className='main-list-order'>
            <ToastContainer />
            <div className="order-list-container">
                <div className="header-list-orders">
                    <h1>Lista Pedidos</h1>
                </div>
                <div className="table-order">
                    {orders.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Data</th>
                                    <th>Valor Total</th>
                                    <th>Status</th>
                                    <th>Editar Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, key) => (
                                    <tr key={key}>
                                        <td>{order.orderId}</td>
                                        <td>{order.orderDate}</td>
                                        <td>R$ {order.total}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <button onClick={() => prepareStatusChange(order.orderId, order.status)}>Alterar Status</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : <h1 style={{color: 'white'}}>Não há Pedidos</h1>
                    }
                </div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div>
                            <h2>Alterar Status</h2>
                            <button onClick={() => setIsModalOpen(false)}>X</button>
                        </div>

                        <div className='content'>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="AWAITING_PAYMENT">Aguardando Pagamento</option>
                                <option value="PAYMENT_REJECTED">Pagamento Rejeitado</option>
                                <option value="PAYMENT_APPROVED">Pagamento Aprovado</option>
                                <option value="AWAITING_PICKUP">Aguardando Retirada</option>
                                <option value="IN_TRANSIT">Em Transporte</option>
                                <option value="DELIVERED">Entregue</option>
                            </select>
                            <button onClick={(() => saveStatusChange())}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}