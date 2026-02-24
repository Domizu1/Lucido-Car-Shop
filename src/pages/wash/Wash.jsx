
import './wash.scss';
import washHero from '../../assets/images/wash1.webp';
import washDetail from '../../assets/images/wash2.webp';
import { FaWater, FaCar, FaSprayCan, FaShieldAlt } from 'react-icons/fa';

function Wash() {
    return (
        <section className="wash-section">
            <div className="wash-hero" style={{ backgroundImage: `url(${washHero})` }}>
                <div className="wash-hero-overlay">
                    <div className="content">
                        <h1>PREMIUM PRANJE <span>VOZILA</span></h1>
                        <p>Vratite fabrički sjaj vašem automobilu uz najsavremenije metode detailing pranja.</p>
                        <button className="btn-primary">ZAKAŽI TERMIN</button>
                    </div>
                </div>
            </div>

            <div className="wash-info-grid">
                <div className="text-block">
                    <h2>Najviši Standard Čistoće.</h2>
                    <p>
                        Naše pranje nije samo voda i sapun. To je proces koji uključuje dekontaminaciju laka,
                        čišćenje felni i detaljnu negu svakog spoljnog elementa.
                    </p>
                </div>
                <div className="image-block">
                    <img src={washDetail} alt="Detaljno pranje automobila" loading="lazy" decoding="async" />
                </div>
            </div>

            {/* 3. Features Deo (Ikonice na dnu) */}
            <div className="wash-features">
                <div className="feature-item">
                    <div className="icon"><FaWater /></div>
                    <h3>PH Neutralni Šamponi</h3>
                    <p>Koristimo isključivo bezbednu hemiju koja ne oštećuje zaštitne slojeve.</p>
                </div>
                <div className="feature-item">
                    <div className="icon"><FaCar /></div>
                    <h3>Metoda Dve Kofe</h3>
                    <p>Sprečavamo nastanak ogrebotina korišćenjem najsigurnijih tehnika pranja.</p>
                </div>
                <div className="feature-item">
                    <div className="icon"><FaSprayCan /></div>
                    <h3>Dekontaminacija</h3>
                    <p>Uklanjamo gvožđe i katran koji standardno pranje ne može da skine.</p>
                </div>
                <div className="feature-item">
                    <div className="icon"><FaShieldAlt /></div>
                    <h3>Sušenje Toplim Vazduhom</h3>
                    <p>Eliminišemo kontakt i mogućnost grebanja tokom procesa sušenja.</p>
                </div>
            </div>
        </section>
    );
}

export default Wash;