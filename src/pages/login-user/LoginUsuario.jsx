import { useLogin } from "../../components/hooks/useLogin";
import {ToastContainer } from "react-toastify";

export default function LoginUsuario() {
      const {
        email,
        setEmail,
        senha,
        setSenha,
        Loginzao
      } = useLogin()

    return(
        <div>Login Usuario</div>
    )
}