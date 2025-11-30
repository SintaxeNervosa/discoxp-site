import "./OrderForm.scss";
import { HeaderProfile } from "../../../components/layout/HeaderProfile";
import { Address } from "../../../components/client/profile/addressList/AddressList";
import { useEffect, useState } from "react";
import { FormAddress } from "../../../components/client/profile/formAddress/FormAddress";
import PaymentForm from "../../../components/client/order/payment/PaymentForm";
import Summary from "../../../components/client/order/sumary/Summary";

function OrderForm() {
    const [showForm, setShowForm] = useState(false);
    const [buttonIsValid, setbuttonIsValid] = useState(false);
    const [selectAddress, setSelectAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect(() => {
        sessionStorage.removeItem("redirectOrder")
    }, [])

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
                            onAddAddress={setSelectAddress}
                        />

                        <div className="formAddress">
                            {showForm &&
                                <div>
                                    <FormAddress changeVisibityForm={() => setShowForm(!showForm)} />
                                </div>
                            }
                        </div>
                        <button className="next">
                            Ir para pagamento
                        </button>
                    </div>
                    <PaymentForm
                        setbuttonIsValid={setbuttonIsValid}
                        PaymentMethod={setPaymentMethod}
                    />
                </section>
                <Summary buttonIsValid={buttonIsValid}
                    selectedAddress={selectAddress}
                    paymentMethod={paymentMethod} />
            </main>
        </>

    );
}

export default OrderForm;