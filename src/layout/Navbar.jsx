import './navbar.scss'
import logo from '../assets/images/logocarshop.svg'
import { Link } from 'react-router-dom';

function Navbar() {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar-container">
            <div className="navbar">
                <div className="navbar-logo">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logo} alt="Lucido Detailing Logo" className="logo-image" />
                    </Link>
                </div>
                <ul className="navbar-links">
                    <li onClick={() => handleScroll('detailing')}>Detailing</li>
                    <li onClick={() => handleScroll('perionica')}>Perionica</li>
                    <li onClick={() => handleScroll('caffe')}>Caffe Bar</li>
                    <li onClick={() => handleScroll('lokacija')}>Lokacija</li>
                </ul>
                <div className="navbar-cta">
                    <Link to="/shop">
                        <button className="btn-get-started">PRODAVNICA 🛒</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;