import "./login.css";

function login() {
  return (
    <div className="container-mae">
      <section className="tudo">
        <header className="cabesa">
          <img src="/img/DISCO_XP__1_-removebg-preview.png" alt="logo" />
          <h1 className="tituloh1">Seja bem-vindo de volta!</h1>
        </header>

        <main className="principal">
          <div className="inputizinho">
            <p>E-mail</p>
            <input className="inputDados" type="email" />
          </div>
          <div className="inputizinho">
            <p>Senha</p>
            <input type="password" className="inputDados"/>
          </div>
          <div className="botao">
            <button>Confirmar</button>
          </div>
        </main>

        <footer className="embaixo">
          <p>
            Não tem cadastro ainda? <a href="#">Clique Aqui!</a>
          </p>

          <p class="copyright">
            © 2023 Disco XP. Todos os direitos reservados.
          </p>
        </footer>
      </section>
    </div>
  );
}

export default login;
