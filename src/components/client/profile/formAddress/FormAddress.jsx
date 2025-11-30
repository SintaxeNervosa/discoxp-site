import { useEffect, useState } from "react";
import { addAddress } from "../../../../connection/AddressPath.js";

import "./FormAddress.scss"
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export function FormAddress({ onBack, changeVisibityForm }) {
    const [form, setForm] = useState({
        cep: "",
        numero: "",
        complemento: "",
        endereco: "",
    });

    const [validFields, setValidFields] = useState(false);

    const userFromSession = sessionStorage.getItem("user-data");

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

    const fyndCep = async () => {
        const response = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);

        if (!response.data.erro) {
            setForm({
                ...form,
                endereco: `${response.data.logradouro}, ${response.data.bairro} - ${response.data.uf}`,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userToJson = JSON.parse(userFromSession);

        const obj = {
            id: userToJson.id,
            cep: form.cep,
            number: form.numero,
            complement: form.complemento
        }

        const response = await addAddress(obj);

        if (response.status = 201) {

            toast.success("Endereço cadastrado com sucesso");

            changeVisibityForm();

            setTimeout(() => {
                onBack();
            }, [2000]);

            return;
        }

        toast.error("Ocorreu um erro");
    };

    function verifyForm() {
        return form.numero != "" && form.endereco != ""; 
    }

    useEffect(() => {
        setValidFields(verifyForm());
    }, [form.endereco, form.numero]);

    useEffect(() => {
        setForm({
                ...form,
                endereco: ""
            });
        if (form.cep.length >= 8) {
            fyndCep();
        }
    }, [form.cep]);

    return (
        <>
            <div className="add-endereco-container">
                <h2>Adicionar endereço</h2>
                <form className="endereco-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <ToastContainer
                            position="top-center"
                        />
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
                                disabled
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

                    <button disabled={!validFields} type="submit" className="btn-adicionar">
                        Adicionar endereço
                    </button>
                </form>
            </div>
        </>
    );

}