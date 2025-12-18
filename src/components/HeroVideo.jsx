import { Link } from "react-router-dom";

export default function HeroVideo() {
  return (
    <section className="cardx overflow-hidden">
      <div className="relative h-[320px] md:h-[380px]">
        {/* If you have video: public/videos/intro.mp4 */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            // if video missing, hide it (image overlay will still show)
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Image fallback (public/images/hero-1.jpg) */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/hero-1.jpg"
          alt="hero"
          onError={(e) => {
            // if image missing too, just keep plain bg
            e.currentTarget.style.display = "none";
          }}
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-base-300/60 via-base-300/30 to-transparent" />

        <div className="relative h-full flex items-end">
          <div className="p-6 md:p-10 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Modern trade, simplified.
            </h1>
            <p className="mt-3 text-base-content/70">
              Browse global products, manage exports, and import items into your workspace—fast,
              secure, and clean.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/all-products" className="btn btn-primary">
                Explore Products
              </Link>
              <Link to="/add-export" className="btn btn-outline">
                Add Export
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
