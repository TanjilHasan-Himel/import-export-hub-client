export default function normalizeProduct(p = {}) {
  return {
    _id: p._id || p.id,
    name: p.name || p.title || "Untitled",
    image: p.image || p.coverPhoto || "/images/hero-1.jpg",
    originCountry: p.originCountry || p.origin || p.country || "Unknown",
    rating: Number(p.rating ?? 0),
    price: Number(p.price ?? 0),
    quantity: Number(p.quantity ?? 0),
    description: p.description || "",
    promoVideo: p.promoVideo || "",
  };
}
