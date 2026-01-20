import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      title: "Global Trade Made Simple",
      description: "Connect with international buyers and sellers in real-time",
      cta: "Start Trading",
      image: "https://images.unsplash.com/photo-1553531088-2cc3d7f5b3f0?w=1200&h=600&fit=crop",
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Export Your Products Worldwide",
      description: "Reach millions of potential buyers across the globe",
      cta: "List Products",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Import with Confidence",
      description: "Access verified suppliers and quality products",
      cta: "Browse Products",
      image: "https://images.unsplash.com/photo-1455849318169-8c3535b9ea96?w=1200&h=600&fit=crop",
      color: "from-green-500 to-emerald-600",
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const slide = slides[current];

  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl mb-12">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-70`}></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-2xl animate-fade-in">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                  {s.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  {s.description}
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/all-products" className="btn btn-primary btn-lg">
                    {s.cta}
                  </Link>
                  <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-6 z-10">
        <button
          onClick={handlePrev}
          className="btn btn-circle btn-primary btn-sm md:btn-md opacity-80 hover:opacity-100"
          title="Previous slide"
        >
          ❮
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx);
                setAutoPlay(false);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === current ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              title={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="btn btn-circle btn-primary btn-sm md:btn-md opacity-80 hover:opacity-100"
          title="Next slide"
        >
          ❯
        </button>
      </div>

      {/* AutoPlay Toggle */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute top-6 right-6 btn btn-sm btn-ghost text-white z-10"
        title={autoPlay ? "Pause" : "Play"}
      >
        {autoPlay ? "⏸" : "▶"}
      </button>

      {/* Scroll Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white text-sm">
        ⬇ Scroll for more
      </div>
    </section>
  );
}
