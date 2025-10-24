import { AnimatePresence, motion } from "framer-motion";
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
            setFormDeliveryAddress(obj);
            setButtonDisabled(false);
            return;
        }

        setButtonDisabled(true);
    }

    useEffect(() => {
        verifyFields();
    }, [street, number]);

    useEffect(() => {

    }, []);

    const loadDataToAddress = () => {
        const getAddressToBilling = sessionStorage.getItem("billingAddress");

        const addressToJson = JSON.parse(getAddressToBilling);

        console.log(addressToJson);
        setCep(addressToJson.cep);
        setStreet(addressToJson.street);
        setNumber(addressToJson.number);
        setComplement(addressToJson.complement);
    };


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
                    <h3>Endereço de Entrega</h3>
                    <div>

                        <input type="checkbox" onClick={() => loadDataToAddress()}></input>
                        <p>Copiar endereço de faturamento</p>
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