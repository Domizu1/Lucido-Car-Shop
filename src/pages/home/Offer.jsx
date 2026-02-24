import React from 'react';
import './offer.scss';

import img1 from '../../assets/images/offer1.webp';
import img2 from '../../assets/images/offer2.webp';
import img3 from '../../assets/images/offer3.webp';
import img4 from '../../assets/images/offer4.webp';

const offerData = [
    {
        id: 1,
        title: "DETALJNO ČIŠĆENJE ENTERIJERA.",
        desc: "Demontiramo sve delove enterijera koji je potrebno očistiti, pružajući dubinsko čišćenje na najvišem nivou i na potpuno siguran način. Naša pažnja prema detaljima i upotreba profesionalne opreme garantuju vrhunske rezultate.",
        img: img1,
    },
    {
        id: 2,
        title: "ZAŠTITA ENTERIJERA.",
        desc: "Pružamo najbolju moguću zaštitu za sjajne plastike i multimedijalne površine u enterijeru vašeg vozila.",
        img: img2,
    },
    {
        id: 3,
        title: "POLIRANJE ENTERIJERA.",
        desc: "Poliramo piano plastike, instrument tablu i multimedijalne površine kako bismo vaš enterijer doveli do savršenstva.",
        img: img3,
    },
    {
        id: 4,
        title: "SPOLJAŠNJE PRANJE.",
        desc: "Temeljno peremo spoljašnjost vozila kako bismo osigurali savršenu čistoću spolja.",
        img: img4,
    }
];

function Offer() {
    return (
        <section section id="detailing" className="offer-section">
            <div className="section-header">
                <h2 className="section-main-title">LUCIDO <span>DETAILING</span></h2>
                <div className="title-underline"></div>
            </div>

            {offerData.map((item, index) => (
                <div key={item.id} className={`offer-block ${index % 2 !== 0 ? 'reverse' : ''}`}>
                    <div className="offer-image-side">
                        <img src={item.img} alt={item.title} loading="eager" decoding="async" />
                    </div>

                    <div className="offer-text-side">
                        <div className="content-wrapper">
                            <h2 className="offer-title">{item.title}</h2>
                            <p className="offer-desc">{item.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Offer;