import './ItemStyle.scss';

import zelda from '../../../assets/images/cart/zelda.svg';
import { useState } from 'react';

export default function Item(props) {
    const [count, setCount] = useState(1);

    return (
        <div className="item-container">
            <img src={zelda} alt="" />
            <div className="content">
                <div className="name-delete">
                    <p><strong>The Legend of Zelda: Breath of the Wild</strong></p>
                    <p>X</p>
                </div>
                <div className="quantity-price">
                    <div>
                        <button onClick={() => setCount(count - 1)}>-</button>
                        <p>{count}</p>
                        <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <p>R$ 699,90</p>
                </div>
            </div>
        </div>
    );
}