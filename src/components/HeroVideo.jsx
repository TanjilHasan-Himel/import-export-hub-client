// client/src/components/HeroVideo.jsx
import { Link } from "react-router-dom";

const HeroVideo = () => {
  return (
    <section className="container-max">
      <div
        className="card relative overflow-hidden rounded-2xl"
        style={{ height: 360 }}
      >
        {/* Background Video (local) */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="p-8 max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight">
              Modern trade, simplified.
            </h1>

            <p className="mt-3 text-white/80">
              Browse global products, manage exports, and import items into your
              workspace—fast, secure, and clean.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/all-products" className="btn btn-primary">
                Explore Products
              </Link>
              <Link to="/add-export" className="btn">
                Add Export
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
