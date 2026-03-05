import { useState, useEffect } from "react";
import { products } from '../products';
import './cartitem.scss';
import { useDispatch } from "react-redux";
import { changeQuantity } from "../store/cart";

const CartItem = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = products.find(product => product.id === productId);
        setDetail(findDetail);
    }, [productId]);

    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    };

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    };

    if (!detail) return null;

    // FIX 2: This return must be at the component level, not inside a handler
    return (
        <div className="cart-item">
            <img src={detail.image} alt={detail.name} className="cart-item-img" />
            <h3>{detail.name}</h3>
            <p>RSD {detail.price * quantity}</p>
            <div className="quantity-controls">
                <button onClick={handleMinusQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={handlePlusQuantity}>+</button>
            </div>
        </div>
    );
}; // FIX 3: Close the CartItem component

export default CartItem; // FIX 4: Export must be at the top level