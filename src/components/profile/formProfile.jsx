import { useState, useEffect, use } from "react";
import "./formProfile.scss"
import { getUsersById, changeUser } from "../../connection/userPaths";

export function FormProfile({ onSave }) {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("@Ita75802309")
    
    async function loadUserData() {
        const userId = sessionStorage.getItem("user-data");
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

    const editar = async () => {
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
    
            if(request.status == 204) {
                onSave(true);
            }

            // const json = {
            //     "id": userIdToJson,
            //     "name": "XAROPADA",
            //     "email": "admin@admin.com",
            //     "group": "ADMIN",
            //     "password": "@Ita75802309",
            //     "cpf": "47958777850",
            //     "dateOfBirth": "1998-05-14",
            //     "gender": "MULHER"
            // }

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
                            <input className="dados" value={name} type="text" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="campo">
                            <span>CPF</span>
                            <input disabled className="dados" value={cpf} type="number" onChange={(e) => setCpf(e.target.value)} />
                        </div>
                        <div className="campo">
                            <span>Data de nascimento</span>
                            <input className="dados" value={dateOfBirth} type="date" onChange={(e) => setDateOfBirth(e.target.value)} />
                        </div>
                        <div className="campo">
                            <span>Gênero</span>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">SELECIONAR</option>
                                <option value="HOMEM">HOMEM</option>
                                <option value="MULHER">MULHER</option>
                                <option value="OUTROS">OUTROS</option>
                            </select>
                        </div>
                        <div className="campo">
                            <span>Email</span>
                            <input disabled className="dados" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="campo">
                            <span>Senha</span>
                            <input className="dados" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button onClick={editar}>Salvar alteração</button>
                </div>
            </section>
        </>
    );
}