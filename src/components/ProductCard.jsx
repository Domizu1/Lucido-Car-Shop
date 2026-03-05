import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import cart from '../assets/shop/cart.svg';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cart';

const ProductCard = (props) => {

    const carts = useSelector(store => store.cart.items);
    console.log(carts);
    const { name, image, slug, price } = props.data;

    const dispatch = useDispatch();
    const handleAddtoCart = () => {
        dispatch(addToCart({
            productId: props.data.id,
            quantity: 1
        }))
    }

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
                <button className='product-btn' onClick={handleAddtoCart}>
                    <img src={cart} alt="Cart" className='btn-img' />
                    Dodaj U Korpu
                </button>
            </div>
        </div>
    );
};

export default ProductCard;