export default function HeroVideo() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 glass">
      <video
        className="h-[260px] w-full object-cover md:h-[380px]"
        src="/videos/hero.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070A10] via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h1 className="text-2xl md:text-4xl font-black tracking-tight">
          Import Export Hub
        </h1>
        <p className="mt-2 text-white/80 max-w-2xl">
          Trusted, modern import-export platform experience. Local assets + smooth UI.
        </p>
      </div>
    </div>
  );
}
