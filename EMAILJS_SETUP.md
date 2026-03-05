# EmailJS Setup Guide 📧

## Korak 1: Kreiraj EmailJS Account

1. Idi na https://www.emailjs.com
2. Klikni **Sign Up** (besplatan je!)
3. Registruj se sa email adresom (ili preko Google)
4. Potvrdi email

---

## Korak 2: Konnektuj Gmail Account

1. U EmailJS Dashboard, klikni **Email Services** (levo)
2. Klikni **Add Service** → Gmail
3. Ispiši tvoj Gmail (`savadumancic2@gmail.com`)
4. Klikni **Connect Email**
5. Otvoriće se Gmail login - prijavi se
6. **PRIHVATI pristup** kada pita EmailJS

---

## Korak 3: Kreiraj Email Template - Za Kupca

1. U Dashboard, klikni **Email Templates** (levo)
2. Klikni **Create New Template**
3. Puni podatke:

   **Name:** `customer_order_confirmation`
   
   **Service:** Gmail (koju si upravo konnektovao)
   
   **Email:** `{{to_email}}`
   
   **Template Name (Subject):** `Potvrda Porudžbine - Lucido Detailing`
   
   **Content (Template Content):**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <style>
           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
           .header { background-color: #2d3748; color: white; padding: 20px; text-align: center; }
           .content { background-color: #f9fafb; padding: 20px; }
           .order-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
           table { width: 100%; border-collapse: collapse; }
           th { background-color: #374151; color: white; padding: 12px; text-align: left; }
           td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
           .total { font-size: 1.2em; font-weight: bold; padding: 15px; background-color: #ed8936; color: white; text-align: right; }
           .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 0.9em; }
       </style>
   </head>
   <body>
       <div class="container">
           <div class="header">
               <h1>🚗 Lucido Detailing</h1>
               <p>Potvrda Porudžbine</p>
           </div>
           
           <div class="content">
               <h2>Hvala na Vašoj Porudžbini, {{customer_name}}!</h2>
               
               <div class="order-details">
                   <h3>Informacije o Vašoj Porudžbini</h3>
                   <p><strong>Ime:</strong> {{customer_name}}</p>
                   <p><strong>Email:</strong> {{customer_email}}</p>
                   <p><strong>Telefon:</strong> {{customer_phone}}</p>
                   <p><strong>Adresa:</strong> {{customer_address}}, {{customer_city}} {{customer_postal_code}}</p>
                   <p><strong>Datum:</strong> {{order_date}}</p>
               </div>

               <div class="order-details">
                   <h3>Poručeni Proizvodi</h3>
                   <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">{{items_list}}</pre>
                   <div class="total">
                       UKUPNO: RSD {{order_total}}
                   </div>
               </div>

               <p style="text-align: center; margin-top: 20px;">
                   Kontaktiraćemo Vas uskoro kako bismo potvrdili porudžbinu.
               </p>
           </div>

           <div class="footer">
               <p>Lucido Detailing | Auto Detailing Shop</p>
               <p>Hvala što kupujete kod nas! 🚗✨</p>
           </div>
       </div>
   </body>
   </html>
   ```

4. Sačuvaj - dobićeš **Template ID** (npr: `template_abc123xyz`)

---

## Korak 4: Kreiraj Email Template - Za Vlasnika

Ponovi Korak 3, ali sa novim imenom:

   **Name:** `owner_order_notification`
   
   **Email:** `{{to_email}}`
   
   **Template Name (Subject):** `Nova Porudžbina - {{customer_name}}`
   
   **Content:** Ista HTML kao gore (ali možeš dodati "Nova porudžbina" umesto "Hvala")

4. Sačuvaj - dobićeš **Template ID** (npr: `template_def456uvw`)

---

## Korak 5: Pronađi Service ID i Public Key

1. Klikni **Email Services** 
2. Pronađi Gmail servis koji si konnektovao
3. Klikni na njega - videćeš **Service ID** (npr: `service_xxx`)

4. Sada klikni **Account** (desno gore) → **API Keys**
5. Pronađi **Public Key** (npr: `abcd1234efgh5678`)

---

## Korak 6: Dodaj u `.env.local`

Otvori `.env.local` i zameni:

```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID_CUSTOMER=template_abc123xyz
VITE_EMAILJS_TEMPLATE_ID_OWNER=template_def456uvw
VITE_EMAILJS_PUBLIC_KEY=abcd1234efgh5678
```

**Zameni sa pravim vrednostima što si pronašao!**

---

## Korak 7: Test!

1. Restartuj Vite (`npm run dev`)
2. Dodaj proizvode u korpu
3. Klikni "Poruči"
4. Popuni formu
5. Submit

Trebalo bi da dobijaš dva mejla (tvoj i kupčev) ! 🎉

---

## Troubleshooting

- **Greška: "Public key not found"** → Proverite da li je `.env.local` ispravan
- **Mejlovi se ne šalju** → Proverite Template ID-eve
- **Email server error** → Gmail service nije konnektovao - ponovi Korak 2
- **Rate limit** → EmailJS ima limit od 200 mejlova mesečno na free planu

---

## Production Setup

Za Vercel:
1. Dodaj `.env.production` fajl na root
2. Unesi iste vrednosti
3. U Vercel Dashboard → Environment Variables, dodaj sve VITE_EMAILJS_* vrednosti

**Važno:** Ne dodavaj `.env.local` u Git! Ona je samo za development.
