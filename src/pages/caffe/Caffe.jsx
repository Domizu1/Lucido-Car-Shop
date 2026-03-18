import './caffe.scss';
import coffeeHot from '../../assets/images/coffee.webp';
import coffeeCold from '../../assets/images/drink.webp';
import Seo from '../../components/Seo';

const menuData = {
    hot: [
        { name: "Espresso", price: "190" },
        { name: "Espresso sa Mlekom", price: "200" },
        { name: "Cappucino", price: "230" },
        { name: "Caffe Latte", price: "230" },
        { name: "Espresso Doppio", price: "270" },
        { name: "Ness", price: "220" }
    ],
    cold: [
        { name: "Čaj", price: "190" },
        { name: "Heba Mineralna", price: "350" },
        { name: "Rosa Negazirana", price: "320" },
        { name: "Fanta", price: "240" },
        { name: "Coca Cola", price: "240" },
        { name: "Coca Cola Zero", price: "240" },
        { name: "Sokovi", price: "250" },
        { name: "Limunada Gazirana", price: "240" },
        { name: "Gin-Tonic", price: "240" },
        { name: "Heineken", price: "270" }
    ]
};

function Caffe() {
    return (
        <section className="caffe-page">
            <Seo
                title="Lucido Caffe | Kafa i Pauza uz Detailing"
                description="Pogledajte ponudu toplih i hladnih kafa u Lucido Caffe zoni dok cekate detailing ili pranje vozila."
                keywords="caffe, kafa, Lucido caffe, tople kafe, hladne kafe"
            />
            <div className="caffe-container">
                <header className="caffe-header">
                    <h1>LUCIDO <span>CAFFE</span></h1>
                </header>

                <div className="menu-section hot">
                    <div className="menu-text">
                        <div className="section-title">
                            <h2>KAFE</h2>
                            <div className="line"></div>
                        </div>
                        <ul className="menu-list">
                            {menuData.hot.map((item, i) => (
                                <li key={i}>
                                    <span className="name">{item.name}</span>
                                    <span className="price">RSD {item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="menu-image">
                        <img src={coffeeHot} alt="Hot Coffee" />
                    </div>
                </div>

                <div className="menu-section cold">
                    <div className="menu-image">
                        <img src={coffeeCold} alt="Cold Coffee" />
                    </div>
                    <div className="menu-text">
                        <div className="section-title">
                            <h2>OSTALI NAPICI</h2>
                            <div className="line"></div>
                        </div>
                        <ul className="menu-list">
                            {menuData.cold.map((item, i) => (
                                <li key={i}>
                                    <span className="name">{item.name}</span>
                                    <span className="price">RSD {item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Caffe;