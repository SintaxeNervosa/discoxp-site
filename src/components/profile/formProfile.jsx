import { useState, useEffect } from "react";
import "./formProfile.scss"
import { getUsersById } from "../../connection/userPaths";

export function FormProfile({ onSave }) {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    async function loadUserData() {
        const userId = sessionStorage.getItem("user-data");
        const userIdToJson = JSON.parse(userId);
        const response = await getUsersById(userIdToJson.id);
        
        setName(response.name);
        setCpf(response.cpf);
        setDateOfBirth(response.dateOfBirth);
        setGender(response.gender);
        setEmail(response.email);
        setPassword(response.password);
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <>
            <section className="content">
                <div className="info">
                    <h2>Meus Dados</h2>
                    <div className="dados-usuario">
                        <div className="campo">
                            <span>Nome completo</span>
                            <input className="dados" value={name} type="text" />
                        </div>
                        <div className="campo">
                            <span>CPF</span>
                            <input className="dados" value={cpf} type="number" />
                        </div>
                        <div className="campo">
                            <span>Data de nascimento</span>
                            <input className="dados" value={dateOfBirth} type="date" />
                        </div>
                        <div className="campo">
                            <span>Gênero</span>
                            <input className="dados" value={gender} type="text" />
                        </div>
                        <div className="campo">
                            <span>Email</span>
                            <input className="dados" value={email} type="email" />
                        </div>
                        <div className="campo">
                            <span>Senha</span>
                            <input className="dados" value={password} type="password" />
                        </div>
                    </div>
                    <button onClick={onSave}>Salvar alteração</button>
                </div>
            </section>
        </>
    );
}