import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../products';
import './details.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart';

function Details() {
    const { slug } = useParams();
    const [detail, setDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = products.find(product => product.slug === slug);
        if (findDetail) {
            setDetail(findDetail);
        } else {
            navigate('/shop');
        }
    }, [slug, navigate]);

    if (!detail) return null;

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    };

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: detail.id,
            quantity: quantity
        }));
    };

    return (
        <div className="details-container">
            <h2 className="details-title">PRODUCT DETAIL</h2>

            <div className="details-content">
                <div className="image-section">
                    <img src={detail.image} alt={detail.name} />
                </div>

                <div className="info-section">
                    <h1 className="product-name">{detail.name}</h1>
                    <p className="product-price">${detail.price}</p>
                    {detail.description && (
                        <p className="product-desc">{detail.description}</p>
                    )}

                    <div className="action-row">
                        <div className="quantity-selector">
                            <button onClick={handleMinusQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handlePlusQuantity}>+</button>
                        </div>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;