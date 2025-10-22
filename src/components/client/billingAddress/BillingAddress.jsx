import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';

export default function BillingAddress({ setButtonDisabled, setFormBillingAddress }) {
    const [cep, setCep] = useState("");
    const [errorCep, setErrorCep] = useState({
        show: false,
        message: null
    });

    const [street, setStreet] = useState("");
    const [number, setNumber] = useState(null);
    const [complement, setComplement] = useState("");

    const verifyCep = async (value) => {
        if (/[^0-9]/.test(value) || value.length > 8) return;

        setCep(value);
        setStreet("");
        if (value.length == 8) {
            // buscar os dados daco cep
            const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);

            if (response.status == 200) {
                const error = response.data.erro;

                if (error == 'true') {
                    setErrorCep({
                        show: true,
                        message: "* CEP inválido."
                    })

                    setStreet("");
                    return;
                }

                if (errorCep.show) {
                    setErrorCep({
                        show: false,
                        message: null
                    });
                }

                setStreet(response.data.logradouro);
            }
        }
    }

    const verifyNumber = (value) => {
        if (/[^a-zA-Z0-9]/.test(value)) return;

        setNumber(value);
    }

    function generateJson() {
        return {
            cep: cep,
            street: street,
            number: number,
            complement: complement
        }
    }

    function verifyFields() {
        const isValid = street != "" && number != null && number != "";

        if (isValid) {
            const obj = generateJson();
            console.log(obj)
            setFormBillingAddress(obj);
            setButtonDisabled(false);
            return;
        }

        setButtonDisabled(true);
    }

    function loadBillingAddressInSession() {
        let data = sessionStorage.getItem("billingAddress");

        if (data == null || data == 'null') return;

        const dataToJson = JSON.parse(data);

        setCep(dataToJson.cep);
        setStreet(dataToJson.street);
        setNumber(dataToJson.number);
        setComplement(dataToJson.complement);
    }

    useEffect(() => {
        verifyFields();
    }, [street, number]);

    useEffect(() => {
        loadBillingAddressInSession();
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="billing-address"
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.5 }}
                className="container-billing-address">
                <h1>Endereço de Faturamento</h1>
                <div>
                    <p>CEP</p>
                    <input
                        value={cep}
                        onChange={((e) => verifyCep(e.target.value))}
                        type="text" name="" id="" />
                    <p id={`message-${errorCep.show}`}></p>
                </div>
                <div>
                    <p>Logradouro</p>
                    <input
                        disabled={true}
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        type="text" name="" id="" />
                    <p id='message-false'></p>
                </div>
                <div>
                    <p>Número</p>
                    <input
                        value={number}
                        onChange={(e) => verifyNumber(e.target.value)}
                        type="text" name="" id="" />
                    <p id='message-false'></p>
                </div>
                <div>
                    <p>Complemeto</p>
                    <input placeholder='(Opcional)' type="text" name="" id="" />
                    <p id='message-false'>* Cep inválido</p>
                </div>
            </motion.div>
        </AnimatePresence >
    );
}