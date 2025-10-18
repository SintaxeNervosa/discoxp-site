import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from 'react';
import ApiService from '../../connection/apiService';

export function useLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function Loginzao(e) {
        if (e) e.preventDefault();

        try {
            const response = await ApiService.user.loginUser(email, senha);//

            if (response.status === 200 && response) {
                toast.success("Login bem-sucedido!");

                const data = response.data;
                //salva no session storage
                const dataToString = JSON.stringify(data);
                sessionStorage.setItem("user-data", dataToString);

                const userJs = JSON.parse(dataToString);
                const userGroup = userJs.group;

                //se for admin ou stockist choice senão home
                setTimeout(() => {
                    if (userGroup === "ADMIN" || userGroup === "STOCKIST") {
                         console.log("Redirecionando para /choice");
                        navigate("/choice");
                    } else{
                        console.log("Redirecionando para /home");
                        navigate("/home");
                    }
                }, 1500)
            }else{
                throw new Error("Erro ao fazer login");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Erro ao fazer login";
            toast.error(errorMessage);
        }

    }

    return{
        email,
        setEmail,
        senha,
        setSenha,
        Loginzao
    }
}