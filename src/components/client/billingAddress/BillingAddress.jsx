import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';

export default function BillingAddress({ setButtonDisabled, setFormBillingAddress }) {
    const [cep, setCep] = useState("");
    const [errorCep, setErrorCep] = useState({
        show: false,
        message: null
    });

    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [numero, setNumero] = useState(null);
    const [estado, setEstado] = useState("");
    const [complement, setComplement] = useState("");
    
    /**    {
        "id": "1",
        "cep": "04854250",
        "logradouro": "caso do shr ze",
        "bairro": "SLA",
        "cidade": "SP",
        "numero": "2",
        "estado": "SP",
        "complemento": "sla"
    } */

    const verifyCep = async (value) => {
        if (/[^0-9]/.test(value) || value.length > 8) return;

        setCep(value);
        setLogradouro("");
        if (value.length == 8) {
            // buscar os dados daco cep
            const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);

            if (response.status == 200) {
                const error = response.data.erro;

                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);

                if (error == 'true') {
                    setErrorCep({
                        show: true,
                        message: "* CEP inválido."
                    })

                    setLogradouro("");
                    return;
                }

                if (errorCep.show) {
                    setErrorCep({
                        show: false,
                        message: null
                    });
                }

                setLogradouro(response.data.logradouro);
            }
        }
    }

    const verifyNumber = (value) => {
        if (/[^a-zA-Z0-9]/.test(value)) return;

        setNumero(value);
    }

    function generateJson() {
        return {
            cep: cep,
            logradouro: logradouro,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            numero: numero,
            estado: estado,
            complement: complement

        }
    }

    function verifyFields() {
        const isValid = logradouro != "" && numero != null && numero != "";

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
        setLogradouro(dataToJson.logradouro);
        setNumero(dataToJson.numero);
        setComplement(dataToJson.complement);
    }

    useEffect(() => {
        verifyFields();
    }, [logradouro, numero]);

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
                        value={logradouro}
                        onChange={(e) => setLogradouro(e.target.value)}
                        type="text" name="" id="" />
                    <p id='message-false'></p>
                </div>
                <div>
                    <p>Número</p>
                    <input
                        value={numero}
                        onChange={(e) => verifyNumero(e.target.value)}
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