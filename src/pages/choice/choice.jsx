import { useNavigate } from "react-router-dom";
import "./choice.scss";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function choice() {
    const [button, setButton] = useState("");
    const navigate = useNavigate();

    const carregarButton = () => {
        const usertype = carregarUser();
        let componente;
        if (!usertype) {
            toast.error("Ocorreu um erro inesperado");
            setTimeout(() => {
                navigate("/login");
            }, [1000]);
        } else if (usertype == "ADMIN") {
            componente =
                <>
                    <button>Listar Produto</button>
                    <button onClick={() => navigate("/admin/users")}>Listar Usuário</button>
                </>;
        } else if (usertype == "STOCKIST") {
            componente =
                <button>Listar Produto</button>
        } else{
            toast.error("Ocorreu um erro inesperado");
            setTimeout(() => {
                navigate("/login");
            }, [1000]);
        }
        setButton(componente);
    };

    const carregarUser = () => {
        const dataUser = sessionStorage.getItem("user-data");
        const dataUserToJson = JSON.parse(dataUser);
        return dataUserToJson.group;
    };

    useEffect(()=> {
        carregarButton();
    },[]);

    return (

        <main className="mainzona">
            <ToastContainer/>
            <header className="cabesao">
                <h1>›Home</h1>
            </header>
            <div className="botoes-juntos">
                {button}
            </div>

            {/* <div className="botao-loneny">
                <button>Listar Pedidos</button>
            </div> */}
        </main>
    );
}

export default choice;