import { useState, useEffect, useRef } from 'react'
import './navbar.scss'
import logo from '../assets/images/logocarshop.svg'
import cartIcon from '../assets/shop/cart.svg'
import { Link, useLocation } from 'react-router-dom';

const SCROLL_THRESHOLD = 80;

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        element.scrollIntoView({
            behavior: prefersReducedMotion || isMobile ? 'auto' : 'smooth',
            block: 'start',
        });
    }
};

function Navbar() {
    const { pathname } = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        setIsVisible(true);
        lastScrollY.current = 0;
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= SCROLL_THRESHOLD) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar-container ${isVisible ? 'navbar-container--visible' : 'navbar-container--hidden'}`}>
            <div className="navbar">
                <div className="navbar-logo">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
                        <img src={logo} alt="Lucido Detailing Logo" className="logo-image" />
                    </Link>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link
                            to="/#detailing"
                            onClick={(e) => {
                                if (pathname === '/') {
                                    e.preventDefault();
                                    scrollToSection('detailing');
                                }
                            }}
                        >
                            Detailing
                        </Link>
                    </li>
                    <li><Link to="/wash">Perionica</Link></li>
                    <li><Link to="/caffe">Caffe Bar</Link></li>
                    {/* <li onClick={() => handleScroll('lokacija')}>Lokacija</li> */}
                </ul>
                <div className="navbar-cta">
                    <Link to="/shop" className="navbar-cart-link" aria-label="Prodavnica">
                        <img src={cartIcon} alt="" className="navbar-cart-icon" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;