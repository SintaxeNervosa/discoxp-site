import "./login.scss";
import { useLogin } from "../../components/hooks/useLogin";
import {ToastContainer } from "react-toastify";

function login() {
  const {
    email,
    setEmail,
    senha,
    setSenha,
    Loginzao
  } = useLogin()

  return (
    <div className="container-mae">
      <ToastContainer />
      <section className="tudo">
        <header className="cabesa">
          <img src="/img/DISCO_XP__1_-removebg-preview.png" alt="logo" />
          <h1 className="tituloh1">Seja bem-vindo de volta!</h1>
        </header>

        <form onSubmit={Loginzao} className="principal">
          <div className="inputizinho">
            <p>E-mail</p>
            <input
              id="email"
              className="inputDados"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="inputizinho">
            <p>Senha</p>
            <input
              id="password"
              type="password"
              className="inputDados"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              
              placeholder="Digite sua senha"
            />
          </div>

          <div className="botao"> 
            <button id="btnLogin" type="submit">Confirmar</button>
              </div>

        </form>

        <footer className="embaixo">

          <p className="copyright">
            © 2023 Disco XP. Todos os direitos reservados.
          </p>
        </footer>
      </section>
    </div>
  );
}

export default login;
