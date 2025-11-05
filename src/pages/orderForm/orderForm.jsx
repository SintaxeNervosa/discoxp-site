import "./orderForm.scss";
import { HeaderProfile } from "../../components/layout/HeaderProfile";
import { Address } from "../../components/profile/address";
import { useEffect, useState } from "react";
import { AddAddress } from "../../components/profile/addAddress";
import PaymentForm from "../../components/order/PaymentForm";
import Summary from "../../components/order/sumary/summary";

function OrderForm() {
    const [showForm, setShowForm] = useState(false);
    const [buttonIsValid, setbuttonIsValid] = useState(false);

    return (
        <>
            <HeaderProfile />
            <main className="order">
                <section>
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
                            showForm={showForm}
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
                    <PaymentForm setbuttonIsValid={setbuttonIsValid} />
                </section>
                <Summary buttonIsValid={buttonIsValid}/>
            </main>
        </>

    );
}

export default OrderForm;