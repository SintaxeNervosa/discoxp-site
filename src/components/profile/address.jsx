import { useEffect, useState } from "react";
import "./address.scss"

export function Address() {
    const enderecos = [
        {
            id: 1,
            rua: "Rua Rio Jacutinga 18",
            bairro: "Jardim Marilda – São Paulo – SP",
            cep: "04857-250",
        },
        {
            id: 2,
            rua: "Av. Eng. Eusébio Stevaux 823",
            bairro: "Santo Amaro – São Paulo – SP",
            cep: "04696-000",
        },
        
    ];

    return (
        <>
            <div className="enderecos">
                <div className="enderecos__header">
                    <h2>Endereços</h2>
                    <button className="add-endereco">+ Adicionar endereço</button>
                </div>

                <div className="enderecos__lista">
                    {enderecos.map((endereco) => (
                        <div key={endereco.id} className="endereco-card">
                            <p>{endereco.rua}</p>
                            <p>{endereco.bairro}</p>
                            <p>{endereco.cep}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}