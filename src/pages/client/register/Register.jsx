import FormPersonalData from '../../../components/client/register/FormPersonalData';
import DeliveryAddress from '../../../components/client/register/DeliveryAddress';
import { AnimatePresence, motion } from "framer-motion";
import './RegisterStyle.scss';

import left from '../../../assets/images/register/left.svg';
import loader from '../../../assets/images/cart/Rolling@1x-1.0s-200px-200px.svg';

import { useEffect, useState } from 'react';
import BillingAddress from '../../../components/client/register/BillingAddress';
import { useNavigate } from 'react-router-dom';
import { addBillingAddress, addDeliveryAddress } from '../../../connection/userPaths';
import { toast, ToastContainer } from 'react-toastify';
import { createClient } from '../../../connection/ClientPath';

export default function Register() {
    const [page, setPage] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formUserPersonalData, setFormUserPersonalData] = useState(null);
    const [formBillingAddress, setFormBillingAddress] = useState(null);
    const [formDeliveryAddress, setFormDeliveryAddress] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    const navigate = useNavigate();

    const nextPage = () => {
        setPage(page + 1);
    }

    const saveDataInSession = () => {
        sessionStorage.setItem("personalData", JSON.stringify(formUserPersonalData));
    }

    const saveBillingAddressInSession = () => {
        sessionStorage.setItem("billingAddress", JSON.stringify(formBillingAddress));
    }

    const saveDeliveryAddressInSession = () => {
        sessionStorage.setItem("deliveryAddress", JSON.stringify(formDeliveryAddress));
    }

    const clearSessionData = () => {
        sessionStorage.setItem("personalData", null);
        sessionStorage.setItem("billingAddress", null);
        sessionStorage.setItem("delveryAddress", null);
    }

    const saveUser = async () => {
    try {
        // Busca os dados do sessionStorage
        const personalData = JSON.parse(sessionStorage.getItem("personalData"));
        const billingAddress = JSON.parse(sessionStorage.getItem("billingAddress"));
        const deliveryAddress = JSON.parse(sessionStorage.getItem("deliveryAddress"));

        // Monta o objeto completo para enviar
        const userData = {
            name: personalData.name,
            email: personalData.email,
            cpf: personalData.cpf,
            password: personalData.password,
            dateOfBirth: personalData.dateOfBirth,
            gender: personalData.gender,
            deliveryAddress: {
                id: "",
                cep: deliveryAddress.cep,
                number: deliveryAddress.number,
                complement: deliveryAddress.complement
            },
            billingAddress: {
                id: "",
                cep: billingAddress.cep,
                number: billingAddress.number,
                complement: billingAddress.complement
            }
        };

        // Faz uma única chamada para a API
        const response = await createClient(userData);

        if (response.status === 201) {
            setShowLoader(true);
            toast.success("Cadastro realizado com sucesso!");

            clearSessionData();

            setTimeout(() => {
                navigate('/login');
            }, 1000);

            return;
        }

        toast.error("Ocorreu um erro ao realizar o cadastro");

    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        toast.error("Ocorreu um erro ao realizar o cadastro");
    }
}

    useEffect(() => {
        if (!buttonDisabled) {
            switch (page) {
                case 0:
                case 1:
                    saveDataInSession();
                    break;
                case 2:
                    saveBillingAddressInSession();
                    break;
                case 3:
                    saveDeliveryAddressInSession();
                    saveUser();
                    break;
                case 4:
                    setShowLoader(true);
                default:
                    console.log(page);
            }
        }

    }, [page]);

    const pages = [
        <FormPersonalData setButtonDisabled={setButtonDisabled} setFormUserPersonalData={setFormUserPersonalData} />,
        <BillingAddress setButtonDisabled={setButtonDisabled} setFormBillingAddress={setFormBillingAddress} />,
        <DeliveryAddress setButtonDisabled={setButtonDisabled} setFormDeliveryAddress={setFormDeliveryAddress} />
    ];

    return (
        <AnimatePresence mode="wait">
            <ToastContainer />
            <div className='container_register'>
                <motion.section className='menu'
                    key="form-personal-data"
                    initial={{ x: -500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <img src="./img/DISCO_XP__1_-removebg-preview.png" alt="" />
                    <h1>Bem-vindo de volta!</h1>
                    <p>Insira seus dados pessoais para usar todos os recursos do site</p>
                    <button onClick={() => navigate("/login")}>Entrar</button>
                </motion.section>
                {(!showLoader
                    ? <section className='form'>
                        <h1>Cadastro</h1>
                        <div className='content'>
                            {page > 0 &&
                                <img src={left} id='left' onClick={() => setPage(page - 1)} />
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
                    : <img id='loader' src={loader} />)}
            </div>
        </AnimatePresence>
    );
}