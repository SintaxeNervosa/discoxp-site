import "./formProfile.scss"

export function FormProfile({onSave}) {

    return (
        <>
            <section className="content">
                <div className="info">
                    <h2>Meus Dados</h2>
                    <div className="dados-usuario">
                        <div className="campo">
                            <span>Nome completo</span>
                            <input className="dados" type="text" />
                        </div>
                        <div className="campo">
                            <span>CPF</span>
                            <input className="dados" type="number" />
                        </div>
                        <div className="campo">
                            <span>Data de nascimento</span>
                            <input className="dados" type="date" />
                        </div>
                        <div className="campo">
                            <span>Gênero</span>
                            <input className="dados" type="text" />
                        </div>
                        <div className="campo">
                            <span>Email</span>
                            <input className="dados" type="email" />
                        </div>
                        <div className="campo">
                            <span>Senha</span>
                            <input className="dados" type="text" />
                        </div>
                    </div>
                    <button onClick={onSave}>Salvar alteração</button>
                </div>
            </section>
        </>
    );
}