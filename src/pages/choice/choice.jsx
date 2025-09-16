import { useNavigate } from "react-router-dom";
import "./choice.scss";

function choice() {

    const navigate = useNavigate();

    const user = localStorage.getItem("user-type");

    // @louiemoreira76 finalizar
    const component = user == 1 ?
        <div className="botoes-juntos">
            <button>Listar Produto</button>
            <button onClick={() => navigate("/admin/users")}>Listar Usuário</button>
        </div>
        : <div className="botao-loneny">
            <button>Listar Pedidos</button>
        </div>;

    return (
        <main className="mainzona">

            <header className="cabesao">
                <h1>›Home</h1>
            </header>
            {component}
        </main>
    );
}

export default choice;