import { useState, useEffect, use } from "react";
import "./FormProfile.scss"
import { getUsersById, changeUser } from "../../../../connection/userPaths";

export function FormProfile({ onSave }) {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("@Ita75802309")
    const [errors, setErrors] = useState({});

    async function loadUserData() {
        const userId = sessionStorage.getItem("user-data");
        const userIdToJson = JSON.parse(userId);
        const response = await getUsersById(userIdToJson.id);

        setName(response.name);
        console.log(response.cpf);
        setCpf(response.cpf);
        setDateOfBirth(response.dateOfBirth);
        setGender(response.gender);
        setEmail(response.email);
    }

    useEffect(() => {
        loadUserData();
    }, []);

    function validarCampos() {
        const newErrors = {};

        const partesNome = name.trim().split(" ").filter(Boolean);
        if (partesNome.length < 2) {
            newErrors.name = "Digite seu nome completo.";
        } else if (partesNome.some((parte) => parte.length < 3)) {
            newErrors.name = "Nome invalido!";
        }

        const hoje = new Date();
        const dataNasc = new Date(dateOfBirth);
        const limiteAntigo = new Date();
        limiteAntigo.setFullYear(hoje.getFullYear() - 120);

        if (!dateOfBirth) {
            newErrors.dateOfBirth = "Informe sua data de nascimento.";
        } else if (dataNasc > hoje) {
            newErrors.dateOfBirth = "A data invalida!";
        } else if (dataNasc < limiteAntigo) {
            newErrors.dateOfBirth = "A data invalida!";
        }

        if (!gender) {
            newErrors.gender = "Selecione um gênero.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const editar = async () => {
        if (!validarCampos()) return;

        try {
            const userId = sessionStorage.getItem("user-data");
            const userIdToJson = JSON.parse(userId);

            const response = await getUsersById(userIdToJson.id);

            console.log(response);

            const obj = {
                id: userIdToJson.id,
                name: name,
                email: email,
                group: "CLIENT",
                password: password,
                cpf: cpf,
                dateOfBirth: dateOfBirth,
                gender: gender
            }

            const request = await changeUser(obj);

            if (request.status == 204) {
                onSave(true);
            }

        } catch (errro) {
            console.log(errro);
        }
    }

    return (
        <>
            <section className="content">
                <div className="info">
                    <h2>Meus Dados</h2>
                    <div className="dados-usuario">
                        <div className="campo">
                            <span>Nome completo</span>
                            <input
                                className="dados"
                                value={name} type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="erro">{errors.name}</p>}
                        </div>
                        <div className="campo">
                            <span>CPF</span>
                            <input
                                disabled
                                className="dados" 
                                value={cpf} type="number"
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </div>
                        <div className="campo">
                            <span>Data de nascimento</span>
                            <input className="dados"
                                value={dateOfBirth}
                                type="date"
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            {errors.dateOfBirth && <p className="erro">{errors.dateOfBirth}</p>}
                        </div>
                        <div className="campo">
                            <span>Gênero</span>
                            <select className="dados"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}>
                                <option value="">SELECIONAR</option>
                                <option value="HOMEM">HOMEM</option>
                                <option value="MULHER">MULHER</option>
                                <option value="OUTRO">OUTRO</option>
                            </select>
                            {errors.gender && <p className="erro">{errors.gender}</p>}
                        </div>
                        <div className="campo">
                            <span>Email</span>
                            <input
                                disabled
                                className="dados"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="campo">
                            <span>Senha</span>
                            <input className="dados"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={editar}>Salvar alteração</button>
                </div>
            </section>
        </>
    );
}