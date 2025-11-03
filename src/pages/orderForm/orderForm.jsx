import "./orderForm.scss";
import { HeaderProfile } from "../../components/layout/HeaderProfile";
import { Address } from "../../components/profile/address";
import { useState } from "react";
import { AddAddress } from "../../components/profile/addAddress";
import PaymentForm from "../../components/order/PaymentForm";

function OrderForm() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <HeaderProfile />
            <main className="order">
                <div className="home">
                    <a href="/home">
                        <img
                            src="/img/home.png"
                            alt="back"
                            className="back-icon"
                        />
                    </a>
                </div>

                <div className="address">
                    <Address
                        showForm = {showForm}
                        changeVisibityForm={() => setShowForm(!showForm)}
                        ParentElement={"OrderForm"}
                    />

                    <div className="formAddress">
                        {showForm &&
                            <div>
                                <AddAddress changeVisibityForm={() => setShowForm(!showForm)} 
                                    />
                            </div>
                        }
                    </div>
                        <button className="next">
                            Ir para pagamento
                        </button>
                </div>
                <PaymentForm />
            </main>
        </>

    );
}

export default OrderForm;