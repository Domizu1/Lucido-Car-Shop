# 📧 Email Setup for Checkout Orders

## ✅ What's Implemented

Your checkout system now sends emails to:
1. **Customer** - Order confirmation at their provided email
2. **Owner** - Order notification at your business email

## 🚀 Quick Start

### Step 1: Install Server Dependencies

Open a **new terminal** in VS Code and run:

```bash
cd server
npm install
```

### Step 2: Configure Email

1. Copy the example environment file:
   ```bash
   cd server
   copy .env.example .env
   ```

2. Open `server/.env` and add your email credentials:

   **For Gmail (Recommended):**
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"
   - Go to https://myaccount.google.com/apppasswords
   - Create new App Password → Choose "Mail"
   - Copy the 16-character password

   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   OWNER_EMAIL=owner@lucidodetailing.com
   ```

### Step 3: Start the Backend Server

In the `server` directory:

```bash
npm run dev
```

You should see: `Server running on http://localhost:5000`

### Step 4: Start the Frontend (Separate Terminal)

In the **root** directory:

```bash
npm run dev
```

## 🧪 Test It Out

1. Start both servers (frontend + backend)
2. Go to your shop page
3. Add items to cart
4. Click "Poruči" (Checkout)
5. Fill out the form with your email
6. Submit!

**Both you and the customer will receive emails!** ✉️

## 📁 Files Created

- `server/index.js` - Email backend server
- `server/package.json` - Server dependencies
- `server/.env.example` - Email configuration template
- `server/README.md` - Detailed server documentation
- Updated `CheckoutForm.jsx` - Now calls backend API

## 🔧 Troubleshooting

**"Failed to send order"**
- Make sure backend server is running on port 5000
- Check your `.env` file has correct email credentials

**Gmail "Invalid login"**
- Use App Password, not your regular password
- Enable 2-Step Verification first

**Emails not arriving**
- Check spam/junk folder
- Verify EMAIL_USER in `.env` is correct
- Check server console for errors

## 📧 Email Template Features

Both emails include:
- ✅ Professional HTML design
- ✅ Lucido Detailing branding
- ✅ Customer contact information
- ✅ Itemized product list with prices
- ✅ Order total
- ✅ Timestamp

**Customer email:** Order confirmation message
**Owner email:** New order notification

## 🎯 Next Steps

1. **Test with real email** - Use your actual email to test
2. **Customize email template** - Edit `server/index.js` to change styling
3. **Update owner email** - Set your business email in `.env`
4. **Deploy backend** - Use Heroku, Railway, or Vercel when ready for production

---

**Need help?** Check `server/README.md` for detailed documentation.
