import { motion } from 'framer-motion';
import { Code, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface Tool {
  id: number;
  name: string;
}

interface SkillCardProps {
  skill: {
    id: number;
    name: string;
    tools?: Tool[];
  };
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateX: 10,
        rotateY: 15,
        z: 50
      }}
      className="relative group w-full"
    >
      <GlassCard className="p-4 xs:p-5 sm:p-6 transform transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300" />
        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 flex items-center">
          <Code className="w-4 h-4 xs:w-5 xs:h-5 mr-1.5 xs:mr-2 text-purple-400" />
          {skill.name}
        </h3>
        <div className="space-y-1.5 xs:space-y-2">
          {skill.tools?.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center space-x-1.5 xs:space-x-2"
            >
              <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 text-purple-400" />
              <span className="text-sm xs:text-base text-neutral-300">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};