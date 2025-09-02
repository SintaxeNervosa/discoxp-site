import "./StyleForm.css";
import { useState } from "react";

export default function UserForm() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [cpf, setCpf] = useState("");
    const [group, setGrup] = useState("");
    const [password, setPassword] = useState("");
    const [confitmPassword, setConfirmPassword] = useState("");

    return (
        <div className="form-container">
            <h1>Cadastro</h1>
            <div className="content">
                <div className="email">
                    <p>E-mail</p>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="full-name">
                    <p>Nome Completo</p>
                    <input type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="cpf-group">
                    <div className="cpf">
                        <p>CPF</p>
                        <input type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)} />
                    </div>
                    <div className="group">
                        <p>Grupo</p>
                        <select value={group} onChange={(e) => setGrup(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="Client">Cliente</option>
                            <option value="Admin">Administrador</option>
                            <option value="Estockist">Estoquista</option>
                        </select>
                    </div>


                </div>
                <div className="password-confirm-password">
                    <div className="password">
                        <p>Senha</p>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="confirm-password">
                        <p>Confirmar Senha</p>
                        <input type="password"
                            value={confitmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
            </div>
            <button>Confirmar</button>
        </div>
    );
}