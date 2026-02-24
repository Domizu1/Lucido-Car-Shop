import './caffe.scss';
import coffeeHot from '../../assets/images/coffee.webp';
import coffeeCold from '../../assets/images/coffee.webp';

const menuData = {
    hot: [
        { name: "Kafa1", price: "240" },
        { name: "Kafa2", price: "260" },
        { name: "Kafa3", price: "220" },
        { name: "Kafa4", price: "280" },
        { name: "Kafa5", price: "180" },
        { name: "Kafa6", price: "150" }
    ],
    cold: [
        { name: "Kafa1", price: "290" },
        { name: "Kafa2", price: "350" },
        { name: "Kafa3", price: "320" },
        { name: "Kafa4", price: "310" },
        { name: "Kafa5", price: "330" }
    ]
};

function Caffe() {
    return (
        <section className="caffe-page">
            <div className="caffe-container">
                <header className="caffe-header">
                    <h1>LUCIDO <span>CAFFE</span></h1>
                </header>

                <div className="menu-section hot">
                    <div className="menu-text">
                        <div className="section-title">
                            <h2>Tople Kafe</h2>
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
                            <h2>Hladen Kafe</h2>
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