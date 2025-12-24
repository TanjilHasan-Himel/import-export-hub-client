# ImportExportHub (Client)

Live Site: https://YOUR-LIVE-SITE-URL

ImportExportHub is a modern web platform to manage exports, browse global products, and import any product into your personal "My Imports" section.

## Features
- Clean UI with responsive design (mobile, tablet, desktop).
- Firebase Auth: Email/Password + Google social login.
- Private routes: `Product Details`, `Add Export`, `My Exports`, `My Imports`.
- Real-time import quantity checks and stock reduction.
- Search by product name on All Products page.

## Environment Setup
Create a `.env.local` file in `client/` with:

```
VITE_API_URL=https://YOUR-SERVER-URL
VITE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_APP_ID=YOUR_FIREBASE_APP_ID
```

Note: `VITE_API_URL` must point to your hosted server (e.g., Vercel). The app avoids using `localhost` in production.

## Run Locally
```bash
cd client
npm install
npm run dev
```

Ensure the server is running locally on `http://localhost:5000` or set `VITE_API_URL` accordingly.
