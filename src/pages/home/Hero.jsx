import React, { useState, useEffect } from 'react';
import './hero.scss';
import herobackground1 from '../../assets/images/heroimg1.webp';
import herobackground2 from '../../assets/images/heroimg2.webp';
import herobackground3 from '../../assets/images/heroimg3.webp';

const images = [
    herobackground1,
    herobackground2,
    herobackground3
];

function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const preloadFirst = () => {
            if (images[0]) {
                const img = new Image();
                img.src = images[0];
            }
        };

        const preloadOthers = () => {
            images.slice(1).forEach((src) => {
                const img = new Image();
                img.src = src;
            });
        };

        preloadFirst();
        let timer;
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadOthers, { timeout: 2000 });
        } else {
            timer = setTimeout(preloadOthers, 2000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        let timer;
        const startTimer = () => {
            timer = setInterval(() => {
                setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }, 7000);
        };

        const handleVisibility = () => {
            if (document.hidden) clearInterval(timer);
            else startTimer();
        };

        startTimer();
        document.addEventListener('visibilitychange', handleVisibility);
        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);



    return (
        <section className='hero'>
            <aside className='hero-sidebar'>
                <div className='sidebar-line'></div>
                <div className='social-links'>
                    <a href='#'>FB</a>
                    <a href='#'>IG</a>
                    <a href='#'>WA</a>
                    <a href='#'>YT</a>
                </div>
            </aside>

            <div className='hero-content'>
                <div className='hero-text'>
                    <span className='tagline'>Lucido Car Shop</span>
                    <h1>BUDUĆNOST NEGE <span>AUTOMOBILA</span></h1>
                    <p>Podignite negu vašeg vozila na najviši nivo uz najprecizniji detailing u Srbiji.</p>
                </div>

                <div className='hero-action'>
                    <button className='btn-primary'>Saznaj Više</button>
                </div>
                <div className='hero-slider-status'>
                    <div className='progress-dash'>
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`dash ${index === current ? 'active' : ''}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='hero-background'>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`slide ${index === current ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    >
                        <div className='overlay'></div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Hero;