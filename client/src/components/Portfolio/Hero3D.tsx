import { motion } from 'framer-motion';

interface Hero3DProps {
  text: string;
}

export const Hero3D = ({ text }: Hero3DProps) => {
  const letters = Array.from(text);

  return (
    <div className="relative flex flex-wrap justify-center px-4">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            type: "spring",
            stiffness: 100
          }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white relative px-0.5 sm:px-1"
          style={{
            textShadow: "0 0 20px rgba(255,255,255,0.2)",
            transform: "perspective(1000px)"
          }}
          whileHover={{
            rotateX: 10,
            rotateY: 15,
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};