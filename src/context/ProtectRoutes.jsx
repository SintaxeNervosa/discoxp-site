import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRoutes = ({ children, requiredType }) => {
    const [ok, setOk] = useState(false);
    const navigate = useNavigate();

    // chama a função assim que carregar o componente
    useEffect(() => {
        // captura o user da sessionStorage
        const dataUser = sessionStorage.getItem("user-data");

        // caso não existe, retorna para login
        if (dataUser == null) {
            navigate("/");
            return;
        };

        // converte para json
        const dataUserToJson = JSON.parse(dataUser);
        // captura o group
        const group = dataUserToJson.group;

        // variável para verificar se os tipos são iguais aos requiridos
        let equalTypes = false;

        // faz a verificação
        for (let type of requiredType) {
            if (type == group) {
                equalTypes = true;
            }
        }

        // caso não seja, define como rota nao encontrada
        if (!equalTypes) {
            navigate("/*");
            return;
        };

        if (equalTypes) { setOk(true); }
    });

    return ok ? children : null;
};