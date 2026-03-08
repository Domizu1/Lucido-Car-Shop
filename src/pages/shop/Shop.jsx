import { Link } from 'react-router-dom';
import cart from '../../assets/shop/cart.svg';
import { products } from '../../products';
import ProductCard from '../../components/ProductCard';
import { useState, useEffect } from 'react';
import './shop.scss';
import { useSelector, useDispatch } from 'react-redux';
import CartTab from '../shop/CartTab';
import { toggleStatusTab } from '../../store/cart';

function Shop() {

    const PRODUCTS_PER_PAGE = 32;

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className='pagination'>
                        <button
                            type='button'
                            className='page-btn nav-btn'
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prethodna
                        </button>

                        <div className='page-numbers'>
                            {Array.from({ length: totalPages }, (_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <button
                                        type='button'
                                        key={pageNumber}
                                        className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type='button'
                            className='page-btn nav-btn'
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Sledeca
                        </button>
                    </div>
                )}

                < CartTab />

            </main>
        </div>
    );
}

export default Shop;