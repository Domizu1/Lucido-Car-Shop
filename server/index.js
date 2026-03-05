const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration - Ethereal (test emails, no 2FA needed)
let transporter;
let senderEmail;

// Create test account and transporter
const setupEmailer = async () => {
    if (process.env.USE_REAL_EMAIL === 'true') {
        // Real email setup (requires app password)
        senderEmail = process.env.EMAIL_USER;
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    } else {
        // Ethereal test account (no setup needed!)
        const testAccount = await nodemailer.createTestAccount();
        senderEmail = testAccount.user; // Use test account email
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        console.log('✅ Test email setup - Email preview links will be logged');
    }
};

// Owner email (hardcoded or from .env)
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'savadumancic2@gmail.com';

// Helper function to format cart items for email
const formatCartItems = (items, products) => {
    return items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            name: product?.name || 'Unknown Product',
            price: product?.price || 0,
            quantity: item.quantity,
            total: (product?.price || 0) * item.quantity
        };
    });
};

// Calculate order total
const calculateTotal = (formattedItems) => {
    return formattedItems.reduce((sum, item) => sum + item.total, 0);
};

// Generate HTML email template
const generateEmailHTML = (customerData, cartItems, isOwner = false) => {
    const itemsHTML = cartItems.map(item => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 8px;">${item.name}</td>
            <td style="padding: 12px 8px; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px 8px; text-align: right;">RSD ${item.price.toFixed(2)}</td>
            <td style="padding: 12px 8px; text-align: right; font-weight: bold;">RSD ${item.total.toFixed(2)}</td>
        </tr>
    `).join('');

    const total = calculateTotal(cartItems);

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #2d3748; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9fafb; padding: 20px; }
                .order-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                th { background-color: #374151; color: white; padding: 12px 8px; text-align: left; }
                .total { font-size: 1.2em; font-weight: bold; text-align: right; padding: 15px; background-color: #ed8936; color: white; }
                .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚗 Lucido Detailing</h1>
                    <p>${isOwner ? 'Nova Porudžbina' : 'Potvrda Porudžbine'}</p>
                </div>
                
                <div class="content">
                    <h2>${isOwner ? 'Detalji Porudžbine' : 'Hvala na Vašoj Porudžbini!'}</h2>
                    
                    <div class="order-details">
                        <h3>Informacije o Kupcu</h3>
                        <p><strong>Ime:</strong> ${customerData.name}</p>
                        <p><strong>Email:</strong> ${customerData.email}</p>
                        <p><strong>Telefon:</strong> ${customerData.phone}</p>
                        <p><strong>Adresa:</strong> ${customerData.address}</p>
                        <p><strong>Grad:</strong> ${customerData.city}, ${customerData.postalCode}</p>
                        <p><strong>Datum:</strong> ${customerData.orderDate}</p>
                    </div>

                    <div class="order-details">
                        <h3>Poručeni Proizvodi</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Proizvod</th>
                                    <th style="text-align: center;">Količina</th>
                                    <th style="text-align: right;">Cena</th>
                                    <th style="text-align: right;">Ukupno</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHTML}
                            </tbody>
                        </table>
                        <div class="total">
                            UKUPNO: RSD ${total.toFixed(2)}
                        </div>
                    </div>

                    ${!isOwner ? `
                    <p style="text-align: center; margin-top: 20px;">
                        Kontaktiraćemo Vas uskoro kako bismo potvrdili porudžbinu.
                    </p>
                    ` : ''}
                </div>

                <div class="footer">
                    <p>Lucido Detailing | Auto Detailing Shop</p>
                    <p>Hvala što kupujete kod nas! 🚗✨</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

// POST endpoint to send checkout emails
app.post('/api/send-checkout-email', async (req, res) => {
    try {
        const { name, email, phone, address, city, postalCode, items, orderDate } = req.body;

        // Validate required fields
        if (!name || !email || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const formattedItems = items.map(item => ({
            name: item.name || `Product ${item.productId}`,
            price: item.price || 0,
            quantity: item.quantity,
            total: (item.price || 0) * item.quantity
        }));

        const customerData = {
            name,
            email,
            phone,
            address,
            city,
            postalCode,
            orderDate
        };

        // Email to customer
        const customerMailOptions = {
            from: senderEmail,
            to: email,
            subject: 'Potvrda Porudžbine - Lucido Detailing',
            html: generateEmailHTML(customerData, formattedItems, false)
        };

        // Email to owner
        const ownerMailOptions = {
            from: senderEmail,
            to: OWNER_EMAIL,
            subject: `Nova Porudžbina - ${name}`,
            html: generateEmailHTML(customerData, formattedItems, true)
        };

        // Send both emails
        const [customerInfo, ownerInfo] = await Promise.all([
            transporter.sendMail(customerMailOptions),
            transporter.sendMail(ownerMailOptions)
        ]);

        // If using Ethereal (test mode), log preview URLs
        if (process.env.USE_REAL_EMAIL !== 'true') {
            console.log('\n📧 EMAIL PREVIEW LINKS:');
            console.log('👤 Customer email:', nodemailer.getTestMessageUrl(customerInfo));
            console.log('💼 Owner email:', nodemailer.getTestMessageUrl(ownerInfo));
            console.log('\n');
        }

        res.status(200).json({
            success: true,
            message: 'Emails sent successfully'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send emails',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server after email setup
const startServer = async () => {
    await setupEmailer();
    app.listen(PORT, () => {
        console.log(`\n🚀 Server pokrenut na http://localhost:${PORT}`);
        if (process.env.USE_REAL_EMAIL !== 'true') {
            console.log('🧪 TEST MOD - Mejlovi neće biti pravi, ali ćeš dobiti preview linkove\n');
        }
    });
};

startServer();
