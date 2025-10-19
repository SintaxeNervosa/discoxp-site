import BillingAddres from '../../../components/client/billingAddress/BillingAddress';
import FormPersonalData from '../../../components/client/formPersonalData/FormPersonalData';
import DeliveryAddress from '../../../components/client/deliveryAddress/DeliveryAddress';
import './RegisterStyle.scss';

import { useState } from 'react';

export default function Register() {
    const [page, setPage] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const nextPage = () => {
        setPage(page + 1)
    }

    const pages = [
        <FormPersonalData nextPage={nextPage} />,
        <BillingAddres nextPage={nextPage} />,
        <DeliveryAddress />
    ];

    return (
        <div className='container_register'>
            <section className='menu'>
                <h1>Bem-vindo de volta!</h1>
                <p>Insira seus dados pessoais para usar todos os recursos do site</p>
                <button>Entrar</button>
            </section>
            <section className='form'>
                <h1>Cadastro</h1>
                <div className='content'>
                    {page > 0 &&
                        <p onClick={() => setPage(page - 1)}>Voltar</p>
                    }
                    {pages[page]}
                    <button disabled={buttonDisabled} onClick={nextPage}>Próximo</button>
                </div>
            </section>
        </div>
    )
}