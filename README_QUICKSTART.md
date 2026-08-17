# Quick Start

1. Extract this zip.
2. Open a terminal in the `cosmetic-store` folder.
3. Run:
   ```
   npm install
   npm run dev
   ```
4. Open the printed local URL (usually http://localhost:5173).
5. Production build: `npm run build` → outputs to `dist/`. Preview it with `npm run preview`.

Before deploying, set your real WhatsApp number in `src/components/WhatsAppButton.jsx`
(and the WhatsApp links in `src/pages/ProductDetails.jsx`, `src/pages/OrderConfirmation.jsx`,
and `src/components/Footer.jsx`).
