import { putProductQuantity } from '../../../config/dexie';
import { AnimatePresence, motion } from 'motion/react';
import './ItemStyle.scss';

import { useState } from 'react';

export default function Item({ product, findProduct, removeItem }) {
    const [quantity, setQuantity] = useState(product.quantity);

    const changeProductQuantity = async (id, newQuantity) => {
        await putProductQuantity(id, newQuantity);

        setQuantity(newQuantity);
        await findProduct();
    }

    async function remove(id) {
        await removeItem(id);
        await findProduct();
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 300 }}
                transition={{ duration: 0.5 }}
                className="item-container">
                <img src={product.file} alt="" />
                <div className="content">
                    <div className="name-delete">
                        <p><strong>{product.name}</strong></p>
                        <p onClick={() => remove(product.id)}>X</p>
                    </div>
                    <div className="quantity-price">
                        <div>
                            <button onClick={() => changeProductQuantity(product.id, quantity - 1)}>-</button>
                            <p>{quantity}</p>
                            <button onClick={() => changeProductQuantity(product.id, quantity + 1)}>+</button>
                        </div>
                        <p>R$ {product.price}</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}