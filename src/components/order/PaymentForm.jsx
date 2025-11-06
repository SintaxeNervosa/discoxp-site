import { useEffect, useState } from "react";
import "./PaymentForm.scss";
import { HeaderProfile } from "../../components/layout/HeaderProfile";

export function PaymentForm({ setbuttonIsValid, PaymentMethod}) {
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        if (paymentMethod == "") { return }

        setbuttonIsValid(true);
        PaymentMethod(paymentMethod)
    }, [paymentMethod]);

    return (
        <>
            <HeaderProfile />

            <section className="payment-container">
                <h2>Pagamento</h2>

                <div className="payment-options">
                    <label className="option">
                        <input
                            type="radio"
                            name="payment"
                            value="pix"
                            checked={paymentMethod === "pix"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="checkmark"></span>
                        Pix
                    </label>

                    <label className="option">
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="checkmark"></span>
                        Cartão de crédito
                    </label>
                </div>

                {paymentMethod === "pix" && (
                    <div className="pix-area">
                        <img src="/img/Pix.png" alt="Pix QR Code" />
                    </div>
                )}

                {paymentMethod === "card" && (
                    <div className="card-form">
                        <div className="field">
                            <span>Nome imprimido no cartão</span>
                            <input type="text" placeholder="Ex: João da Silva" />
                        </div>

                        <div className="field-row">
                            <div className="field">
                                <span>Número do cartão</span>
                                <input type="number" placeholder="5131 5542 9153 1959" />
                            </div>

                            <div className="field">
                                <span>Código de segurança</span>
                                <input type="number" placeholder="***" />
                            </div>
                        </div>

                        <div className="field-row">
                            <div className="field">
                                <span>Validade</span>
                                <select>
                                    <option>Mês</option>
                                    <option>Janeiro</option>
                                    <option>Fevereiro</option>
                                    <option>Março</option>
                                    <option>Abril</option>
                                    <option>Maio</option>
                                    <option>Junho</option>
                                    <option>Julho</option>
                                    <option>Agosto</option>
                                    <option>Setembro</option>
                                    <option>Outubro</option>
                                    <option>Novembro</option>
                                    <option>Dezembro</option>
                                </select>
                            </div>

                            <div className="field">
                                <span>&nbsp;</span>
                                <select>
                                    <option>Ano</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>
                                    <option>2031</option>
                                    <option>2032</option>
                                    <option>2033</option>
                                    <option>2034</option>
                                    <option>2035</option>
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <span>Número de parcelas</span>
                            <select>
                                <option>Em quantas parcelas deseja pagar?</option>
                                <option>Pagamento à vista</option>
                                <option>2x sem juros</option>
                                <option>3x sem juros</option>
                                <option>4x sem juros</option>
                                <option>5x sem juros</option>
                                <option>6x sem juros</option>
                                <option>7x sem juros</option>
                                <option>8x sem juros</option>
                            </select>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

export default PaymentForm;
