import { useParams, useNavigate } from "react-router-dom";
import "./StyleForm.scss";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { changeUser, createUser, getUsersById } from "../../../connection/userPaths.js";

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

            // busca o usuário salvo na LocalStorage
            const userFromLocalStorage = findUserByLocalStorageId();
            // coleta a senha salva e adiciona no input
            setPassword(userFromLocalStorage.password);
            setConfirmPassword(userFromLocalStorage.password);

            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            // retorna para tela de listagem caso haja algum erro ao buscar dados do usuário
            navigate('/users', { replace: true });
        }
    };

    useEffect(() => {
        // caso haja id no parâmetro, carrega os dados do usuário
        if (userid) { fetchDataUser(); }
    }, []);

    // converte os usuários da localStorage em JSON
    function fetchLocalStorageUsers() {
        const users = localStorage.getItem(LOCAL_STORAGE_NAME);
        const usersToJson = JSON.parse(users);
        return usersToJson;
    }

    // busca de usuários por id na localStorage
    const findUserByLocalStorageId = () => {
        // obtêm os usuários da LocalStorage convertidos em JSON
        const users = fetchLocalStorageUsers();

        // obtêm a posição do usuário na lista
        const position = binarySearch(users);

        // caso não encontre, retorna null
        if (position == null) { return null; }

        // caso encontre, retorna o objeto do usuário
        return users[position];
    };

    // busca binária de usuários da LocalStorage
    function binarySearch(users) {
        let low = 0;
        let high = users.length - 1;
        let middle = 0;

        while (low <= high) {
            middle = Math.floor((low + high) / 2);

            if (users[middle].id == userid) {
                return middle;
            }
            if (users[middle].id > userid) {
                high = middle - 1;
            } else {
                low = middle + 1;
            }
        }

        return null;
    }

    // função para criar o adcionar um item na LocalStorage
    function createItemInLocalStorage(id) {
        // busca os usuários da localStorage
        let localStorageItems = fetchLocalStorageUsers();

        if (localStorageItems != null) {
            // adiciona a cópia dos elementos + o novo objeto
            let newItens = [{ ...localStorageItems }, JSON.parse(`{"id": ${id}, "password": "${password}"}`)];

            // salva o novo objeto na LocalStorage
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newItens));
            return;
        }

        // salva o primeiro usuário como string, mas em formato de JSON 
        const userToString = `
            {
             "id": ${id},
             "password": "${password}"
            }`;

        localStorage.setItem(LOCAL_STORAGE_NAME, userToString);
    }

    // função para criar o usuário
    async function requestToCreateUser() {
        try {
            // objeto do usuário a ser enviado na requisição
            const userRequest = { name: name, email: email, group: group, password: password, cpf: cpf };
            const response = await createUser(userRequest);

            // se o usuário for criado 
            if (response.status == 201) {
                // captura o id da resposta da requisição
                const id = response.data.id;
                // função para adicionar o id e password na LocalStorage
                createItemInLocalStorage(id);
                toast.success("Usuário criado com sucesso");
                return;
            }

        } catch (error) {
            // caso dê exceção, exibe os erros
            showAllErrors(error);
        }
    }

    // função para alterar a senha da localStorage
    function changeUserPasswordById() {
        let users = fetchLocalStorageUsers();

        // pega a posição do usuário
        const position = binarySearch(users);

        // atualiza a senha
        users[position].password = password;
        // salva na LocalStorage
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(users));
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
                // busca o usuário da localStorage
                const user = findUserByLocalStorageId();
                
                // verifica se a senha atual (enviada na requisição) é a mesma da localStorage
                if (password != user.password) {
                    // caso não, altera a senha da localStorage
                    changeUserPasswordById(); 
                }

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
                    <input type="email"
                        disabled={disableEmail}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
            </div>
            <button id="confirm" onClick={() => persist()}>Confirmar</button>
        </div>
    );
}