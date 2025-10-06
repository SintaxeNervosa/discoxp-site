import './ItemStyle.scss';

import { useEffect, useState } from 'react';

export default function Item({ product }) {
    const [count, setCount] = useState(1);

    return (
        <div className="item-container">

            <img src={product.file} alt="" />
            <div className="content">
                <div className="name-delete">
                    <p><strong>{product.name}</strong></p>
                    <p>X</p>
                </div>
                <div className="quantity-price">
                    <div>
                        <button onClick={() => setCount(count - 1)}>-</button>
                        <p>{count}</p>
                        <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <p>R$ {product.price}</p>
                </div>
            </div>
        </div>
    );
}