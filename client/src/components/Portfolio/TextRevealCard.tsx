import { motion } from 'framer-motion';
import { useState } from 'react';

interface TextRevealCardProps {
  children: React.ReactNode;
}

export const TextRevealCard = ({ children }: TextRevealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl w-full"
    >
      <motion.div
        className="relative z-10 w-full"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
