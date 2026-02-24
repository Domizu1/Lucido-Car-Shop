import React from 'react';
import './CarWash.scss';

import aboutImg1 from '../../assets/images/carwash1.webp';
import aboutImg2 from '../../assets/images/carwash2.webp';

function CarWash() {
    return (
        <section id="perionica" className="carwash-page">
            <div className="about-section">
                <div className="about-images">
                    <div className="image-main">
                        <img src={aboutImg1} alt="Car detailing" loading="lazy" />
                    </div>
                    <div className="image-inset">
                        <img src={aboutImg2} alt="Interior cleaning" loading="lazy" />
                    </div>

                </div>

                <div className="about-text">
                    <span className="subtitle">LUCIDO PERIONICA</span>
                    <h2>Više od obične <span>auto perionice</span></h2>
                    <p>
                        Lucido Detailing je posvećen transformaciji tradicionalnog pristupa nezi vozila.
                        Kombinacijom iskustva i najsavremenije tehnologije, osiguravamo da svaki
                        klijent pronađe put do savršenog sjaja.
                    </p>
                    <button className="btn-secondary">Saznaj Više</button>
                </div>
            </div>

            <div className="brand-bar">
                <div className="brand-pill">
                    <div className="brand-item">✨ SJAJ</div>
                    <div className="brand-item">🛡️ ZAŠTITA</div>
                    <div className="brand-item">🎯 PRECIZNOST</div>
                    <div className="brand-item">💎 PREMIJUM</div>
                </div>
            </div>
        </section>
    );
}

export default CarWash;