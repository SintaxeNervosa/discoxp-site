import { useEffect, useState } from "react";
import "./PaymentForm.scss";
import { HeaderProfile } from "../../components/layout/HeaderProfile";

export function PaymentForm({ setbuttonIsValid, PaymentMethod }) {
    const [paymentMethod, setPaymentMethod] = useState("");

    const [formData, setFormData] = useState({
        nome: "",
        numero: "",
        codigo: "",
        mes: "",
        ano: "",
        parcela: "",
    });

    useEffect(() => {
        setbuttonIsValid(true);
        PaymentMethod(paymentMethod)
    }, [paymentMethod]);

    const allFieldsFilled = () => {
        return (
            formData.nome.trim() !== "" &&
            formData.numero.trim() !== "" &&
            formData.codigo.trim() !== "" &&
            formData.mes.trim() !== "" &&
            formData.mes !== "Mês" &&
            formData.ano.trim() !== "" &&
            formData.ano !== "Ano" &&
            formData.parcela.trim() !== "" &&
            formData.parcela !== "Em quantas parcelas deseja pagar?"
        );
    };

    useEffect(() => {
        if (paymentMethod === "") {
            setbuttonIsValid(false);
            return;
        }
        if (paymentMethod === "pix") {
            setbuttonIsValid(true);
            return;
        }
        if (paymentMethod === "card") {
            setbuttonIsValid(allFieldsFilled());
        }
    }, [paymentMethod, formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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
                            <input
                                type="text"
                                name="nome"
                                placeholder="Ex: João da Silva"
                                value={formData.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field-row">
                            <div className="field">
                                <span>Número do cartão</span>
                                <input
                                    type="text"
                                    name="numero"
                                    maxLength="16"
                                    placeholder="5131 5542 9153 1959"
                                    value={formData.numero}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <span>Código de segurança</span>
                                <input
                                    type="text"
                                    name="codigo"
                                    maxLength="3"
                                    placeholder="***"
                                    value={formData.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field-row">
                            <div className="field">
                                <span>Validade</span>
                                <select name="mes" value={formData.mes} onChange={handleChange}>
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
                                <select name="ano" value={formData.ano} onChange={handleChange}>
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
                            <select
                                name="parcela"
                                value={formData.parcela}
                                onChange={handleChange}
                            >
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
