# ImportExportHub (Client)

Live Site: https://YOUR-LIVE-SITE-URL

ImportExportHub is a modern web platform to manage exports, browse global products, and import any product into your personal "My Imports" section.

## Highlights
- Responsive UI (mobile → desktop) with modern hover effects.
- Firebase Auth (Email/Password + Google) with persistent sessions.
- Private routes: Product Details, Add Export, My Exports, My Imports.
- Import limit rule with live button-disable and server-side stock decrement.
- Search by product name on All Products page.
- Autoplay hero video with image fallback.

## Requirements Coverage (A-10)
- Layout: Header with routes (All Products, Add Export, My Exports, My Imports) and Auth controls; Footer with copyright/social/contact.
- Home: Banner/video, latest 6 products fetched by `sort=latest&limit=6`, 3-column grid, card shows image, name, price, origin, rating, quantity, See Details.
- Auth: Login/Register with validation; Google Social Login; errors via toasts; redirects to desired route.
- Product Details (Private): Full details with Import Now modal/inputs; quantity cannot exceed stock; import reduces stock on server.
- All Products: 3-column grid with product info + See Details; search by name.
- My Imports (Private): Lists imported items with image, name, price, rating, origin, imported quantity, Remove, See Details.
- Add Export (Private): Form fields (name, image url, price, origin, rating, quantity, description); adds to DB and appears in All Products.
- My Exports (Private): Lists user exports with Delete and Update; Update opens modal with prefilled fields and persists changes.
- UI: Consistent typography, equal card sizes, grid layout, modern X logo, responsive across devices.

## Environment Setup
Create `.env.local` in `client/`:

```
VITE_API_URL=https://YOUR-SERVER-URL
VITE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_APP_ID=YOUR_FIREBASE_APP_ID
```

Note: On local dev, `VITE_API_URL` can be `http://localhost:5000`. In production, set it to your hosted server URL (Vercel) — the app won’t call localhost on live.

## Run Locally
```bash
cd server
npm install
npm run dev

cd ../client
npm install
npm run dev
```

Open http://localhost:5173 and ensure server is on http://localhost:5000.
