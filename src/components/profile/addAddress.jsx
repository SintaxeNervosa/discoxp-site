import { useEffect, useState } from "react";
import "./addAddress.scss"

export function AddAddress({ onBack }) {
    const [form, setForm] = useState({
        cep: "",
        numero: "",
        complemento: "",
        endereco: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === "cep" && value.length === 9) {
            setForm({
                ...form,
                cep: value,
                endereco: "Av. Eng. Eusébio Stevaux\nSanto Amaro – São Paulo – SP",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Endereço adicionado:", form);
        onBack();
    };

    return (
        <>
            <div className="add-endereco-container">
                <h2>Adicionar endereço</h2>

                <form className="endereco-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>CEP</label>
                            <input
                                type="text"
                                name="cep"
                                value={form.cep}
                                onChange={handleChange}
                                placeholder="00000-000"
                            />
                        </div>

                        <div className="form-group">
                            <label>&nbsp;</label>
                            <textarea
                                name="endereco"
                                value={form.endereco}
                                onChange={handleChange}
                                placeholder="Endereço completo"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Número</label>
                            <input
                                type="text"
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                                placeholder="Ex: 123"
                            />
                        </div>

                        <div className="form-group">
                            <label>Complemento</label>
                            <input
                                type="text"
                                name="complemento"
                                value={form.complemento}
                                onChange={handleChange}
                                placeholder="Apto, bloco, etc."
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-adicionar">
                        Adicionar endereço
                    </button>
                </form>
            </div>
        </>
    );

}