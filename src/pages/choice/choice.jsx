import { useNavigate } from "react-router-dom";
import "./choice.css";

function choice() {

    const navigate = useNavigate();


    return (
        <main className="mainzona">
            <header className="cabesao">
                <h1>› Home</h1>
            </header>
            <div className="botoes-juntos">
                <button>Listar Produto</button>
                <button onClick={() => navigate("/users")}>Listar Usuário</button>
            </div>
            <div className="botao-loneny">
                <button>Listar Pedidos</button>
            </div>
        </main>
    );
}

export default choice;