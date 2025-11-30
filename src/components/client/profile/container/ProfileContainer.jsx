import { useNavigate } from "react-router-dom";
import "./ProfileContainer.scss"

export function ContainerProfile({ onSelect }) {

    const navigate = useNavigate();

    const logOut = () => {
        navigate('/login');
        sessionStorage.setItem('user-data', null);
    } 

    return (
        <>
            <section className="sidebar">
                <div className="sidebar-item">
                    <button onClick={() => onSelect("cadastro")}>
                        <strong>Cadastro</strong><br /> Ver e alterar seus dados
                    </button>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => onSelect("enderecos")}>
                        <strong>Endereços</strong><br /> Ver e alterar seus endereços
                    </button>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => onSelect("pedidos")}>
                        <strong>Pedidos</strong><br /> Acompanhar meus pedidos
                    </button>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => logOut()}>
                        <strong>Sair</strong><br /> Deslogar da conta e encerrar sessão
                    </button>
                </div>
            </section>
        </>
    );
}
