import React from 'react';
import './coffee.scss';
import coffeeImg from '../../assets/images/coffee.webp';
import { Link } from 'react-router-dom';

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
                    <Link to="/caffe">
                        <button className="btn-visit">Pogledaj Ponudu</button>
                    </Link>
                </div>

                <div className="coffee-image-side">
                    <img src={coffeeImg} alt="Fresh Coffee Cup" loading="lazy" decoding="async" />
                </div>
            </div>
        </section>
    );
}

export default Coffee;