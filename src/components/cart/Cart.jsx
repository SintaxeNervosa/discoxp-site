import { useEffect, useState } from 'react';
import './CartStyle.scss';
import Item from "./item/Item.jsx";

import cart from '../../assets/images/cart/cart.svg';
import location from '../../assets/images/cart/location.svg';
import store from '../../assets/images/cart/store.svg';
import truck from '../../assets/images/cart/truck.svg';
import schedule from '../../assets/images/cart/schedule.svg';
import axios from 'axios';
import { AnimatePresence, motion } from 'motion/react';
import { addProductInCart, findAllProductsByCart } from '../../config/dexie.js';
import { base64ToFile } from '../functions/ConvertFiles.js';

export default function Cart({ visibility, closeCart }) {
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [products, setProducts] = useState([]);

    const zipCodeSearch = async (e) => {
        if (e !== undefined && e.key != 'Enter') {
            return;
        }

        const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);

        const data = response.data;
        setAddress(data.logradouro + ", " + data.estado + " - " + data.uf);
    }

    async function findProduct() {
        const response = await findAllProductsByCart();

        let productItens = [];

        for (let i = 0; i < response.length; i++) {
            productItens = [...productItens, response[i]];
        }

        setProducts(productItens);
    }

    useEffect(() => {
        findProduct();
    }, [])

    useEffect(() => {
    }, [products])

    return (
        <AnimatePresence >
            {visibility && (
                <motion.div className="cart-container">
                    <motion.section
                        key="cart"
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        transition={{ duration: 0.3 }}
                        className="cart">
                        <header>
                            <div>
                                <img src={cart} alt="" />
                                <h1>Meu carrinho</h1>
                            </div>
                            <h1 onClick={closeCart}>X</h1>
                        </header>
                        <section className="content">
                            <div className="items">
                                {products.map(product => (
                                    <Item key={product.id} product={product} />
                                ))}
                            </div>
                            <div className="cart-summary">
                                {address != "" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 100 }}
                                        transition={{ duration: 0.5 }}
                                        className="address">
                                        <div className='address-value'>
                                            <img src={location} alt="" />
                                            <p>{address}</p>
                                        </div>
                                        <div className='pick-up-in-store'>
                                            <div>
                                                <img src={store} alt="" />
                                                <p>pronto em até 2 horas</p>
                                            </div>
                                            <p id='free'>grátis</p>
                                        </div>
                                        <div className='delivery'>
                                            <div>
                                                <img src={truck} alt="" />
                                                <p>receber em até 1 dia útil</p>
                                            </div>
                                            <p>R$ 9,90</p>
                                        </div>
                                        <div className='to-schedule'>
                                            <div>
                                                <img src={schedule} alt="" />
                                                <p>agendar sua entrega</p>
                                            </div>
                                            <p>R$ 15,99</p>
                                        </div>
                                    </motion.div>
                                )}
                                {address == "" && (
                                    <div
                                        className="shipping-calculator">
                                        <p>Calcular frete e prazo</p>
                                        <div className="input-buttom">
                                            <input
                                                onKeyDown={zipCodeSearch}
                                                value={zipCode}
                                                onChange={(e) => setZipCode(e.target.value)}
                                                type="text"
                                                placeholder="Digite seu CEP" />
                                            <button
                                                onClick={() => zipCodeSearch()}>OK</button>
                                        </div>
                                    </div>
                                )}
                                <div className="total">
                                    <div>
                                        <p>Total</p>
                                        <p>R$ 2.709,6</p>
                                    </div>
                                    <button id="continue">Continuar</button>
                                </div>
                            </div>
                        </section>
                    </motion.section>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}