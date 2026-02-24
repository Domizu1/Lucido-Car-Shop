import React from 'react';
import './Footer.scss';
// Importujemo ikonice iz react-icons paketa (koristimo FontAwesome i Ionicons kao primer)
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="footer-container">
                {/* 1. Logo / Naslov Sekcija */}
                <div className="footer-logo">
                    {/* Ovde možeš dodati i SVG logo iznad teksta ako ga imaš */}
                    <h2>LUCIDO DETAILING</h2>
                </div>

                {/* 2. Social Media Ikonice */}
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

                {/* 3. Navigacioni Linkovi */}
                <ul className="footer-nav">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Usluge</a></li>
                    <li><a href="#about">O Nama</a></li>
                    <li><a href="#booking">Zakazivanje</a></li>
                    <li><a href="#contact">Kontakt</a></li>
                </ul>

                {/* 4. Copyright */}
                <div className="footer-copyright">
                    <p>© Zoovie {currentYear} - all rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;