import { useEffect, useState } from "react";
import "./infoProfile.scss"
import { getUsersById } from "../../connection/userPaths";

export function InfoProfile() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    async function loadUserData() {
        const userId = sessionStorage.getItem("userId");

        const userIdToJson = JSON.parse(userId);
        const response = await getUsersById(userIdToJson.id);

        setName(response.name);
        setCpf(response.cpf);
        setDateOfBirth(response.dateOfBirth);
        setGender(response.gender);
        setEmail(response.email);
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <>
            <section className="dados">
                <div className="info">
                    <h2>Meus Dados</h2>
                    <div className="dados-usuario">
                        <div className="campo">
                            <span>Nome completo</span>
                            <p>{name}</p>
                        </div>
                        <div className="campo">
                            <span>CPF</span>
                            <p>{cpf}</p>
                        </div>
                        <div className="campo">
                            <span>Data de nascimento</span>
                            {dateOfBirth}
                        </div>
                        <div className="campo">
                            <span>Gênero</span>
                            <select value={gender}>
                                <option value="Selecionar">SELECIONAR</option>
                                <option value="HOMEM">HOMEM</option>
                                <option value="MULHER">MULHER</option>
                                <option value="OUTRO">OUTRO</option>
                            </select>
                        </div>
                        <div className="campo">
                            <span>Email</span>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}