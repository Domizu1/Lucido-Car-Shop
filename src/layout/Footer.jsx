
import './footer.scss';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>LUCIDO DETAILING</h2>
                </div>

                <div className="footer-socials">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaInstagram />
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaPinterestP />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaYoutube />
                    </a>
                </div>


                <ul className="footer-nav">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Usluge</a></li>
                    <li><a href="#about">O Nama</a></li>
                    <li><a href="#booking">Zakazivanje</a></li>
                    <li><a href="#contact">Kontakt</a></li>
                </ul>


                <div className="footer-copyright">
                    <p>© Zoovie {currentYear} - all rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;