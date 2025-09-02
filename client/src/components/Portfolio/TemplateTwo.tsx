import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Hero3D } from './Hero3D';
import { SectionHeader } from './SectionHeader';
import { ProjectCard } from './ProjectCard';

interface UserDetails {
  id: number;
  name?: string;
  about?: string;
  education?: any[];
  project?: any[];
  certificate?: any[];
}

interface ToolName {
  id: number;
  name: string;
  tools?: any[];
}

interface PortfolioData {
  userDetails: UserDetails;
  toolNames: ToolName[];
}

interface TemplateTwoProps {
  userDetails: UserDetails;
  portfolioData: PortfolioData;
}

export const TemplateTwo = ({ userDetails, portfolioData }: TemplateTwoProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent text-white relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] mix-blend-soft-light"
          style={{
            x: mousePosition.x * -0.5,
            y: mousePosition.y * -0.5,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
      </div>

      {/* Floating Orbs with adjusted z-index */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full z-10"
          style={{
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(168,85,247,0.1)'} 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'plus-lighter',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-12 sm:mb-16 md:mb-20 relative"
            >
              {/* Glowing effect behind name */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                animate={{
                  filter: ["blur(40px)", "blur(60px)", "blur(40px)"],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
              </motion.div>

              <Hero3D text={userDetails?.name || "Portfolio"} />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mt-6 sm:mt-8 px-4"
              >
                {userDetails?.about}
              </motion.p>
            </motion.div>

            {/* Skills Grid with Enhanced Cards */}
            <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
              <SectionHeader>Technical Expertise</SectionHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {portfolioData?.toolNames?.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <GlassCard className="p-4 sm:p-6">
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-0 transition-opacity duration-300"
                        style={{ padding: '1px' }}
                      >
                        <div className="w-full h-full bg-neutral-900 rounded-xl" />
                      </motion.div>

                      <div className="relative z-10">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center">
                          <span className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-400">⚡</span>
                          {tool.name}
                        </h3>
                        <div className="space-y-2">
                          {tool.tools?.map((t, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center space-x-2"
                            >
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                              <span className="text-sm sm:text-base text-neutral-300">{t.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Projects Section */}
            <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
              <SectionHeader>Featured Projects</SectionHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {portfolioData?.userDetails?.project?.map((proj, idx) => (
                  <ProjectCard key={idx} project={proj} />
                ))}
              </div>
            </AnimatedSection>

            {/* Education & Certificates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <AnimatedSection>
                <SectionHeader>Education</SectionHeader>
                <div className="space-y-4 sm:space-y-6">
                  {portfolioData?.userDetails?.education?.map((edu, idx) => (
                    <GlassCard key={idx} className="p-4 sm:p-6 relative overflow-hidden group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="relative z-10">
                        <h3 className="text-lg sm:text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-indigo-400 mt-2">{edu.field_of_study}</p>
                        <p className="text-neutral-400">{edu.University}</p>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                          <p className="text-neutral-500 text-sm sm:text-base">{edu.location}</p>
                          <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">{edu.start_date} - {edu.end_date}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <SectionHeader>Certificates</SectionHeader>
                <div className="space-y-4 sm:space-y-6">
                  {portfolioData?.userDetails?.certificate?.map((cert, idx) => (
                    <GlassCard key={idx} className="p-4 sm:p-6 relative overflow-hidden group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="relative z-10">
                        <h3 className="text-lg sm:text-xl font-bold text-white">{cert.name}</h3>
                        <p className="text-indigo-400 mt-2">{cert.issuing_organization}</p>
                        <div className="flex flex-col sm:flex-row justify-between mt-4">
                          <p className="text-neutral-500 text-sm sm:text-base">Battles: {cert.competition_battled}</p>
                          <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">Wins: {cert.competition_won}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
