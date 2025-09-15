import { useParams, useNavigate } from "react-router-dom";
import "./StyleForm.scss";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { changeUser, createUser, getUsersById } from "../../connection/userPaths";

export default function UserForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [group, setGroup] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userid } = useParams();
    const navigate = useNavigate();

    const titleForm = userid ? "Editar" : "Cadastro";
    const disableEmail = userid ? true : false;

    async function fetchDataUser() {
        try {
            const data = await getUsersById(userid);

            setEmail(data.email);
            setName(data.name);
            setCpf(data.cpf);
            setGroup(data.groupEnum);

            const userFromLocalStorage = findUserByLocalStorageId();
            setPassword(userFromLocalStorage.password);
            setConfirmPassword(userFromLocalStorage.password);

        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            navigate('/users', { replace: true });
        }
    };

    useEffect(() => {
        if (userid) { fetchDataUser(); }
    }, []);

    function parseUsersToJson() {
        const users = localStorage.getItem("userPassword");
        const usersToJson = JSON.parse(users);
        return usersToJson;
    }

    const findUserByLocalStorageId = () => {
        const users = parseUsersToJson();

        const position = binarySearch(users);
    
        if (position == null) { return null; }

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
        let optionalPassword = localStorage.getItem("userPassword");

        if (optionalPassword != null) {
            let itens = JSON.parse(optionalPassword);
            let newItens = [{ ...itens }, JSON.parse(`{"id": ${id}, "password": "${password}"}`)];

            localStorage.setItem("userPassword", JSON.stringify(newItens));
            return;
        }

        const userToString = `
            {
             "id": ${id},
             "password": "${password}"
            }`;

        localStorage.setItem("userPassword", userToString);
    }

    // função para criar o usuário
    async function requestToCreateUser() {
        try {
            // objeto do usuário a ser enviado na requisição
            const userRequest = { name: name, email: email, group: group, password: password, cpf: cpf };
            const response = await createUser(userRequest);

            // se o usuário for criado 
            if (response.status == 201) {
                const id = response.data.id;
                // adiciona o id e password na LocalStorage
                createItemInLocalStorage(id);
                return;
            }

        } catch (error) {
            showAllErrors(error);
        }
    }

    function changeUserPasswordById() {
        let users = JSON.parse(localStorage.getItem("userPassword"));

        // pega a posição do usuário
        const position = binarySearch(users);

        // atualiza a senha
        users[position].password = password;
        // salva na LocalStorage
        localStorage.setItem("userPassword", JSON.stringify(users));
    }

    async function requestToEditUser() {
        const userRequest = { id: userid, name: name, group: group, cpf: cpf, password: password };
        try {
            const response = await changeUser(userRequest);

            if (response.status == 201) {
                const user = findUserByLocalStorageId();
                if (password != user.password) {
                    changeUserPasswordById(); // altera a senha da localStorage
                }

                toast.success("Usuário alterado com sucesso.");
            };

        } catch (error) {
-            showAllErrors(error);
        }

    };

    const showAllErrors = (error) => {
        // separa todos os erros pelo delimitador ", "
        const erroMessages = error.split(", ");

        // caso a senha sejam diferentes, adiciona o erro
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

    const persist = async () => {
        if (userid) {
            await requestToEditUser();
            return;
        }

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