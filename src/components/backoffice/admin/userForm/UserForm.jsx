import { useParams, useNavigate } from "react-router-dom";
import "./UserStyleForm.scss";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { changeUser, createUser, getUsersById } from "../../../../connection/userPaths.js";

export default function UserForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [group, setGroup] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const LOCAL_STORAGE_NAME = "userPassword";
    const { userid } = useParams();
    const navigate = useNavigate();

    const titleForm = userid ? "Editar" : "Cadastro";
    const disableEmail = userid ? true : false;

    // função para buscar dados do usuário
    async function fetchDataUser() {
        try {
            // busca os dados do id do parâmetro
            const data = await getUsersById(userid);

            setEmail(data.email);
            setName(data.name);
            setCpf(data.cpf);
            setGroup(data.groupEnum);

        } catch (err) {
            // retorna para tela de listagem caso haja algum erro ao buscar dados do usuário
            console.log(err)
            navigate('/admin/users', { replace: true });
        }
    };

    useEffect(() => {
        // caso haja id no parâmetro, carrega os dados do usuário
        if (userid) { fetchDataUser(); }
    }, []);

    // função para criar o usuário
    async function requestToCreateUser() {
        try {
            // objeto do usuário a ser enviado na requisição
            const userRequest = { name: name, email: email, group: group, password: password, cpf: cpf };
            const response = await createUser(userRequest);

            // se o usuário for criado 
            if (response.status == 201) {
                toast.success("Usuário criado com sucesso");
                return;
            }

        } catch (error) {
            // caso dê exceção, exibe os erros
            showAllErrors(error);
        }
    }

    // função para editar usuário
    async function requestToEditUser() {
        // monta o objeto para a requisição
        const userRequest = { id: userid, name: name, group: group, cpf: cpf, password: password };
        try {
            // faz a requisição
            const response = await changeUser(userRequest);

            // caso a requisição dê "ok"
            if (response.status == 201) {
                toast.success("Usuário alterado com sucesso.");
            };

        } catch (error) {
            // caso dê exceção, exibe os erros
            showAllErrors(error);
        }
    };

    // função utilizada para exibir todos os erros
    const showAllErrors = (error) => {
        // separa todos os erros pelo delimitador ", "
        const erroMessages = error.split(", ");

        // caso a senha sejam diferentes, adiciona o erro à lista
        if (password != confirmPassword) {
            erroMessages.push("Senhas não coincidem");
        }

        // exibe todos os erros
        for (let err of erroMessages) {
            if (err != "" && err != ", ") {
                toast.error(err);
            }
        }
    };

    // função utilizada para persistência (editar/cadastro)
    const persist = async () => {
        // chama o edit caso haja id no parâmetro
        if (userid) {
            await requestToEditUser();
            return;
        }

        // senão, chama a função para criar 
        await requestToCreateUser();
    };

    return (
        <div className="form-container">
            <ToastContainer />
            <h1>{titleForm}</h1>
            <div className="content">
                <div className="email">
                    <p>E-mail</p>
                    <input id="email" type="email"
                        disabled={disableEmail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="full-name">
                    <p>Nome Completo</p>
                    <input id="name" type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="cpf-group">
                    <div className="cpf">
                        <p>CPF</p>
                        <input id="cpf" type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)} />
                    </div>
                    <div className="group">
                        <p>Grupo</p>
                        <select id="group" value={group} onChange={(e) => setGroup(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="ADMIN">Administrador</option>
                            <option value="STOCKIST">Estoquista</option>
                        </select>
                    </div>

                </div>
                <div className="password-confirm-password">
                    <div className="password">
                        <p>Senha</p>
                        <input id="password" type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="confirm-password">
                        <p>Confirmar Senha</p>
                        <input id="confirmPassword" type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
            </div>
            <button id="confirm" onClick={() => persist()}>Confirmar</button>
        </div>
    );
}