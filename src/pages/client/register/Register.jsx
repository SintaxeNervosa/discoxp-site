import BillingAddres from '../../../components/client/billingAddress/BillingAddress';
import FormPersonalData from '../../../components/client/formPersonalData/FormPersonalData';
import DeliveryAddress from '../../../components/client/deliveryAddress/DeliveryAddress';
import { AnimatePresence, motion } from "framer-motion";
import './RegisterStyle.scss';

import { useEffect, useRef, useState } from 'react';
import BillingAddress from '../../../components/client/billingAddress/BillingAddress';
import { useNavigate } from 'react-router-dom';
import { createBillingAddress, createDeliveryAddress, createUser } from '../../../connection/userPaths';
import { p } from 'framer-motion/client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { cos } from 'three/tsl';

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
        console.log(formBillingAddress);
        sessionStorage.setItem("billingAddress", JSON.stringify(formBillingAddress));
    }

    const saveDeliveryAddressInSession = () => {
        sessionStorage.setItem("deliveryAddress", JSON.stringify(formDeliveryAddress));
    }

    const saveUser = async () => {

        let usuarioLocalStorage = sessionStorage.getItem("personalData");
        let toJSon = JSON.parse(usuarioLocalStorage);
        console.log(toJSon);

        const obj = {
            "name": toJSon.name,
            "email": toJSon.email,
            "group": "CLIENT",
            "password": toJSon.password,
            "cpf": toJSon.cpf,
            "dateOfBirth": toJSon.dateOfBirth,
            "gender": toJSon.gender
        }

        const response = await createUser(obj);

        if (response.status == 201) {
            let getBillingAddressFromSessionStorage = sessionStorage.getItem("billingAddress");
            let toJsonB = JSON.parse(getBillingAddressFromSessionStorage);

            const objAddBillingAdress = {
                id: response.data.id,
                cep: toJsonB.cep,
                logradouro: toJsonB.logradouro,
                bairro: toJsonB.bairro,
                cidade: toJsonB.cidade,
                numero: toJsonB.numero,
                estado: toJsonB.estado,
                complemento: toJsonB.complemento,
            }

            const requesdAddress = await createBillingAddress(objAddBillingAdress);

            console.log(requesdAddress);

            if (response.status == 201) {
                const response2 = await createDeliveryAddress(toJSon);

                if (response2 == 201) {
                    toast.success("Usuário cadastrado com sucesso!");
                }
            }

        }
    }

    /* {
        "name": "Italo",
        "email": "italo@gamil.com",
        "group": "CLIENT",
        "password": "@Ita75802309",
        "cpf": "47958777850",
        "dateOfBirth": "1998-05-14",
        "gender": "MULHER"
    }*/

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
                    console.log("Ocorreu um erro");
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