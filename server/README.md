# Lucido Detailing Email Server

Backend server for handling order email notifications.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Email Settings

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your email credentials:

#### For Gmail:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Create a new App Password for "Mail"
5. Copy the 16-character password

Your `.env` should look like:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
OWNER_EMAIL=owner@lucidodetailing.com
```

#### For Other Email Providers:

**Outlook/Hotmail:**
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

**Yahoo:**
```env
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
```

### 3. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

### 4. Test the Server

Visit `http://localhost:5000/api/health` - you should see:
```json
{"status": "Server is running"}
```

## How It Works

When a customer submits the checkout form:

1. **Customer receives an email** at the address they provided with:
   - Order confirmation
   - Their contact details
   - List of ordered products with quantities and prices
   - Total amount

2. **Owner receives an email** at the configured `OWNER_EMAIL` with:
   - Customer contact information
   - Complete order details
   - Same product list and totals

## Email Templates

Emails are formatted with:
- Professional HTML layout
- Lucido Detailing branding
- Itemized product list
- Customer information
- Order total

## Troubleshooting

**Error: "Invalid login"**
- Make sure you're using an App Password, not your regular password (for Gmail)
- Enable 2-Step Verification first

**Error: "Connection refused"**
- Check that the server is running on port 5000
- Make sure no other service is using port 5000

**Emails not sending:**
- Check your `.env` file has correct credentials
- Verify EMAIL_USER and EMAIL_PASSWORD are set
- Check server console for error messages

## API Endpoint

**POST** `/api/send-checkout-email`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "customer@example.com",
  "phone": "+381 60 123 4567",
  "address": "123 Main St",
  "city": "Belgrade",
  "postalCode": "11000",
  "items": [
    {
      "productId": 1,
      "name": "Product Name",
      "price": 150,
      "quantity": 2
    }
  ],
  "orderDate": "March 5, 2026, 10:30 AM"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Emails sent successfully"
}
```

## Running Both Frontend and Backend

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd server
npm run dev
```

Now when customers checkout, emails will be sent automatically!
