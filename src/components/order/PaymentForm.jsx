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

const [errors, setErrors] = useState({});

useEffect(() => {
    if (paymentMethod === "pix") {
        setbuttonIsValid(true);
    } else if (paymentMethod === "card") {
        const allValid = validateFields(false);
        setbuttonIsValid(allValid);
    } else {
        setbuttonIsValid(false);
    }
}, [paymentMethod, formData]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const validateFields = (showErrors = true) => {
    let newErrors = {};

    if (!formData.nome.trim()) {
        newErrors.nome = "Nome invalido.";
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.nome)) {
        newErrors.nome = "Nome invalido.";
    } else if (formData.nome.trim().length < 3) {
        newErrors.nome = "Nome invalido.";
    }

    if (!formData.numero.trim()) {
        newErrors.numero = "O número do cartão é obrigatório.";
    } else if (!/^\d+$/.test(formData.numero)) {
        newErrors.numero = "Número do cartão invalido.";
    } else if (formData.numero.length !== 16) {
        newErrors.numero = "Número do cartão invalido.";
    }

    if (!formData.codigo.trim()) {
        newErrors.codigo = "O código de segurança é obrigatório.";
    } else if (!/^\d+$/.test(formData.codigo)) {
        newErrors.codigo = "Código invalido.";
    } else if (formData.codigo.length !== 3) {
        newErrors.codigo = "Código invalido.";
    }

    if (!formData.mes || formData.mes === "Mês") {
        newErrors.mes = "Selecione o mês de validade.";
    }
    if (!formData.ano || formData.ano === "Ano") {
        newErrors.ano = "Selecione o ano de validade.";
    }

    if (!formData.parcela || formData.parcela === "Em quantas parcelas deseja pagar?") {
        newErrors.parcela = "Selecione a quantidade de parcelas.";
    }

    if (showErrors) setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
        alert("Pagamento processado com sucesso!");
        setbuttonIsValid(true);
    } else {
        setbuttonIsValid(false);
    }
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
                        {errors.nome && <p className="error">{errors.nome}</p>}
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
                            {errors.numero && <p className="error">{errors.numero}</p>}
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
                            {errors.codigo && <p className="error">{errors.codigo}</p>}
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
                            {errors.mes && <p className="error">{errors.mes}</p>}
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
                            {errors.ano && <p className="error">{errors.ano}</p>}
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
                        {errors.parcela && <p className="error">{errors.parcela}</p>}
                    </div>
                </div>
            )}
        </section>
    </>
);
}

export default PaymentForm;
