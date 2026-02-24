import React from 'react';
import './Coffee.scss';
import coffeeImg from '../../assets/images/coffee.webp';

function Coffee() {
    return (
        <section id="caffe" className="coffee-section">
            <div className="coffee-container">
                <div className="coffee-text-side">
                    <span className="coffee-badge">Lucido Caffe</span>
                    <h1>UMETNOST KAFE<br /> <i>u srcu detailinga.</i></h1>
                    <p>
                        Uživajte u premium aromi dok čekate. Naša kafa je pažljivo birana
                        kako bi vam pružila savršen trenutak relaksacije u srcu našeg studija.
                    </p>
                    <button className="btn-visit">Pogledaj Ponudu</button>
                </div>

                <div className="coffee-image-side">
                    <img src={coffeeImg} alt="Fresh Coffee Cup" loading="lazy" decoding="async" />
                </div>
            </div>
        </section>
    );
}

export default Coffee;