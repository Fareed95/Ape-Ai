
const HeroBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950/90" />
      <div className="absolute inset-0 bg-grid-small-white/[0.03] -z-10" />
      <div className="absolute inset-0 bg-dot-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
    </div>
  );

  export default HeroBackground;