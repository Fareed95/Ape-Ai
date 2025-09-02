import { motion } from "framer-motion";

const HeroBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black" />
      <div className="absolute inset-0 bg-grid-small-white/[0.1] -z-10" />
      <div className="absolute inset-0 bg-dot-white/[0.1] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-neutral-800/20 via-transparent to-transparent"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );

  export default HeroBackground;