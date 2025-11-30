import "./ClientLogin.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useLogin } from "../../../components/hooks/useLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function loginClient() {
    const {
        email,
        setEmail,
        senha,
        setSenha,
        Loginzao
    } = useLogin();

    const navigate = useNavigate();

    return (
        <motion.div
            id='RegistrationUser'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.form
                className="RegistrationUser_dados"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                onSubmit={Loginzao}
            >
                <motion.header
                    className='RegistrationUser_header'
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, type: "spring" }}
                >
                    <motion.h1
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    >
                        Login
                    </motion.h1>
                </motion.header>

                <motion.section
                    className='RegistrationUser_form'
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <motion.div
                        className="input-group"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h6>E-mail</h6>
                        <motion.input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            whileFocus={{
                                scale: 1.02,
                                boxShadow: "0 0 0 2px #EB8F25, 0 5px 15px rgba(235, 143, 37, 0.3)",
                                borderColor: "#EB8F25"
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                    <motion.div
                        className="input-group"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <h6>Senha</h6>
                        <motion.input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            whileFocus={{
                                scale: 1.02,
                                boxShadow: "0 0 0 2px #EB8F25, 0 5px 15px rgba(235, 143, 37, 0.3)",
                                borderColor: "#EB8F25"
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                </motion.section>

                <motion.footer
                    className="RegistrationUser_button"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#ff9c33",
                            boxShadow: "0 10px 25px rgba(235, 143, 37, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        type="submit"
                    >
                        Entrar
                    </motion.button>
                </motion.footer>
            </motion.form>

            <AnimatePresence mode="wait">
                <motion.section
                    className='menu'
                    initial={{ x: 100, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        delay: 0.2
                    }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3 }
                    }}
                >
                    <div className="menu_welcome">
                        <motion.img
                            src="./svg/LOGO.svg"
                            alt=""
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                delay: 0.5
                            }}
                            whileHover={{
                                rotate: 360,
                                scale: 1.1,
                                transition: { duration: 0.8 }
                            }}
                        />
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            Bem-vindo de volta!
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <strong>Cadastra-se com seus dados pessoais para usar todos os recursos do site</strong>
                        </motion.p>
                    </div>

                    <motion.button
                        onClick={() => navigate("/register")}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0, duration: 0.5 }}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#ff9c33",
                            boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Cadastrar-se
                    </motion.button>
                </motion.section>
            </AnimatePresence>
        </motion.div>
    )
}

export default loginClient;
