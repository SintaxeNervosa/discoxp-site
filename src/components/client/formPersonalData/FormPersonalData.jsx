import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { existUserByCpf, existUserByEmail } from "../../../connection/ClientPath";
import { validate } from 'node-cpf';

export default function FormPersonalData({ setButtonDisabled }) {
    const isFirstLoad = useRef(true);

    const [completeName, setCompleteName] = useState("");
    const [errorName, setErrorName] = useState({
        show: false,
        message: " "
    });

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState({
        show: false,
        message: " "
    })

    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState({
        show: false,
        message: " "
    })

    const [cpf, setCpf] = useState("");
    const [errorCpf, setErroCpf] = useState({
        show: false,
        message: " "
    })

    const [gender, setGender] = useState("");
    const [errorGender, setErrorGender] = useState({
        show: false,
        message: " "
    })

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [errorDateOfBirth, setErrorDateOfBirth] = useState({
        show: false,
        message: " "
    })

    const today = new Date().toISOString().split('T')[0];

    function validateName(value) {
        setCompleteName(value);

        let errorMessage = null;
        let splitName = value.split(" ");

        if (value.length == 0) {
            errorMessage = "* Informe o nome.";
        } else if (splitName.length < 2) {
            errorMessage = "* Informe o segundo nome.";
        } else if (splitName[0].length < 3 || splitName[1].length < 3) {
            errorMessage = "* Cada nome deve conter no mínimo 3 caracteres.";
        }

        if (errorMessage != null) {
            setErrorName({
                show: true,
                message: errorMessage
            });

            return false;
        }

        setErrorName({
            show: false,
            message: " "
        });

        return true;
    };

    async function validateEmail(value) {
        setEmail(value);
        let errorMessage = null;
        var re = /\S+@\S+\.\S+/;

        if (re.test(value)) {
            const response = await existUserByEmail(value);

            if (response.data.exists) {
                errorMessage = "* E-mail já em uso.";
            }
        } else {
            errorMessage = "* E-mail inválido.";
        }

        if (errorMessage != null) {
            setErrorEmail({
                show: true,
                message: errorMessage
            });

            return false;
        }

        setErrorEmail({
            show: false,
            message: " "
        });

        return true;
    }

    function validatePassword(value) {
        setPassword(value);

        let upperCase = value.match(/[A-Z]/);
        let lowwerCase = value.match(/[a-z]/);
        let number = value.match(/[0-9]/);
        let digit = value.match(/[\W_]/);
        let size = value.length >= 8;

        if (!(upperCase && lowwerCase && number && digit && size)) {
            setErrorPassword({
                show: true,
                message: "* Use letra maiúscula, minúscula, número, caractere especial e mínimo 8 caracters"
            });

            return false;
        }

        setErrorPassword({
            show: false,
            message: " "
        });

        return true;
    }

    async function validateCpf(value) {
        setCpf(value);
        let errorMessage = null;
        const isValid = validate(value);

        if (isValid) {
            const response = await existUserByCpf(value);

            if (response.data.exists) {
                errorMessage = "CPF inválido";
            }
        } else {
            errorMessage = "CPF inválido";
        }

        if (errorMessage != null) {
            setErroCpf({
                show: true,
                message: errorMessage
            });

            return false;
        }

        setErroCpf({
            show: false,
            message: " "
        });

        return true;
    }

    function validateGender(value) {
        setGender(value);

        if (value == "null") {
            setErrorGender({
                show: true,
                message: "* Informe o gênero."
            })

            return false;
        }

        setErrorGender({
            show: false,
            message: " "
        });

        return true;
    }

    function validateDateOfBirth(date) {
        setDateOfBirth(date);
        let errorMessage = null;
        const yearToday = today.split("-")[0];
        const year = date.split("-")[0];

        const years = yearToday - year;

        if (years >= 120 || years < 0) {
            errorMessage = "* Data inválida";
        }

        if (errorMessage != null) {
            setErrorDateOfBirth({
                show: true,
                message: errorMessage
            });

            return false;
        }

        setErrorDateOfBirth({
            show: false,
            message: " "
        });

        return true;
    }

    async function verifyFields() {
        let vName = validateName(completeName);
        let vEmail = await validateEmail(email);
        let vPassword = validatePassword(password);
        let vCpf = await validateCpf(cpf);
        let vGender = validateGender(gender);
        let vDateOfbirth = validateDateOfBirth(dateOfBirth);

        if (vName && vEmail && vPassword && vCpf && vGender && vDateOfbirth) {
            setButtonDisabled(false);
        }
    }

    // useEffect(() => {
    //     if (isFirstLoad.current) {
    //         isFirstLoad.current = false;
    //         return;
    //     }

    //     verifyFields();
    // }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="form-personal-data"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 1 }}
                className="form-personal-data">
                <div>
                    <p>Nome completo</p>
                    <input type="text"
                        value={completeName}
                        onChange={(e) => validateName(e.target.value)} />
                    <p id={`message-${errorName.show}`}>{errorName.message}</p>
                </div>
                <div>
                    <p>E-mail</p>
                    <input type="email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)} />
                    <p id={`message-${errorEmail.show}`}>{errorEmail.message}</p>
                </div>
                <div>
                    <p>Senha</p>
                    <input type="password"
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)} />
                    <p id={`message-${errorPassword.show}`}>{errorPassword.message}</p>
                </div>
                <div>
                    <p>CPF</p>
                    <input type="text"
                        value={cpf}
                        onChange={(e) => validateCpf(e.target.value)} />
                    <p id={`message-${errorCpf.show}`}>{errorCpf.message}</p>
                </div>
                <div className="gender-birthOfDay">
                    <div>
                        <p>Gênero</p>
                        <select onChange={(e) => validateGender(e.target.value)}>
                            <option value="null">Selecionar</option>
                            <option value="HOMEM">Homem</option>
                            <option value="MULHER">Mulher</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                        <p id={`message-${errorGender.show}`}>{errorGender.message}</p>
                    </div>
                    <div>
                        <p>Data de nascimento</p>
                        <input type="date"
                            min="1905-01-01"
                            max={today}
                            placeholder="dd/mm/yyyy"
                            value={dateOfBirth}
                            onChange={(e) => validateDateOfBirth(e.target.value)} />
                        <p id={`message-${errorDateOfBirth.show}`}>{errorDateOfBirth.message}</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}