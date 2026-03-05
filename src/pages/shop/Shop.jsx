import { Link } from 'react-router-dom';
import cart from '../../assets/shop/cart.svg';
import { products } from '../../products';
import ProductCard from '../../components/ProductCard';
import { useState, useEffect } from 'react';
import './shop.scss';
import { useSelector, useDispatch } from 'react-redux';
import CartTab from '../shop/Carttab';
import { toggleStatusTab } from '../../store/cart';

function Shop() {

    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    }

    return (
        <div className="shop-page">
            <header className="shop-header">
                <Link to="/" className="home-btn">Home</Link>

                <div className="cart-container">
                    <img className='cart-img' src={cart} alt="Cart" onClick={handleOpenTabCart} />
                    <span className="cart-count">{totalQuantity}</span>
                </div>
            </header>

            <main className="shop-items">
                <h1 className='shop-title'>Proizvodi</h1>
                <div className='shop-products'>
                    {products.map((product, key) => (
                        <ProductCard key={key} data={product} />
                    ))}
                </div>
                < CartTab />

            </main>
        </div>
    );
}

export default Shop;