# 🚀 Deployment na Vercelu

## Korak 1: Pripremi Git repozitorijum
```bash
git add .
git commit -m "Setup za Vercel deployment"
git push origin main
```

## Korak 2: Deploy Backend na Vercelu

### 2.1 Kreiraj novi Vercel projekat za backend
- Idi na https://vercel.com
- Klikni "Add New" → "Project"
- Izaberi Git repozitorijum
- **Root Directory**: `server`
- Build Command: `npm run build` ili ostavi prazno
- Start Command: `npm start`

### 2.2 Dodaj environment varijable na Vercelu
U Vercel Dashboard → Settings → Environment Variables:

```
USE_REAL_EMAIL = false  (za test) ili true (za pravi email)
EMAIL_USER = savadumancic2@gmail.com
EMAIL_PASSWORD = tvoja-app-password (ako je USE_REAL_EMAIL=true)
OWNER_EMAIL = savadumancic2@gmail.com
```

### 2.3 Pritisnite Deploy
Vercel će ti dati URL npr: `https://lucido-api.vercel.app`

---

## Korak 3: Deploy Frontend na Vercelu

### 3.1 Kreiraj novi projekt za frontend
- Idi na https://vercel.com
- "Add New" → "Project"
- Izaberi Git repozitorijum
- **Root Directory**: `.` (root)
- Build Command: `npm run build`

### 3.2 Dodaj environment varijable
U Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL = https://lucido-api.vercel.app
```

Replace `lucido-api.vercel.app` sa tvojim backend Vercel URL-om!

### 3.3 Pritisnite Deploy
Vercel će ti dati URL npr: `https://lucido-detailing.vercel.app`

---

## Rezultat

✅ Frontend: `https://lucido-detailing.vercel.app`
✅ Backend: `https://lucido-api.vercel.app`
✅ Checkout → Email sistem će raditi na production-u

---

## Važne napomene

1. **CORS**: Backend već ima CORS omogućen, radi sa bilo kojim frontend URL-om
2. **Lokalno testiranje**: Koristi `.env.local` (localhost:5000)
3. **Production**: Koristi `.env.production` (Vercel URL)
4. **Email**: Prvo testiraj sa `USE_REAL_EMAIL=false` (test mailing servis)

---

## Ako nešto ne radi

Proverite:
- Da li je backend URL ispravno dodan u VITE_API_URL?
- Da li Vercel Backend ima sve environment varijable?
- Vercel Logs → https://vercel.com/dashboard → [Projekat] → Logs
