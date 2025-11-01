import "./orderForm.scss";
import { HeaderProfile } from "../../components/layout/HeaderProfile";
import { Address } from "../../components/profile/address";
import { useState } from "react";

function OrderForm() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <HeaderProfile />
            <main className="order">
                <div className="home">
                    <a href="/home">
                        <img src="/img/home.png" alt="back" className="back-icon" />
                    </a>
                </div>

                <div className="address">
                    <Address changeVisibityForm={() => setShowForm(!showForm)} ParentElement={"OrderForm"}/>
                    
                    <div className="formAddress">
                        {showForm &&
                        <div>
                            <h1>OLA MUNDO</h1>
                        </div>
                    }
                    </div>
                </div>




            </main>
        </>

    );
}

export default OrderForm;