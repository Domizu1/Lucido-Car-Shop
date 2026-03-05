import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { toggleCheckoutForm, setCheckoutData } from '../store/cart';
import { products } from '../products';
import './checkoutform.scss';

const CheckoutForm = () => {
    const dispatch = useDispatch();
    const showForm = useSelector(store => store.cart.showCheckoutForm);
    const carts = useSelector(store => store.cart.items);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClose = () => {
        dispatch(toggleCheckoutForm());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const customerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;
            const ownerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            const hasPlaceholder = [serviceId, customerTemplateId, ownerTemplateId, publicKey].some(
                (value) => !value || value.includes('xxxxx') || value.includes('your_public_key')
            );

            if (hasPlaceholder) {
                throw new Error('EmailJS ključevi nisu podešeni u .env.local.');
            }

            const formattedItems = carts.map(item => {
                const product = products.find(p => p.id === item.productId);
                const price = product?.price || 0;
                return {
                    productId: item.productId,
                    name: product?.name || 'Unknown Product',
                    price,
                    quantity: item.quantity,
                    total: price * item.quantity
                };
            });

            const orderTotal = formattedItems.reduce((sum, item) => sum + item.total, 0);
            const orderDate = new Date().toLocaleString('sr-RS', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const itemsList = formattedItems
                .map(item => `${item.name} x${item.quantity} - RSD ${item.total.toFixed(2)}`)
                .join('\n');

            const templateData = {
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                customer_address: formData.address,
                customer_city: formData.city,
                customer_postal_code: formData.postalCode,
                items_list: itemsList,
                order_total: orderTotal.toFixed(2),
                order_date: orderDate,
                to_email: formData.email
            };

            dispatch(setCheckoutData({
                ...formData,
                items: formattedItems,
                orderDate,
                orderTotal
            }));

            await emailjs.send(serviceId, customerTemplateId, {
                ...templateData,
                to_email: formData.email
            });

            const ownerEmail = import.meta.env.VITE_OWNER_EMAIL || 'savadumancic2@gmail.com';
            await emailjs.send(serviceId, ownerTemplateId, {
                ...templateData,
                to_email: ownerEmail
            });

            setMessage('✓ Porudžbina je uspešno poslata! Proverite Vaš email.');

            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    postalCode: ''
                });
                dispatch(toggleCheckoutForm());
            }, 2000);
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(`✗ ${error.message || 'Greška pri slanju porudžbine.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!showForm) return null;

    return (
        <div className="checkout-overlay">
            <div className="checkout-form-container">
                <div className="checkout-form-header">
                    <h2>Checkout</h2>
                    <button className="form-close-btn" onClick={handleClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+381 60 123 4567"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address *</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="123 Main Street"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                placeholder="Belgrade"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code *</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                placeholder="11000"
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`form-message ${message.includes('✓') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Complete Order'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;
