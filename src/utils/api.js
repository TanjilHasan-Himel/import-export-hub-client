// Central API base. Avoid hardcoding localhost in production.
// Set VITE_API_URL in your environment (e.g., Netlify/Vercel env vars).
const raw = (import.meta.env.VITE_API_URL || "").trim();
const isPlaceholder = !raw || /your[- ]server[- ]url/i.test(raw);
const isLocalHost =
	typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

// Priority:
// 1) Valid env URL
// 2) Local dev fallback
// 3) Empty string (forces proper config in production)
export const API_BASE = isPlaceholder ? (isLocalHost ? "http://localhost:5000" : "") : raw;
