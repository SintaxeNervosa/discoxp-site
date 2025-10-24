import { useEffect, useState } from "react";
import "./addAddress.scss"
import { apiService } from "../../connection/apiService";

export function AddAddress() {
    const [form, setForm] = useState({
        cep: "",
        numero: "",
        complemento: "",     
        bairro: "",
        cidade: "",
        estado: "",
        logradouro: "",
        enderecoPadrao: false
    });

    const handleChange = (e) => {
 const { name, value, type, checked } = e.target;
        setForm({ 
            ...form, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const bucarCEP = async (cep) => {
        if (cep.lengh === 9){
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
                const respData = await response.json()

                if (!respData.erro) {
                    setForm(prev => ({
                        ...prev,
                        logradouro: `${respData.logradouro}`,
                        bairro: `${respData.bairro}`,
                        cidade: `${respData.localidade}`,
                        estado: `${respData.uf}`
                    }))
                }

            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await apiService.address.createAddress(form);
            alert("Endereço adicionado!");
            setForm({
        cep: "",
        numero: "",
        complemento: "",     
        bairro: "",
        cidade: "",
        estado: "",
        logradouro: "",
        enderecoPadrao: false
            });
        } catch (error) {
                        console.error("Erro ao adicionar endereço:", error);

        }
        console.log("Endereço adicionado:", form);
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
                            onChange={(e) => {
                                handleChange(e);
                                buscarCEP(e.target.value);
                            }}
                            placeholder="00000-000"
                            maxLength="9"
                            required
                        />
                        </div>

                        <div className="form-group">
                            <label>&nbsp;</label>
                            <textarea
                                name="endereco"
                                value={form.logradouro}
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
                            required
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

                      <div className="form-row">
                    <div className="form-group">
                        <label>Bairro</label>
                        <input
                            type="text"
                            name="bairro"
                            value={form.bairro}
                            onChange={handleChange}
                            placeholder="Bairro"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cidade</label>
                        <input
                            type="text"
                            name="cidade"
                            value={form.cidade}
                            onChange={handleChange}
                            placeholder="Cidade"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Estado</label>
                        <input
                            type="text"
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            placeholder="UF"
                            maxLength="2"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="enderecoPadrao"
                                checked={form.enderecoPadrao}
                                onChange={handleChange}
                            />
                            Definir como endereço padrão
                        </label>
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