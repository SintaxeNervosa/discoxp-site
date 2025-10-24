import { useEffect, useState } from "react";
import "./address.scss"
import { apiService } from "../../connection/apiService";

export function Address() {
    const [enderecos, setEnderecos] = useState([]);
    
    useEffect(() => {
        carregarEnderecos();
    }, []);

     const carregarEnderecos = async () => {
        try {
            const response = await apiService.address.getAddresses(sessionStorage.getItem("idUser"));
            setEnderecos(response.data);
        } catch (error) {
            console.error("Erro ao carregar endereços:", error);
        }
    };

       const deletarEndereco = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este endereço?")) {
            try {
                await apiService.address.deleteAddress(id);
                carregarEnderecos(); 
            } catch (error) {
                console.error("Erro ao deletar endereço:", error);
            }
        }
    };

    return (
        <>
            <div className="enderecos">
                <div className="enderecos__header">
                    <h2>Endereços</h2>
                    <button className="add-endereco">+ Adicionar endereço</button>
                </div>

                <div className="enderecos__lista">
                    {enderecos.length === 0 ? (
                    <p>Nenhum endereço cadastrado</p>
                ) : (
                    enderecos.map((endereco) => (
                        <div key={endereco.id} className="endereco-card">
                            <div>
                                <p><strong>{endereco.logradouro}, {endereco.numero}</strong></p>
                                <p>{endereco.complemento && `${endereco.complemento} - `}{endereco.bairro}</p>
                                <p>{endereco.cidade} - {endereco.estado}</p>
                                <p>CEP: {endereco.cep}</p>
                                {endereco.enderecoPadrao && <span>Padrão</span>}
                            </div>
                            <div>
                                <button>Editar</button>
                                <button 
                                    onClick={() => deletarEndereco(endereco.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))
                )}
                </div>
            </div>
        </>
    );
}