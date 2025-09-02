import { motion } from 'framer-motion';
import { GlowingBorder } from './GlowingBorder';

interface Tool {
  id: number;
  name: string;
  components?: Array<{
    id: number;
    name: string;
  }>;
}

interface ToolName {
  id: number;
  name: string;
  tools?: Tool[];
}

interface AISkillCardProps {
  toolName: ToolName;
}

export const AISkillCard = ({ toolName }: AISkillCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative overflow-hidden w-full"
  >
    <GlowingBorder>
      <div className="p-3 xs:p-4 sm:p-5 md:p-6 rounded-lg bg-neutral-900/50 backdrop-blur-xl relative z-10">
        <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-neutral-200 mb-2 xs:mb-3 sm:mb-4">{toolName.name}</h3>
        <div className="space-y-2 xs:space-y-3">
          {toolName.tools?.map((tool) => (
            <motion.div
              key={tool.id}
              className="space-y-1 xs:space-y-2"
              whileHover={{ x: 5 }}
            >
              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-cyan-400 font-medium flex items-center">
                <span className="mr-1 xs:mr-2">⚡</span>
                {tool.name}
              </p>
              {tool.components?.map((component) => (
                <p key={component.id} className="text-xs xs:text-sm sm:text-base text-neutral-400 pl-4 xs:pl-6 flex items-center">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full mr-1 xs:mr-2" />
                  {component.name}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </GlowingBorder>
  </motion.div>
);