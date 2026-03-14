import { Link } from 'react-router-dom';
import cart from '../../assets/shop/cart.svg';
import { products } from '../../products';
import ProductCard from '../../components/ProductCard';
import { useState, useEffect, useMemo } from 'react';
import './shop.scss';
import { useSelector, useDispatch } from 'react-redux';
import CartTab from '../shop/CartTab';
import { toggleStatusTab } from '../../store/cart';
import Seo from '../../components/Seo';

function Shop() {
    const PRODUCTS_PER_PAGE = 32;

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();

    const normalizeText = (value = '') =>
        value.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    const filteredProducts = useMemo(() => {
        const q = normalizeText(searchQuery);
        if (!q) return products;

        return products.filter((p) => {
            const name = normalizeText(p.name);
            const description = normalizeText(p.description || '');
            return name.includes(q) || description.includes(q);
        });
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="shop-page">
            <Seo
                title="Shop Auto Kozmetike | Lucido Detailing"
                description="Kupite proverene proizvode za negu vozila. Pretrazite Lucido shop i narucite detailing opremu i auto kozmetiku."
                keywords="shop auto kozmetike, detailing proizvodi, Lucido shop"
            />
            <header className="shop-header">
                <Link to="/" className="home-btn">Home</Link>

                <div className="cart-container">
                    <img className='cart-img' src={cart} alt="Cart" onClick={handleOpenTabCart} />
                    <span className="cart-count">{totalQuantity}</span>
                </div>
            </header>

            <main className="shop-items">
                <h1 className='shop-title'>Proizvodi</h1>

                <div className="shop-search">
                    <input
                        type="text"
                        className="shop-search-input"
                        placeholder="Pretraži proizvode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Pretraga proizvoda"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            className="shop-search-clear"
                            onClick={() => setSearchQuery('')}
                            aria-label="Obriši pretragu"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className='shop-products'>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))
                    ) : (
                        <p className="no-results">
                            Nema proizvoda za: "{searchQuery}"
                        </p>
                    )}
                </div>

                {filteredProducts.length > PRODUCTS_PER_PAGE && (
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

                <CartTab />
            </main>
        </div>
    );
}

export default Shop;