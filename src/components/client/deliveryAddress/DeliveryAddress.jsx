import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function DeliveryAddress() {
    const [validFields, setValidFields] = useState(false);
    
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
                </div>
            </motion.div>
        </AnimatePresence>
    );
}