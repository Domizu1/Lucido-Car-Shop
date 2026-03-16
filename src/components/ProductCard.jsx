import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './productcard.scss';
import cart from '../assets/shop/cart.svg';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cart';

const ProductCard = (props) => {

    const carts = useSelector(store => store.cart.items);
    void carts;
    const { name, image, slug, price } = props.data;
    const [isAdded, setIsAdded] = useState(false);
    const resetTimerRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    const handleAddtoCart = () => {
        dispatch(addToCart({
            productId: props.data.id,
            quantity: 1
        }));

        setIsAdded(true);
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <div className="product-card">
            <Link to={slug}>
                <img
                    src={image}
                    alt={name}
                    className="product-image"
                />
            </Link>
            <h3 className='product-name'>{name}</h3>
            <div className='product-info'>
                <p>
                    <span className='product-price'>{price}</span>
                </p>
                <button
                    className={`product-btn ${isAdded ? 'is-added' : ''}`}
                    onClick={handleAddtoCart}
                    aria-label={isAdded ? 'Proizvod je dodat u korpu' : 'Dodaj proizvod u korpu'}
                >
                    <img src={cart} alt="Cart" className='btn-img' />
                    {isAdded ? 'Dodato u korpu' : 'Dodaj U Korpu'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;