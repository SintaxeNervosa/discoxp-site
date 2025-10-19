import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { existUserByCpf, existUserByEmail } from "../../../connection/ClientPath";
import { func } from "prop-types";
import { validate } from 'node-cpf';

export default function FormPersonalData({ nextPage }) {
    const [completeName, setCompleteName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const [validFields, setValidFields] = useState(false);

    function validateName(value) {
        setCompleteName(value);
        console.log(value);

        let splitName = value.split(" ");

        if (splitName.length < 2) {
            console.log("Informe o segundo nome");
            return;
        }

        let first = splitName[0];
        let middle = splitName[1];

        if (first.length < 3 || middle.length < 3) {
            console.log("Cada nome deve conter no mínimo 3 caracteres.");
            return;
        }
    };

    async function validateEmail(value) {
        setEmail(value);
        var re = /\S+@\S+\.\S+/;

        if (re.test(value)) {
            const response = await existUserByEmail(value);

            if (response.data.exists) {
                console.log("E-mail já em uso.");
            }

            return;
        }

        console.log("E-mail inválido.");
    }

    function validatePassword(value) {
        setPassword(value);

        let upperCase = value.match(/[A-Z]/);
        let lowwerCase = value.match(/[a-z]/);
        let number = value.match(/[0-9]/);
        let digit = value.match(/[\W_]/);
        let size = value.length >= 8;

        if (!(upperCase && lowwerCase && number && digit && size)) {
            console.log("* Use letra maiúscula, minúscula, número, caractere especial e mínimo 8 caracters");
        }
    }

    async function validateCpf(value) {
        setCpf(value);
        const isValid = validate(value);

        if (isValid) {
            const response = await existUserByCpf(value);

            if (response.data.exists) {
                console.log("CPF inválido.");
            }

            return;
        }

        console.log("CPF inválido.")
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="form-personal-data"
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.5 }}
                className="form-personal-data">
                <div>
                    <p>Nome completo</p>
                    <input type="text"
                        value={completeName}
                        onChange={(e) => validateName(e.target.value)} />
                </div>
                <div>
                    <p>E-mail</p>
                    <input type="email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)} />
                </div>
                <div>
                    <p>Senha</p>
                    <input type="password"
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)} />
                </div>
                <div>
                    <p>CPF</p>
                    <input type="text"
                        value={cpf}
                        onChange={(e) => validateCpf(e.target.value)} />
                </div>
                <div className="gender-birthOfDay">
                    <div>
                        <p>Gênero</p>
                        <select onChange={(e) => setGender(e.target.value)}>
                            <option value="null">Selecionar</option>
                            <option value="HOMEM">Homem</option>
                            <option value="MULHER">Mulher</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                    </div>
                    <div>
                        <p>Data de nascimento</p>
                        <input type="date"
                            placeholder="dd/mm/yyyy"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}