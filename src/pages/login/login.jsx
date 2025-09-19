import "./login.scss";
import ApiService from "../../connection/apiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function Loginzao(e) {
    e.preventDefault();
    try {
      const response = await ApiService.user.loginUser(1);//id 1 para 
    } catch (error) {
      
    }
  }


  return (
    <div className="container-mae">
      <section className="tudo">
        <header className="cabesa">
          <img src="/img/DISCO_XP__1_-removebg-preview.png" alt="logo" />
          <h1 className="tituloh1">Seja bem-vindo de volta!</h1>
        </header>

        <form onSubmit={Loginzao} className="principal">
          <div className="inputizinho">
            <p>E-mail</p>
            <input
              className="inputDados"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="inputizinho">
            <p>Senha</p>
            <input
              type="password"
              className="inputDados"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>

          {erro && <div className="mensagem-erro">{erro}</div>}

          <div className="botao">
            <button type="submit">Confirmar</button>
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
