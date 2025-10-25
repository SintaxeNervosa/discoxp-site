import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DeliveryAddress({ setButtonDisabled, setFormDeliveryAddress }) {
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
    const [complemento, setComplemento] = useState("");

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

    const verifynumero = (value) => {
        if (/[^a-zA-Z0-9]/.test(value)) return;

        setNumero(value);
    }

    function generateJson() {
        return {
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            numero: numero,
            estado: estado,
            complemento: complemento
        }
    }

    function verifyFields() {
        const isValid = logradouro != "" && numero != null && numero != "";

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
    }, [logradouro, numero]);

    useEffect(() => {

    }, []);

    const loadDataToAddress = () => {
        const getAddressToBilling = sessionStorage.getItem("billingAddress");

        const addressToJson = JSON.parse(getAddressToBilling);

        console.log(addressToJson);
        setCep(addressToJson.cep);
        setLogradouro(addressToJson.logradouro);
        setNumero(addressToJson.numero);
        setComplemento(addressToJson.complemento);
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
                    <h1>Endereço de Entrega</h1>
                    <button onClick={() => loadDataToAddress()}></button>
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
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                            type="text" name="" id="" />
                        <p id='message-false'></p>
                    </div>
                    <div>
                        <p>Número</p>
                        <input
                            value={numero}
                            onChange={(e) => verifynumero(e.target.value)}
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