import './BillingAddressStyle.scss';

import { AnimatePresence, motion } from "framer-motion";

export default function BillingAddress({ nextPage }) {
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
                    <input type="text" name="" id="" />
                </div>
                <div>
                    <p>Logradouro</p>
                    <input type="text" name="" id="" />
                </div>
                <div>
                    <p>Número</p>
                    <input type="text" name="" id="" />
                </div>
                <div>
                    <p>Complemeto</p>
                    <input type="text" name="" id="" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}