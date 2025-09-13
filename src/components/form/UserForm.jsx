import ApiService from "../../connection/apiService";
import "./StyleForm.scss";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function UserForm({ userId }) {
    const [id, setId] = useState();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [group, setGroup] = useState("");
    const [password, setPassword] = useState("");
    const [confitmPassword, setConfirmPassword] = useState("");


    useEffect(() => {
        if (userId != null) {
            const res = async () => {
                const data = await ApiService.user.getUsersById(userId);

                console.log(data);
                setId(userId);
                setEmail(data.email);
                setName(data.name);
                setCpf(data.cpf);
                setGroup(data.groupEnum);
                setPassword("@Ita75802309");
                setConfirmPassword("@Ita75802309");
            };
            res();
        }
    }, []);


    const persist = async () => {

        if (password == "") {
            toast.error("Informe a senha");
            return;
        }

        if (confitmPassword == "") {
            toast.error("Informe a confimação da senha");
            return;
        }

        if (confitmPassword != password) {
            toast.error("Senhas não coincidem");
            return;
        }


        if (userId == null) {
            let response = await ApiService.user.createUser({ name, email, group, cpf, password });

            console.log(response.status);
            if (response.status == 201) {
                toast.success("Usuário criado com sucesso!");
                return;
            } if (response.status === 400) {
                let erros = response.response.data.message;
                let errosList = erros.split(", ");
                console.log(errosList);

                for (let i = 0; i < errosList.length; i++) {
                    if (errosList[i] != "") {
                        toast.error(errosList[i]);
                    }

                }

            }

            toast.success("Usuário criado com sucesso!");
        } else {

            let response = await ApiService.user.changeUser({ id, name, group, cpf, password });
            console.log(response);

            if (response.status == 201) {
                toast.success("Alterado com sucesso");
            }
        }


    };

    return (
        <div className="form-container">
            <ToastContainer />
            <h1>{id != null ? "Editar" : "Cadastro"}</h1>
            <div className="content">
                <div className="email">
                    <p>E-mail</p>
                    <input type="email"
                        disabled={id != null ? true : false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="full-name">
                    <p>Nome Completo</p>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
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
                        <select value={group} onChange={(e) => setGroup(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="ADMIN">Administrador</option>
                            <option value="STOCKIST">Estoquista</option>
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
            <button id="confirm" onClick={() => persist()}>Confirmar</button>
        </div>
    );
}