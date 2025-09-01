import { motion } from "framer-motion";

const FloatingParticles = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 0.5}px`,
            height: `${Math.random() * 3 + 0.5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: i % 7 === 0 ? 'rgba(139, 92, 246, 0.35)' : // Purple
                            i % 7 === 1 ? 'rgba(59, 130, 246, 0.35)' : // Blue
                            i % 7 === 2 ? 'rgba(14, 165, 233, 0.3)' : // Sky
                            i % 7 === 3 ? 'rgba(236, 72, 153, 0.3)' : // Pink
                            i % 7 === 4 ? 'rgba(45, 212, 191, 0.3)' : // Teal
                            i % 7 === 5 ? 'rgba(168, 85, 247, 0.35)' : // Purple
                            'rgba(99, 102, 241, 0.3)', // Indigo
            filter: 'blur(1px)',
            zIndex: 0
          }}
          animate={{
            y: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1)],
            x: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

export default FloatingParticles;