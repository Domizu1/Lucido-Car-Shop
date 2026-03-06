
import './footer.scss';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaWhatsapp } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>LUCIDO DETAILING</h2>
                </div>

                <div className="footer-socials">
                    <a href="https://www.facebook.com/p/Lucido-Detailing-61553209057015/" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/lucidodetailing/?hl=en" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaInstagram />
                    </a>
                    <a href="https://wa.me/381658828422" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaWhatsapp />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle">
                        <FaYoutube />
                    </a>
                </div>


                <ul className="footer-nav">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#detailing">Usluge</a></li>
                    <li><a href="#perionica">Zakazivanje</a></li>
                    <li><a href="#hero">Kontakt</a></li>
                </ul>


                <div className="footer-copyright">
                    <p>© Zoovie {currentYear} - all rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;