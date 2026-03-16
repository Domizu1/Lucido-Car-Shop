import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../products';
import './details.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart';
import { FaArrowLeft } from 'react-icons/fa';
import Seo from '../../components/Seo';

const normalizeDescriptionLines = (description) => {
    if (!description) return [];

    return description
        .split('\n')
        .map((line) => line.replace(/\s+/g, ' ').trim())
        .filter(Boolean);
};

const formatDescriptionBlocks = (description) => {
    const lines = normalizeDescriptionLines(description);
    const blocks = [];
    let bulletBuffer = [];

    lines.forEach((line) => {
        if (line.startsWith('✔')) {
            bulletBuffer.push(line.replace(/^✔\s*/, '').trim());
            return;
        }

        if (bulletBuffer.length > 0) {
            blocks.push({ type: 'bullets', items: bulletBuffer });
            bulletBuffer = [];
        }

        blocks.push({ type: 'paragraph', text: line });
    });

    if (bulletBuffer.length > 0) {
        blocks.push({ type: 'bullets', items: bulletBuffer });
    }

    return blocks;
};

function Details() {
    const { slug } = useParams();
    const [detail, setDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const resetTimerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = products.find(product => product.slug === slug);
        if (findDetail) {
            setDetail(findDetail);
        } else {
            navigate('/shop');
        }
    }, [slug, navigate]);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    if (!detail) return null;

    const descriptionBlocks = formatDescriptionBlocks(detail.description);

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    };

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: detail.id,
            quantity: quantity
        }));

        setIsAdded(true);
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <div className="details-container">
            <Seo
                title={`${detail.name} | Lucido Shop`}
                description={(detail.description || '').replace(/\s+/g, ' ').trim().slice(0, 155) || 'Detalji proizvoda iz Lucido shop ponude.'}
                keywords={`auto kozmetika, detailing, ${detail.name}`}
                type="product"
            />
            {/* NOVO DUGME ZA POVRATAK */}
            <button className="back-to-shop" onClick={() => navigate('/shop')}>
                <FaArrowLeft />
                <span>NAZAD U SHOP</span>
            </button>

            <h2 className="details-title">DETALJI O PROIZVODU</h2>

            <div className="details-content">
                <div className="image-section">
                    <img src={detail.image} alt={detail.name} />
                </div>

                <div className="info-section">
                    <h1 className="product-name">{detail.name}</h1>
                    <p className="product-price">RSD {detail.price}</p>
                    {descriptionBlocks.length > 0 && (
                        <div className="product-desc">
                            {descriptionBlocks.map((block, index) => {
                                if (block.type === 'bullets') {
                                    return (
                                        <ul key={`bullets-${index}`}>
                                            {block.items.map((item, itemIndex) => (
                                                <li key={`item-${itemIndex}`}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                }

                                return <p key={`paragraph-${index}`}>{block.text}</p>;
                            })}
                        </div>
                    )}

                    <div className="action-row">
                        <div className="quantity-selector">
                            <button onClick={handleMinusQuantity} className='btn-minus'>-</button>
                            <span>{quantity}</span>
                            <button onClick={handlePlusQuantity} className='btn-plus'>+</button>
                        </div>
                        <button
                            className={`add-to-cart-btn ${isAdded ? 'is-added' : ''}`}
                            onClick={handleAddToCart}
                            aria-label={isAdded ? 'Proizvod je dodat u korpu' : 'Dodaj proizvod u korpu'}
                        >
                            {isAdded ? 'DODATO U KORPU' : 'DODAJ U KORPU'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;