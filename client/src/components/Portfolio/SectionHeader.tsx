import { motion } from 'framer-motion';

interface SectionHeaderProps {
  children: React.ReactNode;
}

export const SectionHeader = ({ children }: SectionHeaderProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 relative w-full px-4 sm:px-6 md:px-8"
    >
      <span className="relative z-10 block text-center">{children}</span>
      <motion.div
        className="absolute -bottom-2 left-0 right-0 mx-4 sm:mx-6 md:mx-8 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-blue-500"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.h2>
  );
};