import "./infoProfile.scss"

export function InfoProfile() {

    return (
        <>
            <section className="dados">
                <div className="info">
                    <h2>Meus Dados</h2>
                    <div className="dados-usuario">
                        <div className="campo">
                            <span>Nome completo</span>
                            Alisson Santos
                        </div>
                        <div className="campo">
                            <span>CPF</span>
                            668.738.610-73
                        </div>
                        <div className="campo">
                            <span>Data de nascimento</span>
                            26/11/2000
                        </div>
                        <div className="campo">
                            <span>Gênero</span>
                            Masculino
                        </div>
                        <div className="campo">
                            <span>Email</span>
                            alisson@gmail.com
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}