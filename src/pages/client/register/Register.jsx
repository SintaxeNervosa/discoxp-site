import FormPersonalData from '../../../components/client/formPersonalData/FormPersonalData';
import DeliveryAddress from '../../../components/client/deliveryAddress/DeliveryAddress';
import { AnimatePresence, motion } from "framer-motion";
import './RegisterStyle.scss';

import { useEffect, useState } from 'react';
import BillingAddress from '../../../components/client/billingAddress/BillingAddress';
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

    // método para salvar o endereço de faturamento no banco
    const saveBillingAddress = async (id) => {
        const getBillingAddressFromSessionStorage = sessionStorage.getItem("billingAddress");
        const billingAddressToJson = JSON.parse(getBillingAddressFromSessionStorage);

        const obj = {
            id: id,
            cep: billingAddressToJson.cep,
            number: billingAddressToJson.number,
            complement: billingAddressToJson.complement
        }

        const response = await addBillingAddress(obj);
        if (response.status == 201) {
            toast.success("Endereço de faturamento cadastrado com sucesso!");
            return;
        }

        toast.error("Erro ao salvar endereço de faturamento.");
    }
    
    // método para salvar o endereço de entrega no banco
    const saveDeliveryAddress = async (id) => {
        const getDeliveryAddressFromSessionStorage = sessionStorage.getItem("deliveryAddress");
        const deliveryAddressToJson = JSON.parse(getDeliveryAddressFromSessionStorage);

        const obj = {
            id: id,
            cep: deliveryAddressToJson.cep,
            number: deliveryAddressToJson.number,
            complement: deliveryAddressToJson.complement
        }

        const response = await addDeliveryAddress(obj);
        if (response.status == 201) {
            toast.success("Endereço de entrega cadastrado com sucesso!");
            return;
        }

        toast.error("Erro ao salvar endereço entrega.");
    }

    const saveUser = async () => {
        let usuarioLocalStorage = sessionStorage.getItem("personalData");
        let userToJson = JSON.parse(usuarioLocalStorage);

        const response = await createClient(userToJson);

        if (response.status == 201) {
            toast.success("Usuário cadastrado com sucesso!");
            
            await saveBillingAddress(response.data.id);
            await saveDeliveryAddress(response.data.id);

            navigate('/login');
            return;
        }

        toast.error("Ocorreu um erro ao salvar o usuário");
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