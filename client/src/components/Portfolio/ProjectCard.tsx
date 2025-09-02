import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface ProjectLink {
  id: number;
  name: string;
  url: string;
}

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    link?: ProjectLink[];
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group w-full"
    >
      <GlassCard className="p-4 xs:p-5 sm:p-6">
        <div className="absolute top-0 right-0 -mt-2 -mr-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-lg"
          />
        </div>

        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 xs:mb-3">{project.name}</h3>
        <p className="text-sm xs:text-base text-neutral-400 mb-3 xs:mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 xs:gap-2">
          {project.link?.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-purple-500/10 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors flex items-center space-x-1.5 xs:space-x-2 text-xs xs:text-sm"
            >
              <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4" />
              <span>{link.name}</span>
            </motion.a>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};