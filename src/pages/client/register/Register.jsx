import BillingAddres from '../../../components/client/billingAddress/BillingAddress';
import FormPersonalData from '../../../components/client/formPersonalData/FormPersonalData';
import DeliveryAddress from '../../../components/client/deliveryAddress/DeliveryAddress';
import { AnimatePresence, motion } from "framer-motion";
import './RegisterStyle.scss';

import { useEffect, useRef, useState } from 'react';

export default function Register() {
    let isFirstLoad = useRef(true);
    const [page, setPage] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formUserPersonalData, setUserPersonalData] = useState({});

    const nextPage = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        if (!isFirstLoad.current) {
            switch (page) {
                case 1:
                    // chamar a função para salvar os dados do usuário
                    break;
                case 2:
                    // chamar a funcão para salvar os dados de faturamento
                    break;
                case 3:
                    // chamar a funcão "final"
                    break;
                default:
                    console.log("Ocorreu um erro");
            }
        }

    }, [page]);

    const pages = [
        <FormPersonalData setButtonDisabled={setButtonDisabled} setUserPersonalData={setUserPersonalData} />,
        <BillingAddres nextPage={nextPage} />,
        <DeliveryAddress />
    ];

    return (
        <AnimatePresence mode="wait">
            <div className='container_register'>
                <motion.section className='menu'
                    key="form-personal-data"
                    initial={{ x: -500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <img src="./img/DISCO_XP__1_-removebg-preview.png" alt="" />
                    <h1>Bem-vindo de volta!</h1>
                    <p>Insira seus dados pessoais para usar todos os recursos do site</p>
                    <button>Entrar</button>
                </motion.section>
                <section className='form'>
                    <h1>Cadastro</h1>
                    <div className='content'>
                        {page > 0 &&
                            <p onClick={() => setPage(page - 1)}>Voltar</p>
                        }
                        {pages[page]}
                        <motion.button
                            disabled={buttonDisabled}
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{ duration: 1 }}
                            onClick={nextPage}>Próximo
                        </motion.button>
                    </div>
                </section>
            </div>
        </AnimatePresence>
    );
}