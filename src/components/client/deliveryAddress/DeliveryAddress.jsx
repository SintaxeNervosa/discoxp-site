import axios from "axios";
import { AnimatePresence, motion, number } from "framer-motion";
import { useEffect, useState } from "react";

export default function DeliveryAddress({ setButtonDisabled, setFormDeliveryAddress }) {
    const [cep, setCep] = useState("");
    const [errorCep, setErrorCep] = useState({
        show: false,
        message: null
    });

    const [street, setStreet] = useState("");
    const [number, setNumber] = useState(null);
    const [complement, setComplement] = useState("");
    const [checked, setChecked] = useState(false);

    const verifyCep = async (value) => {
        if (/[^0-9]/.test(value) || value.length > 8) return;

        setCep(value);
        setStreet("");
        if (value.length == 8) {
            // busca os dados do cep
            const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
            console.log(response.data);

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
            number: number,
            street: street,
            complement: complement
        }
    }

    function verifyFields() {
        const isValid = street != "" && number != null && number != "";

        if (isValid) {
            const obj = generateJson();
            setFormDeliveryAddress(obj);
            setButtonDisabled(false);
            return;
        }

        setButtonDisabled(true);
    }

    const loadDataToAddress = () => {
        console.log("AQUI!");
        const getAddressToBilling = sessionStorage.getItem("billingAddress");

        const addressToJson = JSON.parse(getAddressToBilling);

        setCep(addressToJson.cep);
        setStreet(addressToJson.street);
        setNumber(addressToJson.number);
        setComplement(addressToJson.complement);
    };

    function clearFields() {
        setStreet("");
        setNumber("");
        setCep("");
        setComplement("");
    }

    useEffect(() => {
        verifyFields();
    }, [street, number]);

    useEffect(() => {
        if (checked) {
            loadDataToAddress();
            return;
        }

        clearFields();
    }, [checked]);

    useEffect(() => {
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="delivery-address"
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.5 }}
                className="container-delivery-address">
                <div className="container-billing-address">
                    <h1 id="sub-title">Endereço de Entrega</h1>
                    <div className="copy-address">
                        <p>Copiar endereço de faturamento</p>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked(!checked)} />
                    </div>
                    <div>
                        <p>CEP</p>
                        <input
                            value={cep}
                            onChange={(e) => verifyCep(e.target.value)}
                            type="text" name="" id="" />
                        <p id={`message-${errorCep.show}`}></p>
                    </div>
                    <div>
                        <p>Logradouro</p>
                        <input
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
                        <input
                            placeholder='(Opcional)'
                            type="text" name="" id="" />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}