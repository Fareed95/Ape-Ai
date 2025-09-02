import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Hero3D } from './Hero3D';
import { SectionHeader } from './SectionHeader';
import { SkillCard } from './SkillCard';
import { ProjectCard } from './ProjectCard';
import { FloatingElement } from './FloatingElement';

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

interface TemplateOneProps {
  userDetails: UserDetails;
  portfolioData: PortfolioData;
}

export const TemplateOne = ({ userDetails, portfolioData }: TemplateOneProps) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div ref={scrollRef} className="min-h-screen relative">
      {/* Background Decorations with adjusted z-index and blend mode */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none mix-blend-plus-lighter">
        {[...Array(5)].map((_, i) => (
          <FloatingElement key={i} delay={i * 0.5}>
            <div
              className="absolute w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(168,85,247,0.1)'} 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)',
                mixBlendMode: 'plus-lighter',
              }}
            />
          </FloatingElement>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
          <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero3D text={userDetails?.name || "Portfolio"} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mt-4 sm:mt-6 md:mt-8 text-center mx-auto px-4"
            >
              {userDetails?.about}
            </motion.p>
          </AnimatedSection>
        </div>

        {/* Skills Grid */}
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <SectionHeader>Skills & Expertise</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {portfolioData?.toolNames?.map((tool, idx) => (
              <SkillCard key={idx} skill={tool} />
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <SectionHeader>Featured Projects</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {portfolioData?.userDetails?.project?.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </AnimatedSection>

        {/* Education & Certificates */}
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Education */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Education</h2>
              <div className="space-y-4 sm:space-y-6">
                {portfolioData?.userDetails?.education?.map((edu, idx) => (
                  <GlassCard key={idx} className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-purple-400 mt-2">{edu.field_of_study}</p>
                    <p className="text-neutral-400">{edu.University}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                      <p className="text-neutral-500 text-sm sm:text-base">{edu.location}</p>
                      <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">{edu.start_date} - {edu.end_date}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="mt-8 lg:mt-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Certificates</h2>
              <div className="space-y-4 sm:space-y-6">
                {portfolioData?.userDetails?.certificate?.map((cert, idx) => (
                  <GlassCard key={idx} className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{cert.name}</h3>
                    <p className="text-purple-400 mt-2">{cert.issuing_organization}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
                      <p className="text-neutral-500 text-sm sm:text-base">Battles: {cert.competition_battled}</p>
                      <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">Wins: {cert.competition_won}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};
