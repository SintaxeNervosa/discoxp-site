import "./containerProfile.scss"

export function ContainerProfile({ onSelect }) {

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
                    <button onClick={""}>
                        <strong>Sair</strong><br /> Deslogar da conta e encerrar sessão
                    </button>
                </div>
            </section>
        </>
    );
}
